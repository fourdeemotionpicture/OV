// ==============================================================================
// OV™ — SHIPPING NDR & RTO MANAGEMENT API (/api/shipping/ndr)
// ==============================================================================

const db = require('../../db');
const shippingService = require('../../shipping');
const { requireAuth, ROLES } = require('../../auth');
const { sendSuccess, sendError, sendBadRequest } = require('../../response');
const { logAudit } = require('../../audit');

module.exports = async function handler(req, res) {
  const user = requireAuth(req, res, [ROLES.OWNER, ROLES.ADMIN, ROLES.ORDER_MANAGER, ROLES.WAREHOUSE, ROLES.SUPPORT]);
  if (!user) return;

  if (req.method !== 'POST') {
    return sendError(res, 'Method not allowed', 405);
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) { /* ignore */ }
    }

    const { awb, action, comments = '', deferred_date = null } = body || {};
    if (!awb || !action) {
      return sendBadRequest(res, 'AWB and action (REATTEMPT or RTO) are required');
    }

    const result = await shippingService.handleNDR({
      awb,
      action,
      comments,
      deferred_date
    });

    const shipment = await db.getShipmentByOrderId(awb);
    if (shipment) {
      if (action === 'RTO') {
        shipment.is_rto = true;
        shipment.status = 'RTO';
        await db.saveShipment(shipment);
        await db.updateOrderStatus(shipment.order_id, {
          order_status: 'RTO',
          message: `RTO initiated by store manager: ${comments || 'Customer unavailable'}`
        });
      } else {
        await db.addOrderTimeline(shipment.order_id, {
          status: 'NDR_REATTEMPT',
          message: `Delivery reattempt requested: ${comments || 'Customer requested reattempt'}`
        });
      }
    }

    await logAudit(req, {
      action: 'NDR_ACTION_SUBMITTED',
      resource_type: 'SHIPMENT',
      resource_id: awb,
      details: { action, comments, deferred_date }
    });

    return sendSuccess(res, result, 'NDR action submitted to courier successfully');
  } catch (err) {
    console.error('[NDR Action Error]', err);
    return sendError(res, 'Failed to submit NDR action', 500);
  }
};
