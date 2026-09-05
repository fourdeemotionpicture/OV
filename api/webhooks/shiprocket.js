// ==============================================================================
// OV™ — SHIPROCKET WEBHOOK RECEIVER (/api/webhooks/shiprocket)
// Handles tracking status events: PICKED_UP, IN_TRANSIT, OUT_FOR_DELIVERY,
// DELIVERED, NDR (Non-Delivery Report), and RTO (Return to Origin).
// ==============================================================================

const shippingService = require('../../lib/shipping');
const db = require('../../lib/db');
const { sendSuccess, sendBadRequest, sendError } = require('../../lib/response');
const { logAudit } = require('../../lib/audit');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendError(res, 'Method not allowed', 405);
  }

  try {
    if (!shippingService.verifyWebhook(req)) {
      return sendBadRequest(res, 'Invalid webhook authentication header');
    }

    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) { /* ignore */ }
    }

    const { awb, current_status, order_id, location, scans } = body || {};

    if (!awb && !order_id) {
      return sendBadRequest(res, 'AWB or Order ID required in webhook payload');
    }

    // Map Shiprocket statuses to internal OV order & shipping statuses
    const statusMap = {
      'PICKED UP': { order: 'SHIPPED', ship: 'PICKED_UP' },
      'IN TRANSIT': { order: 'IN_TRANSIT', ship: 'IN_TRANSIT' },
      'OUT FOR DELIVERY': { order: 'OUT_FOR_DELIVERY', ship: 'OUT_FOR_DELIVERY' },
      'DELIVERED': { order: 'DELIVERED', ship: 'DELIVERED' },
      'UNDELIVERED': { order: 'NDR', ship: 'NDR' },
      'RTO INITIATED': { order: 'RTO', ship: 'RTO_INITIATED' },
      'RTO DELIVERED': { order: 'RTO_DELIVERED', ship: 'RTO_DELIVERED' }
    };

    const mapped = statusMap[current_status?.toUpperCase()] || {
      order: current_status,
      ship: current_status
    };

    // Find order
    const order = await db.getOrderById(order_id);
    if (order) {
      await db.updateOrderStatus(order.id, {
        order_status: mapped.order,
        shipment_status: mapped.ship,
        message: `Shiprocket scan: ${current_status}${location ? ` at ${location}` : ''}`
      });

      const shipment = await db.getShipmentByOrderId(order.id);
      if (shipment) {
        shipment.shipping_status = mapped.ship;
        if (mapped.ship === 'RTO_INITIATED') shipment.is_rto = true;
        await db.saveShipment(shipment);
      }

      await logAudit(req, {
        action: 'WEBHOOK_SHIPMENT_STATUS',
        resource_type: 'SHIPMENT',
        resource_id: awb || order_id,
        details: { awb, current_status, mapped_status: mapped }
      });
    }

    return sendSuccess(res, { received: true, mapped });
  } catch (err) {
    console.error('[Shiprocket Webhook Error]', err);
    return sendError(res, 'Webhook handling failed', 500);
  }
};
