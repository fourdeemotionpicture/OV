// ==============================================================================
// OV™ — RETURN DETAIL & APPROVAL API (/api/returns/[id])
// ==============================================================================

const db = require('../../db');
const { requireAuth, ROLES } = require('../../auth');
const { sendSuccess, sendBadRequest, sendNotFound, sendError } = require('../../response');
const { logAudit } = require('../../audit');

module.exports = async function handler(req, res) {
  const user = requireAuth(req, res, [ROLES.OWNER, ROLES.ADMIN, ROLES.ORDER_MANAGER, ROLES.SUPPORT]);
  if (!user) return;

  const { id } = req.query || {};
  if (!id) {
    return sendBadRequest(res, 'Return ID is required');
  }

  if (req.method === 'PUT') {
    try {
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) { /* ignore */ }
      }

      const { status, admin_notes, reverse_awb } = body || {};
      let generatedAwb = reverse_awb;

      if (status === 'APPROVED' && !generatedAwb) {
        const shippingService = require('../../shipping');
        const ret = await db.getReturns();
        const currentRet = (ret || []).find(r => r.id === id);
        const retOrder = currentRet ? await db.getOrderById(currentRet.order_number) : null;
        if (retOrder) {
          const revShip = await shippingService.createReturnShipment({
            order_number: retOrder.order_number,
            customer: retOrder.customer,
            pickup_address: retOrder.shipping_address,
            items: retOrder.items || []
          });
          generatedAwb = revShip.reverse_awb;
        } else {
          generatedAwb = `REV-AWB-${Math.floor(10000000 + Math.random() * 90000000)}`;
        }
      }

      const updated = await db.updateReturn(id, {
        status,
        admin_notes,
        reverse_awb: generatedAwb
      });

      if (!updated) {
        return sendNotFound(res, `Return request '${id}' not found`);
      }

      req.user = user;
      await logAudit(req, {
        action: 'RETURN_STATUS_UPDATED',
        resource_type: 'RETURN',
        resource_id: id,
        details: { status, admin_notes }
      });

      return sendSuccess(res, updated, 'Return status updated successfully');
    } catch (err) {
      return sendError(res, 'Failed to update return', 500);
    }
  }

  return sendError(res, 'Method not allowed', 405);
};
