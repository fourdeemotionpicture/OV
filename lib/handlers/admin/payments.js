// ==============================================================================
// OV™ — ADMIN PAYMENTS & COD API (/api/admin/payments)
// ==============================================================================

const db = require('../../db');
const { requireAuth, ROLES } = require('../../auth');
const { sendSuccess, sendError, sendBadRequest } = require('../../response');
const { logAudit } = require('../../audit');

module.exports = async function handler(req, res) {
  const user = requireAuth(req, res, [ROLES.OWNER, ROLES.ADMIN, ROLES.ORDER_MANAGER, ROLES.ACCOUNTANT]);
  if (!user) return;

  try {
    if (req.method === 'GET') {
      const payments = await db.getPayments();
      return sendSuccess(res, payments);
    }

    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) { /* ignore */ }
      }

      const { order_number, action } = body || {};
      if (!order_number) {
        return sendBadRequest(res, 'Order number is required');
      }

      const order = await db.getOrderById(order_number);
      if (!order) {
        return sendBadRequest(res, 'Order not found');
      }

      if (action === 'MARK_COD_COLLECTED') {
        await db.updateOrderStatus(order.id, {
          payment_status: 'PAID',
          message: `COD cash collected upon delivery by courier`
        });

        await logAudit(req, {
          action: 'COD_PAYMENT_COLLECTED',
          resource_type: 'ORDER',
          resource_id: order.order_number,
          details: { amount: order.total_amount }
        });

        return sendSuccess(res, { success: true, order_number: order.order_number, payment_status: 'PAID' }, 'COD marked as collected');
      }

      return sendBadRequest(res, 'Invalid action specified');
    }

    return sendError(res, 'Method not allowed', 405);
  } catch (err) {
    console.error('[Admin Payments Error]', err);
    return sendError(res, 'Failed to process payments request', 500);
  }
};
