// ==============================================================================
// OV™ — ADMIN REFUNDS API (/api/admin/refunds)
// ==============================================================================

const db = require('../../db');
const paymentService = require('../../payment/PaymentService');
const { requireAuth, ROLES } = require('../../auth');
const { sendSuccess, sendError, sendBadRequest } = require('../../response');
const { logAudit } = require('../../audit');

module.exports = async function handler(req, res) {
  const user = requireAuth(req, res, [ROLES.OWNER, ROLES.ADMIN, ROLES.ORDER_MANAGER, ROLES.ACCOUNTANT]);
  if (!user) return;

  try {
    if (req.method === 'GET') {
      const refunds = await db.getRefunds();
      return sendSuccess(res, refunds);
    }

    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) { /* ignore */ }
      }

      const { order_number, amount, reason = 'Customer return approved' } = body || {};
      if (!order_number || !amount) {
        return sendBadRequest(res, 'Order number and amount are required');
      }

      const order = await db.getOrderById(order_number);
      if (!order) {
        return sendBadRequest(res, 'Order not found');
      }

      let gatewayRefundId = null;

      // If prepaid online via Razorpay, trigger Razorpay refund API
      if (order.payment_method !== 'COD' && order.payment_id) {
        try {
          const rzpRefund = await paymentService.createRefund({
            payment_id: order.payment_id,
            amount: Number(amount),
            notes: { order_number, reason }
          });
          gatewayRefundId = rzpRefund.refund_id;
        } catch (rzpErr) {
          console.error('[Razorpay Refund Error]', rzpErr.message);
          return sendError(res, `Razorpay refund failed: ${rzpErr.message}`, 502);
        }
      } else {
        gatewayRefundId = `COD-REF-${Date.now().toString().slice(-6)}`;
      }

      // Record refund in database
      const refundRecord = await db.createRefund({
        order_id: order.id,
        order_number: order.order_number,
        payment_id: order.payment_id || 'COD',
        gateway_refund_id: gatewayRefundId,
        amount: Number(amount),
        reason
      });

      // Update order status
      await db.updateOrderStatus(order.id, {
        payment_status: 'REFUNDED',
        order_status: 'CANCELLED',
        message: `Refund of ₹${amount} processed successfully (Ref: ${gatewayRefundId})`
      });

      await logAudit(req, {
        action: 'REFUND_PROCESSED',
        resource_type: 'ORDER',
        resource_id: order.order_number,
        details: { amount, gatewayRefundId, reason }
      });

      return sendSuccess(res, refundRecord, 'Refund processed successfully');
    }

    return sendError(res, 'Method not allowed', 405);
  } catch (err) {
    console.error('[Admin Refunds Error]', err);
    return sendError(res, 'Failed to process refund', 500);
  }
};
