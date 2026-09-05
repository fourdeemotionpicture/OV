// ==============================================================================
// OV™ — AUDIT LOGGING HELPER
// ==============================================================================

const db = require('./db');

async function logAudit(req, { action, resource_type, resource_id, details }) {
  try {
    const user = req?.user || null;
    const ip = req?.headers?.['x-forwarded-for'] || req?.socket?.remoteAddress || '127.0.0.1';

    return await db.addAuditLog({
      admin_user_id: user?.id || 'system',
      user_name: user?.name || (user?.email ? user.email : 'System'),
      action,
      resource_type: resource_type || 'GENERAL',
      resource_id: resource_id || 'N/A',
      details,
      ip_address: ip
    });
  } catch (err) {
    console.error('[Audit Log Error]', err);
  }
}

module.exports = { logAudit };
