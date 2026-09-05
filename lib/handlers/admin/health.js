// ==============================================================================
// OV™ — SYSTEM HEALTH & INTEGRATIONS DIAGNOSTIC API (/api/admin/health)
// ==============================================================================

const db = require('../../db');
const paymentService = require('../../payment/PaymentService');
const shippingService = require('../../shipping');
const { requireAuth, ROLES } = require('../../auth');
const { sendSuccess, sendError } = require('../../response');

module.exports = async function handler(req, res) {
  const user = requireAuth(req, res, [ROLES.OWNER, ROLES.ADMIN]);
  if (!user) return;

  try {
    let pgStatus = 'DISCONNECTED';
    let pgLatency = null;
    const startTime = Date.now();

    if (db.isPostgres()) {
      try {
        const check = await db.query('SELECT NOW() as server_time');
        pgLatency = `${Date.now() - startTime}ms`;
        pgStatus = check?.rows?.length > 0 ? 'HEALTHY' : 'DEGRADED';
      } catch (err) {
        pgStatus = `ERROR: ${err.message}`;
      }
    } else {
      pgStatus = 'DEV_FALLBACK_STORE';
    }

    const healthReport = {
      status: 'ONLINE',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      runtime: {
        node_version: process.version,
        uptime_seconds: Math.floor(process.uptime()),
        memory_usage_mb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024)
      },
      integrations: {
        database: {
          engine: db.isPostgres() ? 'PostgreSQL' : 'Embedded JSON Store (Dev)',
          status: pgStatus,
          latency: pgLatency,
          is_production_ready: db.isPostgres()
        },
        payment_gateway: {
          provider: 'Razorpay',
          configured: paymentService.isConfigured(),
          key_id_set: Boolean(process.env.RAZORPAY_KEY_ID || process.env.PAYMENT_GATEWAY_KEY_ID),
          key_secret_set: Boolean(process.env.RAZORPAY_KEY_SECRET || process.env.PAYMENT_GATEWAY_KEY_SECRET),
          webhook_secret_set: Boolean(process.env.RAZORPAY_WEBHOOK_SECRET || process.env.PAYMENT_WEBHOOK_SECRET)
        },
        shipping_logistics: {
          provider: 'Shiprocket',
          configured: shippingService.provider.isConfigured(),
          api_email_set: Boolean(process.env.SHIPROCKET_API_EMAIL),
          api_password_set: Boolean(process.env.SHIPROCKET_API_PASSWORD),
          pickup_location: process.env.SHIPROCKET_PICKUP_LOCATION || 'Primary',
          webhook_token_set: Boolean(process.env.SHIPROCKET_WEBHOOK_TOKEN)
        }
      }
    };

    return sendSuccess(res, healthReport);
  } catch (err) {
    console.error('[Health Check Error]', err);
    return sendError(res, 'Health check diagnostic failed', 500);
  }
};
