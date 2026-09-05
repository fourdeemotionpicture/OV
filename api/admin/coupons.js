// ==============================================================================
// OV™ — ADMIN COUPONS API (/api/admin/coupons)
// ==============================================================================

const db = require('../../lib/db');
const { requireAuth, ROLES } = require('../../lib/auth');
const { sendSuccess, sendBadRequest, sendError } = require('../../lib/response');
const { logAudit } = require('../../lib/audit');

module.exports = async function handler(req, res) {
  const user = requireAuth(req, res, [ROLES.OWNER, ROLES.ADMIN, ROLES.MARKETING]);
  if (!user) return;

  // GET
  if (req.method === 'GET') {
    try {
      const coupons = await db.getCoupons();
      return sendSuccess(res, coupons);
    } catch (err) {
      return sendError(res, 'Failed to fetch coupons', 500);
    }
  }

  // POST (Create coupon)
  if (req.method === 'POST') {
    try {
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) { /* ignore */ }
      }

      const { code, discount_type, discount_value, min_order_amount, max_discount, expires_at } = body || {};

      if (!code || !discount_value) {
        return sendBadRequest(res, 'Coupon code and discount value are required');
      }

      const newCoupon = {
        code: code.trim().toUpperCase(),
        discount_type: discount_type || 'PERCENTAGE',
        discount_value: parseFloat(discount_value),
        min_order_amount: min_order_amount ? parseFloat(min_order_amount) : 0,
        max_discount: max_discount ? parseFloat(max_discount) : null,
        expires_at: expires_at || null,
        is_active: true
      };

      const saved = await db.saveCoupon(newCoupon);

      req.user = user;
      await logAudit(req, {
        action: 'COUPON_CREATED',
        resource_type: 'COUPON',
        resource_id: newCoupon.code,
        details: newCoupon
      });

      return sendSuccess(res, saved, 'Coupon created successfully', 201);
    } catch (err) {
      return sendError(res, 'Failed to create coupon', 500);
    }
  }

  return sendError(res, 'Method not allowed', 405);
};
