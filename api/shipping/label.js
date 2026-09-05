// ==============================================================================
// OV™ — GENERATE SHIPPING LABEL API (/api/shipping/label)
// ==============================================================================

const shippingService = require('../../lib/shipping');
const db = require('../../lib/db');
const { requireAuth, ROLES } = require('../../lib/auth');
const { sendSuccess, sendBadRequest, sendNotFound, sendError } = require('../../lib/response');

module.exports = async function handler(req, res) {
  const user = requireAuth(req, res, [ROLES.OWNER, ROLES.ADMIN, ROLES.ORDER_MANAGER, ROLES.WAREHOUSE]);
  if (!user) return;

  try {
    const { order_id } = req.method === 'GET' ? req.query : req.body;

    if (!order_id) {
      return sendBadRequest(res, 'Order ID is required');
    }

    const order = await db.getOrderById(order_id);
    if (!order) {
      return sendNotFound(res, `Order '${order_id}' not found`);
    }

    const shipment = await db.getShipmentByOrderId(order.id);
    if (!shipment || !shipment.shipment_id) {
      return sendBadRequest(res, 'Shipment not found for this order. Please assign courier first.');
    }

    const labelResult = await shippingService.generateLabel(shipment.shipment_id);

    shipment.label_url = labelResult.label_url;
    await db.saveShipment(shipment);

    return sendSuccess(res, labelResult, 'Shipping label generated');
  } catch (err) {
    console.error('[Generate Label Error]', err);
    return sendError(res, err.message || 'Failed to generate shipping label', 500);
  }
};
