// ==============================================================================
// OV™ — TRACK SHIPMENT BY AWB API (/api/shipping/track)
// ==============================================================================

const shippingService = require('../../lib/shipping');
const { sendSuccess, sendBadRequest, sendError } = require('../../lib/response');

module.exports = async function handler(req, res) {
  try {
    const { awb } = req.query || {};

    if (!awb) {
      return sendBadRequest(res, 'AWB tracking number is required');
    }

    const trackingData = await shippingService.trackShipment(awb.trim());
    return sendSuccess(res, trackingData, 'Tracking status fetched');
  } catch (err) {
    console.error('[Track Shipment Error]', err);
    return sendError(res, 'Failed to track shipment', 500);
  }
};
