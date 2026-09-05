// ==============================================================================
// OV™ — ADMIN USERS & RBAC API (/api/admin/users)
// ==============================================================================

const db = require('../../db');
const { requireAuth, ROLES, hashPassword } = require('../../auth');
const { sendSuccess, sendError, sendBadRequest } = require('../../response');
const { logAudit } = require('../../audit');

module.exports = async function handler(req, res) {
  const user = requireAuth(req, res, [ROLES.OWNER, ROLES.ADMIN]);
  if (!user) return;

  try {
    if (req.method === 'GET') {
      const users = await db.getAdminUsers();
      // Ensure password_hash is never exposed
      const safeUsers = (users || []).map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        is_active: u.is_active,
        created_at: u.created_at,
        last_login_at: u.last_login_at
      }));
      return sendSuccess(res, safeUsers);
    }

    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) { /* ignore */ }
      }

      const { name, email, password, role } = body || {};
      if (!name || !email || !password || !role) {
        return sendBadRequest(res, 'Name, email, password, and role are required');
      }

      if (!ROLES[role]) {
        return sendBadRequest(res, `Invalid role. Allowed roles: ${Object.keys(ROLES).join(', ')}`);
      }

      if (password.length < 8) {
        return sendBadRequest(res, 'Password must be at least 8 characters long');
      }

      const existing = await db.findAdminByEmail(email.trim());
      if (existing) {
        return sendBadRequest(res, 'An account with this email already exists');
      }

      const password_hash = hashPassword(password);
      const newUser = await db.createAdminUser({
        name: name.trim(),
        email: email.trim(),
        password_hash,
        role
      });

      await logAudit(req, {
        action: 'ADMIN_USER_CREATED',
        resource_type: 'USER',
        resource_id: newUser.id,
        details: { email: newUser.email, role: newUser.role }
      });

      return sendSuccess(res, newUser, 'Admin user created successfully', 201);
    }

    return sendError(res, 'Method not allowed', 405);
  } catch (err) {
    console.error('[Admin Users API Error]', err);
    return sendError(res, 'Failed to manage admin users', 500);
  }
};
