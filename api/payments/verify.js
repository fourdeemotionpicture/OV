// ==============================================================================
// OV™ — PAYMENT VERIFY API (/api/payments/verify)
// ==============================================================================

const paymentService = require('../../lib/payment/PaymentService');
const db = require('../../lib/db');
const { sendSuccess, sendBadRequest, sendError } = require('../../lib/response');
const { logAudit } = require('../../lib/audit');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendError(res, 'Method not allowed', 405);
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) { /* ignore */ }
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, internal_order_id } = body || {};

    if (!razorpay_order_id || !razorpay_payment_id) {
      return sendBadRequest(res, 'Missing razorpay_order_id or razorpay_payment_id');
    }

    const isValid = paymentService.verifySignature({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    });

    if (!isValid) {
      return sendBadRequest(res, 'Invalid payment signature. Verification failed.');
    }

    // Update order status if internal_order_id provided
    let updatedOrder = null;
    if (internal_order_id) {
      updatedOrder = await db.updateOrderStatus(internal_order_id, {
        order_status: 'PROCESSING',
        payment_status: 'PAID',
        message: `Payment verified via Razorpay (${razorpay_payment_id})`
      });

      await logAudit(req, {
        action: 'PAYMENT_VERIFIED',
        resource_type: 'ORDER',
        resource_id: internal_order_id,
        details: { razorpay_payment_id, razorpay_order_id }
      });
    }

    return sendSuccess(res, {
      verified: true,
      payment_id: razorpay_payment_id,
      order: updatedOrder
    }, 'Payment successfully verified');

  } catch (err) {
    console.error('[Payment Verify Error]', err);
    return sendError(res, 'Error verifying payment', 500);
  }
};
