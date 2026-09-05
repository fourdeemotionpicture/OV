// ==============================================================================
// OV™ — ORDER DETAIL & LIFECYCLE API (/api/orders/[id])
// ==============================================================================

const db = require('../../lib/db');
const { requireAuth, ROLES } = require('../../lib/auth');
const { sendSuccess, sendError, sendNotFound, sendBadRequest } = require('../../lib/response');
const { logAudit } = require('../../lib/audit');

module.exports = async function handler(req, res) {
  const { id } = req.query || {};
  if (!id) {
    return sendBadRequest(res, 'Order ID or Order Number is required');
  }

  // GET /api/orders/[id]
  if (req.method === 'GET') {
    try {
      const order = await db.getOrderById(id);
      if (!order) {
        return sendNotFound(res, `Order '${id}' not found`);
      }
      return sendSuccess(res, order);
    } catch (err) {
      return sendError(res, 'Failed to fetch order', 500);
    }
  }

  // PUT /api/orders/[id] — Update Status (Admin Only)
  if (req.method === 'PUT') {
    const user = requireAuth(req, res, [ROLES.OWNER, ROLES.ADMIN, ROLES.ORDER_MANAGER, ROLES.WAREHOUSE]);
    if (!user) return;

    try {
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) { /* ignore */ }
      }

      const { order_status, payment_status, shipment_status, message } = body || {};

      const existing = await db.getOrderById(id);
      if (!existing) {
        return sendNotFound(res, `Order '${id}' not found`);
      }

      const updated = await db.updateOrderStatus(existing.id, {
        order_status,
        payment_status,
        shipment_status,
        message: message || `Status updated to ${order_status || existing.order_status}`
      });

      req.user = user;
      await logAudit(req, {
        action: 'ORDER_STATUS_UPDATED',
        resource_type: 'ORDER',
        resource_id: existing.id,
        details: {
          order_number: existing.order_number,
          new_order_status: order_status,
          new_payment_status: payment_status,
          new_shipment_status: shipment_status
        }
      });

      return sendSuccess(res, updated, 'Order status updated successfully');
    } catch (err) {
      return sendError(res, 'Failed to update order', 500);
    }
  }

  return sendError(res, 'Method not allowed', 405);
};
