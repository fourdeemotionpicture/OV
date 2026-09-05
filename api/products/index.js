// ==============================================================================
// OV™ — PRODUCTS CATALOG API (/api/products)
// ==============================================================================

const db = require('../../lib/db');
const { requireAuth, ROLES } = require('../../lib/auth');
const { sendSuccess, sendError, sendBadRequest } = require('../../lib/response');
const { logAudit } = require('../../lib/audit');

module.exports = async function handler(req, res) {
  // GET /api/products — Public listing
  if (req.method === 'GET') {
    try {
      const { status, featured } = req.query || {};
      const filters = {};
      if (status) filters.status = status;
      if (featured !== undefined) filters.featured = featured === 'true';

      const products = await db.getProducts(filters);
      return sendSuccess(res, products);
    } catch (err) {
      console.error('[Get Products Error]', err);
      return sendError(res, 'Failed to fetch products', 500);
    }
  }

  // POST /api/products — Create Product (Admin Only)
  if (req.method === 'POST') {
    const user = requireAuth(req, res, [ROLES.OWNER, ROLES.ADMIN]);
    if (!user) return; // Response handled by requireAuth

    try {
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) { /* ignore */ }
      }

      const { title, slug, description, base_price, compare_at_price, cost_price, status, weight_grams, images, attributes, variants } = body || {};

      if (!title || !base_price) {
        return sendBadRequest(res, 'Product title and base price are required');
      }

      const newProduct = {
        id: `prod-${Date.now()}`,
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        description: description || '',
        base_price: parseFloat(base_price),
        compare_at_price: compare_at_price ? parseFloat(compare_at_price) : null,
        cost_price: cost_price ? parseFloat(cost_price) : null,
        status: status || 'DRAFT',
        weight_grams: weight_grams ? parseInt(weight_grams, 10) : 450,
        images: Array.isArray(images) ? images : [],
        attributes: attributes || {},
        created_at: new Date().toISOString()
      };

      const saved = await db.saveProduct(newProduct);

      req.user = user;
      await logAudit(req, {
        action: 'PRODUCT_CREATED',
        resource_type: 'PRODUCT',
        resource_id: newProduct.id,
        details: { title: newProduct.title, price: newProduct.base_price }
      });

      return sendSuccess(res, saved, 'Product created successfully', 201);
    } catch (err) {
      console.error('[Create Product Error]', err);
      return sendError(res, 'Failed to create product', 500);
    }
  }

  return sendError(res, 'Method not allowed', 405);
};
