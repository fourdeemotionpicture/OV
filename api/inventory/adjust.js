// ==============================================================================
// OV™ — INVENTORY ADJUSTMENT API (/api/inventory/adjust)
// ==============================================================================

const db = require('../../lib/db');
const { requireAuth, ROLES } = require('../../lib/auth');
const { sendSuccess, sendError, sendBadRequest, sendNotFound } = require('../../lib/response');
const { logAudit } = require('../../lib/audit');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendError(res, 'Method not allowed', 405);
  }

  // Requires Warehouse, Admin, or Owner
  const user = requireAuth(req, res, [ROLES.OWNER, ROLES.ADMIN, ROLES.WAREHOUSE]);
  if (!user) return;

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) { /* ignore */ }
    }

    const { variant_id, stock_quantity, delta, price, reason } = body || {};

    if (!variant_id || (stock_quantity === undefined && delta === undefined && price === undefined)) {
      return sendBadRequest(res, 'variant_id and either stock_quantity, delta, or price are required');
    }

    const variant = await db.getVariantById(variant_id);
    if (!variant) {
      return sendNotFound(res, `Variant '${variant_id}' not found`);
    }

    const oldStock = variant.stock_quantity;
    const updated = await db.updateVariantStock(variant_id, { stock_quantity, delta, price });

    req.user = user;
    await logAudit(req, {
      action: 'INVENTORY_ADJUSTED',
      resource_type: 'VARIANT',
      resource_id: variant_id,
      details: {
        sku: variant.sku,
        size: variant.size,
        oldStock,
        newStock: updated.stock_quantity,
        delta: updated.stock_quantity - oldStock,
        reason: reason || 'Manual adjustment'
      }
    });

    return sendSuccess(res, updated, 'Inventory updated successfully');
  } catch (err) {
    console.error('[Inventory Adjust Error]', err);
    return sendError(res, 'Failed to adjust inventory', 500);
  }
};
