// ==============================================================================
// OV™ — ABANDONED CHECKOUT TRACKING API (/api/checkout/abandoned)
// ==============================================================================

const db = require('../../db');
const { verifyAuthToken, ROLES } = require('../../auth');
const { sendSuccess, sendError, sendBadRequest, sendUnauthorized } = require('../../response');

module.exports = async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) { /* ignore */ }
      }

      const { session_id, customer_email, customer_phone, customer_name, items, subtotal } = body || {};

      if (!session_id || !items || !Array.isArray(items) || items.length === 0) {
        return sendBadRequest(res, 'Session ID and items array are required');
      }

      const record = await db.saveAbandonedCheckout({
        session_id,
        customer_email: customer_email || null,
        customer_phone: customer_phone || null,
        customer_name: customer_name || null,
        items,
        subtotal: Number(subtotal) || 0
      });

      return sendSuccess(res, { tracked: true, id: record.id });
    }

    if (req.method === 'GET') {
      const user = verifyAuthToken(req);
      if (!user) {
        return sendUnauthorized(res, 'Authentication required to view abandoned checkouts');
      }

      const list = await db.getAbandonedCheckouts();
      return sendSuccess(res, list);
    }

    return sendError(res, 'Method not allowed', 405);
  } catch (err) {
    console.error('[Abandoned Checkout API Error]', err);
    return sendError(res, 'Failed to process abandoned checkout', 500);
  }
};
