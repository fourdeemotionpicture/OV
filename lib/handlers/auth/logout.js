// ==============================================================================
// OV™ — ADMIN LOGOUT API (/api/auth/logout)
// ==============================================================================

const { sendSuccess } = require('../../response');

module.exports = async function handler(req, res) {
  res.setHeader('Set-Cookie', 'ov_admin_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');
  return sendSuccess(res, null, 'Logged out successfully');
};
