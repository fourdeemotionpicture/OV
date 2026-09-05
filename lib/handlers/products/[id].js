// ==============================================================================
// OV™ — SINGLE PRODUCT API (/api/products/[id])
// ==============================================================================

const db = require('../../db');
const { requireAuth, ROLES } = require('../../auth');
const { sendSuccess, sendError, sendNotFound, sendBadRequest } = require('../../response');
const { logAudit } = require('../../audit');

module.exports = async function handler(req, res) {
  const { id } = req.query || {};
  if (!id) {
    return sendBadRequest(res, 'Product ID or slug is required');
  }

  // GET /api/products/[id] — Public product details
  if (req.method === 'GET') {
    try {
      const product = await db.getProductById(id);
      if (!product) {
        return sendNotFound(res, 'Product not found');
      }
      return sendSuccess(res, product);
    } catch (err) {
      return sendError(res, 'Failed to fetch product', 500);
    }
  }

  // PUT /api/products/[id] — Update Product (Admin Only)
  if (req.method === 'PUT') {
    const user = requireAuth(req, res, [ROLES.OWNER, ROLES.ADMIN]);
    if (!user) return;

    try {
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) { /* ignore */ }
      }

      const existing = await db.getProductById(id);
      if (!existing) {
        return sendNotFound(res, 'Product not found');
      }

      const updated = await db.saveProduct({ ...existing, ...body, id: existing.id });

      req.user = user;
      await logAudit(req, {
        action: 'PRODUCT_UPDATED',
        resource_type: 'PRODUCT',
        resource_id: existing.id,
        details: body
      });

      return sendSuccess(res, updated, 'Product updated successfully');
    } catch (err) {
      return sendError(res, 'Failed to update product', 500);
    }
  }

  // DELETE /api/products/[id] — Delete Product (Owner Only)
  if (req.method === 'DELETE') {
    const user = requireAuth(req, res, [ROLES.OWNER]);
    if (!user) return;

    try {
      await db.deleteProduct(id);

      req.user = user;
      await logAudit(req, {
        action: 'PRODUCT_DELETED',
        resource_type: 'PRODUCT',
        resource_id: id,
        details: { id }
      });

      return sendSuccess(res, null, 'Product deleted successfully');
    } catch (err) {
      return sendError(res, 'Failed to delete product', 500);
    }
  }

  return sendError(res, 'Method not allowed', 405);
};
