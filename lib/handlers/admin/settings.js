// ==============================================================================
// OV™ — STORE SETTINGS API (/api/admin/settings)
// ==============================================================================

const db = require('../../db');
const { requireAuth, ROLES } = require('../../auth');
const { sendSuccess, sendBadRequest, sendError } = require('../../response');
const { logAudit } = require('../../audit');

module.exports = async function handler(req, res) {
  // GET /api/admin/settings
  if (req.method === 'GET') {
    try {
      const settings = await db.getSettings();
      return sendSuccess(res, settings);
    } catch (err) {
      return sendError(res, 'Failed to fetch settings', 500);
    }
  }

  // PUT /api/admin/settings — Owner Only
  if (req.method === 'PUT') {
    const user = requireAuth(req, res, [ROLES.OWNER]);
    if (!user) return;

    try {
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) { /* ignore */ }
      }

      const updated = await db.updateSettings(body);

      req.user = user;
      await logAudit(req, {
        action: 'SETTINGS_UPDATED',
        resource_type: 'SETTINGS',
        resource_id: 'STORE',
        details: body
      });

      return sendSuccess(res, updated, 'Store settings updated successfully');
    } catch (err) {
      return sendError(res, 'Failed to update settings', 500);
    }
  }

  return sendError(res, 'Method not allowed', 405);
};
