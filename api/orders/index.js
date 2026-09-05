// ==============================================================================
// OV™ — ORDERS API (/api/orders)
// Handles order creation with server-side validation, and admin order querying.
// ==============================================================================

const db = require('../../lib/db');
const { requireAuth, ROLES } = require('../../lib/auth');
const { sendSuccess, sendError, sendBadRequest } = require('../../lib/response');
const { logAudit } = require('../../lib/audit');

module.exports = async function handler(req, res) {
  // GET /api/orders — List Orders (Admin / Staff)
  if (req.method === 'GET') {
    const user = requireAuth(req, res, [ROLES.OWNER, ROLES.ADMIN, ROLES.ORDER_MANAGER, ROLES.WAREHOUSE, ROLES.SUPPORT]);
    if (!user) return;

    try {
      const { status, payment_status, search } = req.query || {};
      const orders = await db.getOrders({ status, payment_status, search });
      return sendSuccess(res, orders);
    } catch (err) {
      console.error('[Orders API Error]', err);
      return sendError(res, 'Failed to fetch orders', 500);
    }
  }

  // POST /api/orders — Create Order (Customer Storefront Checkout)
  if (req.method === 'POST') {
    try {
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) { /* ignore */ }
      }

      const { customer, shipping_address, items, payment_method, coupon_code, payment_id } = body || {};

      if (!customer?.name || !customer?.phone || !customer?.email) {
        return sendBadRequest(res, 'Customer name, phone, and email are required');
      }

      if (!shipping_address?.address_line1 || !shipping_address?.city || !shipping_address?.state || !shipping_address?.pincode) {
        return sendBadRequest(res, 'Complete shipping address including pincode is required');
      }

      if (!/^\d{6}$/.test(shipping_address.pincode.trim())) {
        return sendBadRequest(res, 'Please provide a valid 6-digit Indian delivery pincode');
      }

      if (!Array.isArray(items) || items.length === 0) {
        return sendBadRequest(res, 'Order must contain at least one item');
      }

      // Compute canonical pricing on the server
      const settings = await db.getSettings();
      let subtotal = 0;
      const orderItems = [];

      for (const item of items) {
        const variant = await db.getVariantById(item.variant_id || item.id);
        if (!variant) {
          return sendBadRequest(res, `Invalid variant ID: ${item.variant_id || item.id}`);
        }

        const qty = Math.max(1, parseInt(item.quantity, 10) || 1);
        if (variant.stock_quantity < qty) {
          return sendBadRequest(res, `Insufficient stock for ${variant.sku} (${variant.size}). Available: ${variant.stock_quantity}`);
        }

        const product = await db.getProductById(variant.product_id);
        const unitPrice = parseFloat(variant.price);
        const itemTotal = unitPrice * qty;
        subtotal += itemTotal;

        orderItems.push({
          variant_id: variant.id,
          product_id: variant.product_id,
          product_title: product ? product.title : 'OV™ Streetwear Tee',
          sku: variant.sku,
          size: variant.size,
          color: variant.color,
          unit_price: unitPrice,
          quantity: qty,
          total_price: itemTotal
        });
      }

      // Coupon validation
      let discountAmount = 0;
      let appliedCouponCode = null;
      if (coupon_code) {
        const coupon = await db.getCouponByCode(coupon_code);
        if (coupon && (!coupon.min_order_amount || subtotal >= coupon.min_order_amount)) {
          if (coupon.discount_type === 'PERCENTAGE') {
            discountAmount = Math.round((subtotal * coupon.discount_value) / 100);
            if (coupon.max_discount && discountAmount > coupon.max_discount) {
              discountAmount = coupon.max_discount;
            }
          } else if (coupon.discount_type === 'FIXED') {
            discountAmount = Math.min(coupon.discount_value, subtotal);
          }
          appliedCouponCode = coupon.code;
        }
      }

      const freeShippingThreshold = settings.free_shipping_threshold || 999;
      const standardShippingRate = settings.standard_shipping_rate || 99;
      const shippingFee = subtotal >= freeShippingThreshold ? 0 : standardShippingRate;
      const codFee = payment_method === 'COD' ? (settings.cod_fee || 49) : 0;
      const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee + codFee);

      const orderRecord = {
        customer: {
          name: customer.name.trim(),
          email: customer.email.trim(),
          phone: customer.phone.trim()
        },
        shipping_address: {
          address_line1: shipping_address.address_line1.trim(),
          address_line2: (shipping_address.address_line2 || '').trim(),
          city: shipping_address.city.trim(),
          state: shipping_address.state.trim(),
          pincode: shipping_address.pincode.trim(),
          country: 'India'
        },
        items: orderItems,
        subtotal,
        discount_amount: discountAmount,
        shipping_fee: shippingFee,
        cod_fee: codFee,
        tax_amount: 0,
        total_amount: totalAmount,
        coupon_code: appliedCouponCode,
        payment_method: payment_method || 'PREPAID_UPI',
        payment_status: payment_method === 'COD' ? 'PENDING' : (payment_id ? 'PAID' : 'PENDING'),
        payment_id: payment_id || null,
        order_status: payment_method === 'COD' ? 'PROCESSING' : (payment_id ? 'PROCESSING' : 'CREATED')
      };

      const createdOrder = await db.createOrder(orderRecord);

      await logAudit(req, {
        action: 'ORDER_PLACED',
        resource_type: 'ORDER',
        resource_id: createdOrder.id,
        details: {
          order_number: createdOrder.order_number,
          total: createdOrder.total_amount,
          payment_method: createdOrder.payment_method
        }
      });

      return sendSuccess(res, createdOrder, 'Order created successfully', 201);
    } catch (err) {
      console.error('[Create Order Error]', err);
      return sendError(res, 'Failed to create order', 500);
    }
  }

  return sendError(res, 'Method not allowed', 405);
};
