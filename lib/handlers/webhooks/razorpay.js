// ==============================================================================
// OV™ — RAZORPAY WEBHOOK RECEIVER (/api/webhooks/razorpay)
// ==============================================================================

const paymentService = require('../../payment/PaymentService');
const db = require('../../db');
const { sendSuccess, sendBadRequest, sendError } = require('../../response');
const { logAudit } = require('../../audit');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendError(res, 'Method not allowed', 405);
  }

  try {
    const signature = req.headers['x-razorpay-signature'];
    let body = req.body;
    let rawBody = '';

    if (typeof body === 'string') {
      rawBody = body;
      try { body = JSON.parse(body); } catch (e) { /* ignore */ }
    } else {
      rawBody = JSON.stringify(body);
    }

    if (paymentService.isConfigured()) {
      const isValid = paymentService.verifyWebhookSignature(rawBody, signature);
      if (!isValid) {
        return sendBadRequest(res, 'Invalid webhook signature');
      }
    }

    const { event, payload } = body || {};

    if (event === 'payment.captured' || event === 'order.paid') {
      const payment = payload?.payment?.entity;
      const orderReceipt = payment?.notes?.order_id || payment?.receipt;

      if (orderReceipt) {
        await db.updateOrderStatus(orderReceipt, {
          order_status: 'PROCESSING',
          payment_status: 'PAID',
          message: `Webhook confirmed payment captured: ${payment.id}`
        });

        await logAudit(req, {
          action: 'WEBHOOK_PAYMENT_CAPTURED',
          resource_type: 'ORDER',
          resource_id: orderReceipt,
          details: { payment_id: payment.id, event }
        });
      }
    } else if (event === 'payment.failed') {
      const payment = payload?.payment?.entity;
      const orderReceipt = payment?.notes?.order_id;
      if (orderReceipt) {
        await db.updateOrderStatus(orderReceipt, {
          payment_status: 'FAILED',
          message: `Payment failed: ${payment.error_description || 'Gateway error'}`
        });
      }
    }

    return sendSuccess(res, { received: true });
  } catch (err) {
    console.error('[Razorpay Webhook Error]', err);
    return sendError(res, 'Webhook processing failed', 500);
  }
};
