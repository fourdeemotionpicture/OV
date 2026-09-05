// ==============================================================================
// OV™ — SHIPPING SERVICEABILITY & COURIER RATES API (/api/shipping/serviceability)
// ==============================================================================

const shippingService = require('../../lib/shipping');
const db = require('../../lib/db');
const { sendSuccess, sendBadRequest, sendError } = require('../../lib/response');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return sendError(res, 'Method not allowed', 405);
  }

  try {
    const params = req.method === 'GET' ? req.query : req.body;
    const { pincode, weight_kg = 0.45, cod = 0 } = params || {};

    if (!pincode || !/^\d{6}$/.test(pincode.toString().trim())) {
      return sendBadRequest(res, 'A valid 6-digit Indian delivery pincode is required');
    }

    const settings = await db.getSettings();
    const pickupPincode = settings.pickup_pincode || '600006';

    const result = await shippingService.checkServiceability({
      pickup_postcode: pickupPincode,
      delivery_postcode: pincode.toString().trim(),
      weight_kg: parseFloat(weight_kg) || 0.45,
      cod: parseInt(cod, 10) || 0
    });

    return sendSuccess(res, result, 'Serviceability and courier rates checked');
  } catch (err) {
    console.error('[Shipping Serviceability Error]', err);
    return sendError(res, 'Failed to check shipping serviceability', 500);
  }
};
