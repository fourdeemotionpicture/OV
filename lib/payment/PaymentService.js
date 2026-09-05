// ==============================================================================
// OV™ — PAYMENT SERVICE ENGINE (Razorpay Integration + Signature Verification)
// ==============================================================================

const crypto = require('crypto');
const https = require('https');

const KEY_ID = process.env.PAYMENT_GATEWAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
const KEY_SECRET = process.env.PAYMENT_GATEWAY_KEY_SECRET || process.env.RAZORPAY_KEY_SECRET;
const WEBHOOK_SECRET = process.env.PAYMENT_WEBHOOK_SECRET || process.env.RAZORPAY_WEBHOOK_SECRET;

class PaymentService {
  constructor() {
    this.keyId = KEY_ID;
    this.keySecret = KEY_SECRET;
    this.webhookSecret = WEBHOOK_SECRET;
  }

  isConfigured() {
    return Boolean(this.keyId && this.keySecret && !this.keyId.includes('your_key'));
  }

  // Server-to-server HTTPS request helper
  async _request(method, path, body = null) {
    return new Promise((resolve, reject) => {
      const auth = Buffer.from(`${this.keyId}:${this.keySecret}`).toString('base64');
      const req = https.request({
        hostname: 'api.razorpay.com',
        port: 443,
        path: `/v1${path}`,
        method,
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        }
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(parsed);
            } else {
              reject(new Error(parsed.error?.description || `Razorpay error HTTP ${res.statusCode}`));
            }
          } catch (e) {
            reject(new Error(`Failed to parse Razorpay response: ${data}`));
          }
        });
      });

      req.on('error', reject);
      if (body) req.write(JSON.stringify(body));
      req.end();
    });
  }

  /**
   * Create Razorpay Order
   * @param {Object} opts { amount: Number (in INR), currency: 'INR', receipt: String, notes: Object }
   */
  async createOrder({ amount, currency = 'INR', receipt, notes = {} }) {
    const amountInPaise = Math.round(amount * 100);

    if (this.isConfigured()) {
      const payload = {
        amount: amountInPaise,
        currency,
        receipt: receipt || `rcpt_${Date.now()}`,
        notes: {
          brand: 'OV — ORIGINAL VERSION',
          ...notes
        }
      };

      const response = await this._request('POST', '/orders', payload);
      return {
        order_id: response.id,
        amount: response.amount,
        currency: response.currency,
        key_id: this.keyId,
        is_simulated: false
      };
    }

    // Resilient Sandbox/Demo Mode when credentials are not yet configured in .env
    console.warn('[OV PaymentService] Razorpay live keys not configured. Generating sandbox test order.');
    const simulatedOrderId = `order_sim_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;
    return {
      order_id: simulatedOrderId,
      amount: amountInPaise,
      currency: 'INR',
      key_id: this.keyId || 'rzp_test_simulated',
      is_simulated: true
    };
  }

  /**
   * Verify HMAC-SHA256 signature returned by client Razorpay modal
   */
  verifySignature({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return false;
    }

    // In sandbox simulation mode (strictly forbidden in production)
    if (razorpay_order_id.startsWith('order_sim_')) {
      if (process.env.NODE_ENV === 'production') {
        console.error('[SECURITY ALERT] Simulated order verification attempted in production mode!');
        return false;
      }
      return true;
    }

    if (!this.keySecret) {
      return false;
    }

    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSig = crypto
      .createHmac('sha256', this.keySecret)
      .update(payload)
      .digest('hex');

    return expectedSig === razorpay_signature;
  }

  /**
   * Create Razorpay Refund
   * @param {Object} opts { payment_id, amount, notes }
   */
  async createRefund({ payment_id, amount, notes = {} }) {
    const amountInPaise = Math.round(amount * 100);

    if (this.isConfigured() && !payment_id.startsWith('pay_demo_')) {
      try {
        const payload = {
          amount: amountInPaise,
          notes: {
            brand: 'OV — ORIGINAL VERSION',
            ...notes
          }
        };

        const res = await this._request('POST', `/payments/${payment_id}/refund`, payload);
        return {
          refund_id: res.id,
          payment_id: res.payment_id,
          amount: res.amount / 100,
          status: res.status,
          is_simulated: false
        };
      } catch (err) {
        console.error('[Razorpay Refund Error]', err.message);
        throw err;
      }
    }

    // Dev/sandbox simulated refund
    return {
      refund_id: `rfnd_sim_${Date.now().toString(36)}`,
      payment_id,
      amount,
      status: 'processed',
      is_simulated: true
    };
  }

  /**
   * Verify webhook signature
   */
  verifyWebhookSignature(rawBody, signatureHeader) {
    if (!this.webhookSecret || !signatureHeader) return false;
    const expectedSig = crypto
      .createHmac('sha256', this.webhookSecret)
      .update(rawBody)
      .digest('hex');
    return expectedSig === signatureHeader;
  }
}

module.exports = new PaymentService();
