// ==============================================================================
// OV™ — CHECKOUT QUOTE API (/api/checkout/quote)
// Validates prices, inventory, coupon codes, and shipping fees strictly server-side.
// ==============================================================================

const db = require('../../db');
const { sendSuccess, sendBadRequest, sendError } = require('../../response');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendError(res, 'Method not allowed', 405);
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) { /* ignore */ }
    }

    const { items, coupon_code, payment_method, shipping_pincode } = body || {};

    if (!Array.isArray(items) || items.length === 0) {
      return sendBadRequest(res, 'Cart items array cannot be empty');
    }

    const settings = await db.getSettings();
    let subtotal = 0;
    const validatedItems = [];
    const stockErrors = [];

    // Verify each item and fetch source-of-truth price & stock
    for (const item of items) {
      const variant = await db.getVariantById(item.variant_id || item.id);
      if (!variant) {
        return sendBadRequest(res, `Invalid or non-existent variant: ${item.variant_id || item.id}`);
      }

      const quantity = Math.max(1, parseInt(item.quantity, 10) || 1);

      if (variant.stock_quantity < quantity) {
        stockErrors.push({
          variant_id: variant.id,
          sku: variant.sku,
          requested: quantity,
          available: variant.stock_quantity,
          message: `Only ${variant.stock_quantity} units available for ${variant.sku} (${variant.size})`
        });
      }

      const product = await db.getProductById(variant.product_id);
      const unitPrice = parseFloat(variant.price);
      const itemTotal = unitPrice * quantity;
      subtotal += itemTotal;

      validatedItems.push({
        variant_id: variant.id,
        product_id: variant.product_id,
        product_title: product ? product.title : 'OV™ Streetwear Tee',
        sku: variant.sku,
        size: variant.size,
        color: variant.color,
        unit_price: unitPrice,
        quantity,
        total_price: itemTotal,
        image: product?.images?.[0] || '/images/product_beige_front.png'
      });
    }

    if (stockErrors.length > 0) {
      return sendBadRequest(res, 'Some items in your cart exceed available inventory', { stockErrors });
    }

    // Evaluate Coupon
    let discountAmount = 0;
    let appliedCoupon = null;

    if (coupon_code) {
      const coupon = await db.getCouponByCode(coupon_code);
      if (coupon) {
        const now = new Date();
        const isExpired = coupon.expires_at && new Date(coupon.expires_at) < now;
        const meetsMinSpend = !coupon.min_order_amount || subtotal >= coupon.min_order_amount;

        if (!isExpired && meetsMinSpend) {
          if (coupon.discount_type === 'PERCENTAGE') {
            discountAmount = Math.round((subtotal * coupon.discount_value) / 100);
            if (coupon.max_discount && discountAmount > coupon.max_discount) {
              discountAmount = coupon.max_discount;
            }
          } else if (coupon.discount_type === 'FIXED') {
            discountAmount = Math.min(coupon.discount_value, subtotal);
          }

          appliedCoupon = {
            code: coupon.code,
            discount_type: coupon.discount_type,
            discount_value: coupon.discount_value,
            discount_amount: discountAmount
          };
        }
      }
    }

    // Shipping calculation
    const freeShippingThreshold = settings.free_shipping_threshold || 999;
    const standardShippingRate = settings.standard_shipping_rate || 99;
    let shippingFee = subtotal >= freeShippingThreshold ? 0 : standardShippingRate;

    // COD surcharge if applicable
    let codFee = 0;
    if (payment_method === 'COD') {
      codFee = settings.cod_fee || 49;
    }

    const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee + codFee);

    return sendSuccess(res, {
      items: validatedItems,
      subtotal,
      discount_amount: discountAmount,
      applied_coupon: appliedCoupon,
      shipping_fee: shippingFee,
      cod_fee: codFee,
      tax_amount: 0, // In India D2C apparel, GST is inclusive in MRP/unit price
      total_amount: totalAmount,
      free_shipping_qualified: subtotal >= freeShippingThreshold,
      free_shipping_threshold: freeShippingThreshold
    }, 'Quote calculated successfully');

  } catch (err) {
    console.error('[Quote API Error]', err);
    return sendError(res, 'Failed to calculate checkout quote', 500);
  }
};
