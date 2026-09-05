// ==============================================================================
// OV™ — ADMIN CUSTOMERS API (/api/admin/customers)
// ==============================================================================

const db = require('../../db');
const { requireAuth, ROLES } = require('../../auth');
const { sendSuccess, sendError, sendBadRequest } = require('../../response');

module.exports = async function handler(req, res) {
  const user = requireAuth(req, res, [ROLES.OWNER, ROLES.ADMIN, ROLES.ORDER_MANAGER, ROLES.MARKETING, ROLES.SUPPORT]);
  if (!user) return;

  try {
    if (req.method === 'GET') {
      const customers = await db.getCustomers();
      return sendSuccess(res, customers);
    }

    if (req.method === 'PUT') {
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) { /* ignore */ }
      }
      const { phone, group_tag } = body || {};
      if (!phone || !group_tag) {
        return sendBadRequest(res, 'Phone and group_tag are required');
      }

      if (db.isPostgres()) {
        await db.query('UPDATE customers SET group_tag = $1, updated_at = NOW() WHERE phone = $2', [group_tag, phone]);
      }
      return sendSuccess(res, { success: true, phone, group_tag }, 'Customer updated successfully');
    }

    return sendError(res, 'Method not allowed', 405);
  } catch (err) {
    console.error('[Admin Customers API Error]', err);
    return sendError(res, 'Failed to process customer request', 500);
  }
};
