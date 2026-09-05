// ==============================================================================
// OV™ — ADMIN LOGIN API (/api/auth/admin-login)
// ==============================================================================

const db = require('../../lib/db');
const { verifyPassword, generateToken } = require('../../lib/auth');
const { sendSuccess, sendError, sendUnauthorized, sendBadRequest } = require('../../lib/response');
const { logAudit } = require('../../lib/audit');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendError(res, 'Method not allowed', 405);
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) { /* ignore */ }
    }

    const { email, password } = body || {};

    if (!email || !password) {
      return sendBadRequest(res, 'Email and password are required');
    }

    const admin = await db.findAdminByEmail(email.trim());
    if (!admin) {
      return sendUnauthorized(res, 'Invalid credentials');
    }

    const isValid = verifyPassword(password, admin.password_hash);
    if (!isValid) {
      return sendUnauthorized(res, 'Invalid credentials');
    }

    // Generate JWT token
    const token = generateToken({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role
    });

    // Set secure HTTP-only cookie if in browser context
    res.setHeader('Set-Cookie', `ov_admin_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 24 * 3600}${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`);

    req.user = { id: admin.id, name: admin.name, email: admin.email, role: admin.role };
    await logAudit(req, {
      action: 'ADMIN_LOGIN',
      resource_type: 'AUTH',
      resource_id: admin.id,
      details: { email: admin.email, role: admin.role }
    });

    return sendSuccess(res, {
      token,
      user: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    }, 'Authentication successful');

  } catch (error) {
    console.error('[Admin Login API Error]', error);
    return sendError(res, 'Internal server error during authentication', 500);
  }
};
