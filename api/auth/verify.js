// ==============================================================================
// OV™ — AUTH SESSION VERIFICATION API (/api/auth/verify)
// ==============================================================================

const { verifyAuthToken } = require('../../lib/auth');
const { sendSuccess, sendUnauthorized } = require('../../lib/response');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const user = verifyAuthToken(req);
  if (!user) {
    return sendUnauthorized(res, 'Session expired or invalid');
  }

  return sendSuccess(res, { user }, 'Session is valid');
};
