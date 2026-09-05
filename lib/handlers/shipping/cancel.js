// ==============================================================================
// OV™ — SHIPPING CANCELLATION API (/api/shipping/cancel)
// ==============================================================================

const db = require('../../db');
const shippingService = require('../../shipping');
const { requireAuth, ROLES } = require('../../auth');
const { sendSuccess, sendError, sendBadRequest } = require('../../response');
const { logAudit } = require('../../audit');

module.exports = async function handler(req, res) {
  const user = requireAuth(req, res, [ROLES.OWNER, ROLES.ADMIN, ROLES.ORDER_MANAGER, ROLES.WAREHOUSE]);
  if (!user) return;

  if (req.method !== 'POST') {
    return sendError(res, 'Method not allowed', 405);
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) { /* ignore */ }
    }

    const { order_id, reason = 'Cancelled by store manager' } = body || {};
    if (!order_id) {
      return sendBadRequest(res, 'Order ID is required');
    }

    const order = await db.getOrderById(order_id);
    if (!order) {
      return sendBadRequest(res, 'Order not found');
    }

    const shipment = await db.getShipmentByOrderId(order.id);
    if (shipment && shipment.shiprocket_shipment_id) {
      await shippingService.cancelShipment(shipment.shiprocket_shipment_id);
      shipment.status = 'CANCELLED';
      await db.saveShipment(shipment);
    }

    await db.updateOrderStatus(order.id, {
      order_status: 'CANCELLED',
      message: `Shipment cancelled: ${reason}`
    });

    await logAudit(req, {
      action: 'SHIPMENT_CANCELLED',
      resource_type: 'ORDER',
      resource_id: order.order_number,
      details: { reason }
    });

    return sendSuccess(res, { success: true, order_number: order.order_number }, 'Shipment cancelled successfully');
  } catch (err) {
    console.error('[Shipment Cancel Error]', err);
    return sendError(res, 'Failed to cancel shipment', 500);
  }
};
