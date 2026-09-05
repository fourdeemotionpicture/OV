// ==============================================================================
// OV™ — SCHEDULE PICKUP API (/api/shipping/schedule-pickup)
// ==============================================================================

const shippingService = require('../../shipping');
const db = require('../../db');
const { requireAuth, ROLES } = require('../../auth');
const { sendSuccess, sendBadRequest, sendNotFound, sendError } = require('../../response');
const { logAudit } = require('../../audit');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendError(res, 'Method not allowed', 405);
  }

  const user = requireAuth(req, res, [ROLES.OWNER, ROLES.ADMIN, ROLES.ORDER_MANAGER, ROLES.WAREHOUSE]);
  if (!user) return;

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) { /* ignore */ }
    }

    const { order_id, pickup_date } = body || {};

    if (!order_id) {
      return sendBadRequest(res, 'Order ID is required');
    }

    const order = await db.getOrderById(order_id);
    if (!order) {
      return sendNotFound(res, `Order '${order_id}' not found`);
    }

    const shipment = await db.getShipmentByOrderId(order.id);
    if (!shipment || !shipment.shipment_id) {
      return sendBadRequest(res, 'Shipment not yet created for this order. Assign AWB first.');
    }

    const pickupResult = await shippingService.schedulePickup(shipment.shipment_id, pickup_date);

    shipment.pickup_scheduled_date = pickupResult.pickup_date;
    shipment.shipping_status = 'PICKUP_SCHEDULED';
    await db.saveShipment(shipment);

    await db.updateOrderStatus(order.id, {
      order_status: 'READY_TO_SHIP',
      shipment_status: 'PICKUP_SCHEDULED',
      message: `Pickup scheduled for ${pickupResult.pickup_date}`
    });

    req.user = user;
    await logAudit(req, {
      action: 'PICKUP_SCHEDULED',
      resource_type: 'SHIPMENT',
      resource_id: shipment.shipment_id,
      details: { order_number: order.order_number, pickup_date: pickupResult.pickup_date }
    });

    return sendSuccess(res, pickupResult, 'Pickup scheduled successfully');
  } catch (err) {
    console.error('[Schedule Pickup Error]', err);
    return sendError(res, err.message || 'Failed to schedule pickup', 500);
  }
};
