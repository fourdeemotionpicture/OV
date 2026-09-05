// ==============================================================================
// OV™ — ADMIN AUDIT LOGS API (/api/admin/audit-logs)
// ==============================================================================

const db = require('../../lib/db');
const { requireAuth, ROLES } = require('../../lib/auth');
const { sendSuccess, sendError } = require('../../lib/response');

module.exports = async function handler(req, res) {
  const user = requireAuth(req, res, [ROLES.OWNER, ROLES.ADMIN]);
  if (!user) return;

  try {
    const limit = parseInt(req.query?.limit, 10) || 100;
    const logs = await db.getAuditLogs(limit);
    return sendSuccess(res, logs);
  } catch (err) {
    return sendError(res, 'Failed to fetch audit logs', 500);
  }
};
