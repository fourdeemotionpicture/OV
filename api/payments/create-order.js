// ==============================================================================
// OV™ — CREATE PAYMENT ORDER API (/api/payments/create-order)
// ==============================================================================

const paymentService = require('../../lib/payment/PaymentService');
const db = require('../../lib/db');
const { sendSuccess, sendBadRequest, sendError } = require('../../lib/response');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendError(res, 'Method not allowed', 405);
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) { /* ignore */ }
    }

    const { amount, order_id, currency = 'INR', customer_email, customer_phone } = body || {};

    if (!amount || amount <= 0) {
      return sendBadRequest(res, 'A positive payment amount is required');
    }

    const paymentOrder = await paymentService.createOrder({
      amount: parseFloat(amount),
      currency,
      receipt: order_id || `rcpt_${Date.now()}`,
      notes: {
        order_id: order_id || '',
        customer_email: customer_email || '',
        customer_phone: customer_phone || ''
      }
    });

    return sendSuccess(res, paymentOrder, 'Payment order created');
  } catch (err) {
    console.error('[Create Payment Order Error]', err);
    return sendError(res, err.message || 'Failed to create payment gateway order', 500);
  }
};
