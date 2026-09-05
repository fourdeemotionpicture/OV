// ==============================================================================
// OV™ — PUBLIC ORDER TRACKING API (/api/orders/track)
// ==============================================================================

const db = require('../../lib/db');
const { sendSuccess, sendNotFound, sendBadRequest, sendError } = require('../../lib/response');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return sendError(res, 'Method not allowed', 405);
  }

  try {
    const { order_number, query } = req.query || {};
    const searchParam = (order_number || query || '').trim().toUpperCase();

    if (!searchParam) {
      return sendBadRequest(res, 'Please provide an Order Number (e.g. OV-10001) or AWB Tracking Number');
    }

    const order = await db.getOrderById(searchParam);
    if (!order) {
      return sendNotFound(res, `No active shipment or order found matching '${searchParam}'`);
    }

    const shipment = await db.getShipmentByOrderId(order.id);

    return sendSuccess(res, {
      order_number: order.order_number,
      created_at: order.created_at,
      order_status: order.order_status,
      shipment_status: order.shipment_status,
      payment_method: order.payment_method,
      items_count: order.items?.reduce((sum, i) => sum + i.quantity, 0) || 1,
      items: order.items?.map(i => ({ title: i.product_title, size: i.size, quantity: i.quantity })),
      timeline: order.timeline || [],
      shipment: shipment ? {
        courier_name: shipment.courier_name,
        awb_code: shipment.awb_code,
        pickup_scheduled_date: shipment.pickup_scheduled_date,
        status: shipment.status,
        tracking_url: shipment.awb_code ? `https://shiprocket.co/tracking/${shipment.awb_code}` : null
      } : null
    }, 'Order tracking information retrieved');

  } catch (err) {
    console.error('[Track Order Error]', err);
    return sendError(res, 'Failed to retrieve tracking details', 500);
  }
};
