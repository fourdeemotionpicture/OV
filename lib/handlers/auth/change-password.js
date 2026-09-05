// ==============================================================================
// OV™ — ADMIN PASSWORD CHANGE & ROTATION API (/api/auth/change-password)
// ==============================================================================

const db = require('../../db');
const { requireAuth, hashPassword, verifyPassword } = require('../../auth');
const { sendSuccess, sendError, sendBadRequest, sendUnauthorized } = require('../../response');
const { logAudit } = require('../../audit');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendError(res, 'Method not allowed', 405);
  }

  const user = requireAuth(req, res);
  if (!user) return;

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) { /* ignore */ }
    }

    const { current_password, new_password } = body || {};

    if (!current_password || !new_password) {
      return sendBadRequest(res, 'Current password and new password are required');
    }

    if (new_password.length < 8) {
      return sendBadRequest(res, 'New password must be at least 8 characters long');
    }

    const admin = await db.findAdminById(user.id);
    if (!admin) {
      return sendUnauthorized(res, 'Admin account not found');
    }

    const isValid = verifyPassword(current_password, admin.password_hash);
    if (!isValid) {
      return sendUnauthorized(res, 'Current password is incorrect');
    }

    const newHash = hashPassword(new_password);
    await db.updateAdminPassword(admin.id, newHash);

    await logAudit(req, {
      action: 'ADMIN_PASSWORD_ROTATED',
      resource_type: 'AUTH',
      resource_id: admin.id,
      details: { email: admin.email, message: 'Password rotated successfully' }
    });

    return sendSuccess(res, { success: true }, 'Password rotated successfully');
  } catch (err) {
    console.error('[Change Password Error]', err);
    return sendError(res, 'Failed to update password', 500);
  }
};
