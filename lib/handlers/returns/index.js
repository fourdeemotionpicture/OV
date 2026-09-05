// ==============================================================================
// OV™ — RETURNS & EXCHANGES API (/api/returns)
// ==============================================================================

const db = require('../../db');
const { requireAuth, ROLES } = require('../../auth');
const { sendSuccess, sendBadRequest, sendNotFound, sendError } = require('../../response');
const { logAudit } = require('../../audit');

module.exports = async function handler(req, res) {
  // GET /api/returns — Admin list returns
  if (req.method === 'GET') {
    const user = requireAuth(req, res, [ROLES.OWNER, ROLES.ADMIN, ROLES.ORDER_MANAGER, ROLES.SUPPORT]);
    if (!user) return;

    try {
      const returns = await db.getReturns();
      return sendSuccess(res, returns);
    } catch (err) {
      return sendError(res, 'Failed to fetch returns', 500);
    }
  }

  // POST /api/returns — Customer creates return/exchange request
  if (req.method === 'POST') {
    try {
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) { /* ignore */ }
      }

      const { order_number, type = 'EXCHANGE', reason, desired_size, notes } = body || {};

      if (!order_number || !reason) {
        return sendBadRequest(res, 'Order number and reason are required');
      }

      const order = await db.getOrderById(order_number);
      if (!order) {
        return sendNotFound(res, `Order '${order_number}' not found`);
      }

      const returnRequest = await db.createReturn({
        order_id: order.id,
        order_number: order.order_number,
        customer_name: order.customer.name,
        customer_phone: order.customer.phone,
        type: type.toUpperCase(), // RETURN or EXCHANGE
        reason,
        desired_size: desired_size || null,
        notes: notes || '',
        status: 'REQUESTED'
      });

      await db.updateOrderStatus(order.id, {
        message: `Customer initiated ${type.toUpperCase()} request: ${reason}`
      });

      return sendSuccess(res, returnRequest, 'Return/Exchange request submitted successfully. Our team will review within 24 hours.', 201);
    } catch (err) {
      console.error('[Return Request Error]', err);
      return sendError(res, 'Failed to submit return request', 500);
    }
  }

  return sendError(res, 'Method not allowed', 405);
};
