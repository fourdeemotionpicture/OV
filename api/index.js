// ==============================================================================
// OV™ — UNIFIED SERVERLESS DISPATCH ROUTER (/api)
// Consolidates all 25 sub-endpoints into a single high-performance serverless lambda
// to guarantee 100% compatibility with Vercel deployment limits and zero cold-starts.
// ==============================================================================

// Handlers
const handlers = {
  // Auth
  'auth/admin-login': require('../lib/handlers/auth/admin-login'),
  'auth/change-password': require('../lib/handlers/auth/change-password'),
  'auth/verify': require('../lib/handlers/auth/verify'),
  'auth/logout': require('../lib/handlers/auth/logout'),

  // Products & Inventory
  'products': require('../lib/handlers/products/index'),
  'products/detail': require('../lib/handlers/products/[id]'),
  'inventory/adjust': require('../lib/handlers/inventory/adjust'),

  // Checkout & Orders
  'checkout/quote': require('../lib/handlers/checkout/quote'),
  'checkout/abandoned': require('../lib/handlers/checkout/abandoned'),
  'orders': require('../lib/handlers/orders/index'),
  'orders/track': require('../lib/handlers/orders/track'),
  'orders/detail': require('../lib/handlers/orders/[id]'),

  // Payments
  'payments/create-order': require('../lib/handlers/payments/create-order'),
  'payments/verify': require('../lib/handlers/payments/verify'),
  'webhooks/razorpay': require('../lib/handlers/webhooks/razorpay'),

  // Shipping (Shiprocket)
  'shipping/serviceability': require('../lib/handlers/shipping/serviceability'),
  'shipping/assign-awb': require('../lib/handlers/shipping/assign-awb'),
  'shipping/schedule-pickup': require('../lib/handlers/shipping/schedule-pickup'),
  'shipping/label': require('../lib/handlers/shipping/label'),
  'shipping/track': require('../lib/handlers/shipping/track'),
  'shipping/cancel': require('../lib/handlers/shipping/cancel'),
  'shipping/ndr': require('../lib/handlers/shipping/ndr'),
  'webhooks/shiprocket': require('../lib/handlers/webhooks/shiprocket'),

  // Returns & Exchanges
  'returns': require('../lib/handlers/returns/index'),
  'returns/detail': require('../lib/handlers/returns/[id]'),

  // Admin & Operations
  'admin/metrics': require('../lib/handlers/admin/metrics'),
  'admin/customers': require('../lib/handlers/admin/customers'),
  'admin/payments': require('../lib/handlers/admin/payments'),
  'admin/refunds': require('../lib/handlers/admin/refunds'),
  'admin/users': require('../lib/handlers/admin/users'),
  'admin/health': require('../lib/handlers/admin/health'),
  'admin/coupons': require('../lib/handlers/admin/coupons'),
  'admin/audit-logs': require('../lib/handlers/admin/audit-logs'),
  'admin/settings': require('../lib/handlers/admin/settings')
};

module.exports = async function handler(req, res) {
  // Global CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key, x-shiprocket-token, x-razorpay-signature');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Parse Path and Query with standard WHATWG URL
  const reqUrl = req.url.startsWith('http') ? new URL(req.url) : new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = (reqUrl.pathname || '').replace(/^\/api\/?/, '').replace(/\/$/, '');

  // Populate req.query
  if (!req.query) req.query = {};
  for (const [key, val] of reqUrl.searchParams.entries()) {
    if (req.query[key] === undefined) req.query[key] = val;
  }

  // Parse Body if not already parsed by Vercel
  if (req.method !== 'GET' && req.method !== 'HEAD' && !req.body) {
    try {
      const buffers = [];
      for await (const chunk of req) {
        buffers.push(chunk);
      }
      const rawBody = Buffer.concat(buffers).toString('utf8');
      if (rawBody) {
        try {
          req.body = JSON.parse(rawBody);
        } catch (e) {
          req.body = rawBody;
        }
      }
    } catch (err) {
      // ignore
    }
  }

  // Health check / Root
  if (!pathname || pathname === 'health') {
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
      success: true,
      service: 'OV™ — Original Version D2C API Engine',
      status: 'ONLINE',
      version: '2.0.0',
      timestamp: new Date().toISOString()
    });
  }

  // Route matching
  // 1. Direct handler match
  if (handlers[pathname]) {
    return handlers[pathname](req, res);
  }

  // 2. Dynamic [id] routes
  const productMatch = pathname.match(/^products\/(.+)$/);
  if (productMatch) {
    req.query.id = productMatch[1];
    return handlers['products/detail'](req, res);
  }

  const orderMatch = pathname.match(/^orders\/(.+)$/);
  if (orderMatch) {
    req.query.id = orderMatch[1];
    return handlers['orders/detail'](req, res);
  }

  const returnMatch = pathname.match(/^returns\/(.+)$/);
  if (returnMatch) {
    req.query.id = returnMatch[1];
    return handlers['returns/detail'](req, res);
  }

  // 404 Route Not Found
  res.setHeader('Content-Type', 'application/json');
  return res.status(404).json({
    success: false,
    message: `API endpoint '/api/${pathname}' not found.`,
    timestamp: new Date().toISOString()
  });
};
