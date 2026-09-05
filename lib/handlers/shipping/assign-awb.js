// ==============================================================================
// OV™ — ASSIGN AWB & CREATE SHIPMENT API (/api/shipping/assign-awb)
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

  // Admin / Warehouse / Owner
  const user = requireAuth(req, res, [ROLES.OWNER, ROLES.ADMIN, ROLES.ORDER_MANAGER, ROLES.WAREHOUSE]);
  if (!user) return;

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) { /* ignore */ }
    }

    const { order_id, courier_id } = body || {};

    if (!order_id) {
      return sendBadRequest(res, 'Order ID is required');
    }

    const order = await db.getOrderById(order_id);
    if (!order) {
      return sendNotFound(res, `Order '${order_id}' not found`);
    }

    // 1. Create Shipment in Shiprocket
    const shipmentResult = await shippingService.createShipment(order);
    const shipmentId = shipmentResult.shipment_id;

    // 2. Assign AWB
    const awbResult = await shippingService.assignAWB(shipmentId, courier_id);

    // 3. Save Shipment Record
    const shipmentRecord = {
      order_id: order.id,
      order_number: order.order_number,
      shipment_id: shipmentId,
      courier_name: awbResult.courier_name,
      courier_id: awbResult.courier_id,
      awb_code: awbResult.awb_code,
      shipping_status: 'AWB_ASSIGNED',
      is_simulated: awbResult.is_simulated || false
    };

    await db.saveShipment(shipmentRecord);

    // 4. Update Order Status
    await db.updateOrderStatus(order.id, {
      order_status: 'READY_TO_SHIP',
      shipment_status: 'AWB_ASSIGNED',
      message: `Shiprocket AWB assigned: ${awbResult.awb_code} (${awbResult.courier_name})`
    });

    req.user = user;
    await logAudit(req, {
      action: 'AWB_ASSIGNED',
      resource_type: 'ORDER',
      resource_id: order.id,
      details: {
        order_number: order.order_number,
        awb: awbResult.awb_code,
        courier: awbResult.courier_name
      }
    });

    return sendSuccess(res, {
      shipment: shipmentRecord,
      order_status: 'READY_TO_SHIP'
    }, 'AWB assigned successfully');

  } catch (err) {
    console.error('[Assign AWB Error]', err);
    return sendError(res, err.message || 'Failed to assign AWB', 500);
  }
};
