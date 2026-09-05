// ==============================================================================
// OV™ — EMBEDDED PERSISTENT DATA STORE (PostgreSQL Resilient Fallback)
// ==============================================================================

const fs = require('fs');
const path = require('path');
const { hashPassword } = require('./auth');

// Storage path: in local dev, persist to data/store.json; in serverless /tmp if needed
const DATA_DIR = process.env.VERCEL ? '/tmp' : path.join(process.cwd(), 'data');
const STORE_FILE = path.join(DATA_DIR, 'ov_store.json');

function getDefaultState() {
  const defaultAdminPassword = hashPassword(process.env.ADMIN_DEFAULT_PASSWORD || 'Admin@OV2026!');

  return {
    admin_users: [
      {
        id: 'admin-001',
        name: 'OV Brand Owner',
        email: 'admin@ovclothing.com',
        password_hash: defaultAdminPassword,
        role: 'OWNER',
        is_active: true,
        created_at: new Date().toISOString()
      },
      {
        id: 'admin-002',
        name: 'OV Store Manager',
        email: 'manager@ovclothing.com',
        password_hash: defaultAdminPassword,
        role: 'ADMIN',
        is_active: true,
        created_at: new Date().toISOString()
      }
    ],
    categories: [
      { id: 'cat-tees', name: 'Heavyweight Tees', slug: 'heavyweight-tees', description: '240 GSM - 280 GSM luxury oversized silhouettes.' },
      { id: 'cat-hoodies', name: 'Luxury Hoodies', slug: 'luxury-hoodies', description: '450 GSM French Terry drop-shoulder hoodies.' }
    ],
    products: [
      {
        id: 'prod-grace-beige',
        title: 'OV™ "GRACE" 240 GSM Oversized Heavyweight Tee — Dune Beige',
        slug: 'ov-grace-240gsm-tee-beige',
        description: 'Engineered from 100% combed compact cotton at 240 GSM. Features a bespoke ribbed collar, dropped shoulder silhouette, double-needle reinforcement stitching, and our signature minimal OV typography.',
        category_id: 'cat-tees',
        brand: 'OV — ORIGINAL VERSION',
        base_price: 999,
        compare_at_price: 2999,
        cost_price: 420,
        status: 'ACTIVE',
        is_featured: true,
        weight_grams: 420,
        images: [
          '/images/product_beige_front.png',
          '/images/product_beige_back.png',
          '/images/product_beige_detail.png',
          '/images/product_beige_side.png'
        ],
        attributes: {
          fit: 'Oversized Boxy Drop-Shoulder',
          fabric: '100% Combed Compact Cotton',
          weight: '240 GSM Luxury Heavyweight',
          neck: 'High-Density 1.25" Ribbed Collar',
          origin: 'Crafted in Tirupur, India',
          care: 'Cold Machine Wash, Inside Out. Do Not Tumble Dry.'
        },
        created_at: '2026-09-01T00:00:00.000Z'
      },
      {
        id: 'prod-noir-black',
        title: 'OV™ "NOIR" 280 GSM Boxy Heavyweight Tee — Washed Black',
        slug: 'ov-noir-280gsm-tee-black',
        description: 'Ultra-dense 280 GSM interlock weave with vintage mineral enzyme wash. Structured drape that maintains its architectural box silhouette wash after wash.',
        category_id: 'cat-tees',
        brand: 'OV — ORIGINAL VERSION',
        base_price: 1199,
        compare_at_price: 3499,
        cost_price: 490,
        status: 'UPCOMING',
        is_featured: true,
        weight_grams: 480,
        images: [
          '/images/antigravity_showcase.jpg',
          '/images/antigravity_tshirts_float.jpg'
        ],
        attributes: {
          fit: 'Architectural Boxy Fit',
          fabric: '100% Interlock Ring-Spun Cotton',
          weight: '280 GSM Extreme Heavyweight',
          neck: 'Thick Ribbed Crewneck',
          origin: 'Crafted in Tirupur, India',
          care: 'Gentle Cycle Cold. Dry Flat.'
        },
        created_at: '2026-09-02T00:00:00.000Z'
      }
    ],
    variants: [
      { id: 'var-grace-xs', product_id: 'prod-grace-beige', sku: 'OV-GRC-BGE-XS', size: 'XS', color: 'Dune Beige', price: 999, stock_quantity: 30, reserved_quantity: 0, low_stock_threshold: 5 },
      { id: 'var-grace-s', product_id: 'prod-grace-beige', sku: 'OV-GRC-BGE-S', size: 'S', color: 'Dune Beige', price: 999, stock_quantity: 45, reserved_quantity: 0, low_stock_threshold: 5 },
      { id: 'var-grace-m', product_id: 'prod-grace-beige', sku: 'OV-GRC-BGE-M', size: 'M', color: 'Dune Beige', price: 999, stock_quantity: 60, reserved_quantity: 0, low_stock_threshold: 8 },
      { id: 'var-grace-l', product_id: 'prod-grace-beige', sku: 'OV-GRC-BGE-L', size: 'L', color: 'Dune Beige', price: 999, stock_quantity: 50, reserved_quantity: 0, low_stock_threshold: 8 },
      { id: 'var-grace-xl', product_id: 'prod-grace-beige', sku: 'OV-GRC-BGE-XL', size: 'XL', color: 'Dune Beige', price: 999, stock_quantity: 35, reserved_quantity: 0, low_stock_threshold: 5 },
      { id: 'var-grace-xxl', product_id: 'prod-grace-beige', sku: 'OV-GRC-BGE-XXL', size: 'XXL', color: 'Dune Beige', price: 999, stock_quantity: 20, reserved_quantity: 0, low_stock_threshold: 5 },
      
      { id: 'var-noir-s', product_id: 'prod-noir-black', sku: 'OV-NOIR-BLK-S', size: 'S', color: 'Washed Black', price: 1199, stock_quantity: 0, reserved_quantity: 0, low_stock_threshold: 5 },
      { id: 'var-noir-m', product_id: 'prod-noir-black', sku: 'OV-NOIR-BLK-M', size: 'M', color: 'Washed Black', price: 1199, stock_quantity: 0, reserved_quantity: 0, low_stock_threshold: 5 },
      { id: 'var-noir-l', product_id: 'prod-noir-black', sku: 'OV-NOIR-BLK-L', size: 'L', color: 'Washed Black', price: 1199, stock_quantity: 0, reserved_quantity: 0, low_stock_threshold: 5 },
      { id: 'var-noir-xl', product_id: 'prod-noir-black', sku: 'OV-NOIR-BLK-XL', size: 'XL', color: 'Washed Black', price: 1199, stock_quantity: 0, reserved_quantity: 0, low_stock_threshold: 5 }
    ],
    orders: [
      {
        id: 'ord-10001',
        order_number: 'OV-10001',
        customer: {
          name: 'Arjun Verma',
          email: 'arjun.verma@example.com',
          phone: '+91 98401 23456'
        },
        shipping_address: {
          address_line1: 'Flat 402, Signature Towers, Anna Nagar',
          address_line2: '',
          city: 'Chennai',
          state: 'Tamil Nadu',
          pincode: '600040',
          country: 'India'
        },
        items: [
          {
            variant_id: 'var-grace-m',
            product_id: 'prod-grace-beige',
            product_title: 'OV™ "GRACE" 240 GSM Oversized Heavyweight Tee — Dune Beige',
            size: 'M',
            color: 'Dune Beige',
            sku: 'OV-GRC-BGE-M',
            unit_price: 999,
            quantity: 1,
            total_price: 999
          }
        ],
        subtotal: 999,
        discount_amount: 0,
        shipping_fee: 0,
        tax_amount: 0,
        total_amount: 999,
        coupon_code: null,
        payment_method: 'PREPAID_UPI',
        payment_status: 'PAID',
        payment_id: 'pay_demo_rzp_10001',
        order_status: 'PROCESSING',
        shipment_status: 'UNFULFILLED',
        created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
        timeline: [
          { status: 'CREATED', timestamp: new Date(Date.now() - 3600000 * 12).toISOString(), message: 'Order created via UPI prepaid checkout' },
          { status: 'PAID', timestamp: new Date(Date.now() - 3600000 * 12 + 60000).toISOString(), message: 'Payment verified successfully' }
        ]
      }
    ],
    shipments: [],
    returns: [],
    coupons: [
      {
        id: 'cpn-welcome500',
        code: 'WELCOME500',
        discount_type: 'FIXED',
        discount_value: 500,
        min_order_amount: 1999,
        max_discount: 500,
        is_active: true,
        expires_at: '2027-12-31T23:59:59.000Z'
      },
      {
        id: 'cpn-diwali20',
        code: 'DIWALI20',
        discount_type: 'PERCENTAGE',
        discount_value: 20,
        min_order_amount: 1499,
        max_discount: 1000,
        is_active: true,
        expires_at: '2027-12-31T23:59:59.000Z'
      },
      {
        id: 'cpn-ov10',
        code: 'OV10',
        discount_type: 'PERCENTAGE',
        discount_value: 10,
        min_order_amount: 999,
        max_discount: 500,
        is_active: true,
        expires_at: '2027-12-31T23:59:59.000Z'
      }
    ],
    audit_logs: [
      {
        id: 'log-001',
        admin_user_id: 'admin-001',
        user_name: 'OV Brand Owner',
        action: 'SYSTEM_INITIALIZED',
        resource_type: 'SYSTEM',
        resource_id: 'ROOT',
        details: 'Store database and catalog initialized.',
        timestamp: new Date().toISOString()
      }
    ],
    settings: {
      store_name: 'OV — ORIGINAL VERSION',
      tagline: '240 GSM — 280 GSM Luxury Streetwear Essentials',
      pickup_pincode: '600006',
      pickup_address: '14/2 Khader Nawaz Khan Road, Nungambakkam, Chennai, TN 600006',
      free_shipping_threshold: 999,
      standard_shipping_rate: 99,
      cod_enabled: true,
      cod_fee: 49,
      support_email: 'support@ovclothing.com',
      support_phone: '+91 98400 00000',
      currency: 'INR',
      currency_symbol: '₹'
    }
  };
}

class EmbeddedStore {
  constructor() {
    this.state = null;
    this.load();
  }

  load() {
    try {
      if (fs.existsSync(STORE_FILE)) {
        const raw = fs.readFileSync(STORE_FILE, 'utf8');
        this.state = JSON.parse(raw);
      } else {
        this.state = getDefaultState();
        this.save();
      }
    } catch (e) {
      console.warn('[OV Store] Failed to load store from disk, using default in-memory state:', e.message);
      this.state = getDefaultState();
    }
  }

  save() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(STORE_FILE, JSON.stringify(this.state, null, 2), 'utf8');
    } catch (e) {
      // In read-only serverless environments, state remains alive in process memory
    }
  }

  // Admin Users
  findAdminByEmail(email) {
    if (!email) return null;
    return this.state.admin_users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findAdminById(id) {
    return this.state.admin_users.find(u => u.id === id);
  }

  // Products
  getProducts(filters = {}) {
    let list = [...this.state.products];
    if (filters.status) {
      list = list.filter(p => p.status === filters.status);
    }
    if (filters.featured !== undefined) {
      list = list.filter(p => p.is_featured === filters.featured);
    }
    // Attach variants to products
    return list.map(p => ({
      ...p,
      variants: this.state.variants.filter(v => v.product_id === p.id)
    }));
  }

  getProductById(id) {
    const prod = this.state.products.find(p => p.id === id || p.slug === id);
    if (!prod) return null;
    return {
      ...prod,
      variants: this.state.variants.filter(v => v.product_id === prod.id)
    };
  }

  saveProduct(productData) {
    const idx = this.state.products.findIndex(p => p.id === productData.id);
    if (idx >= 0) {
      this.state.products[idx] = { ...this.state.products[idx], ...productData, updated_at: new Date().toISOString() };
    } else {
      this.state.products.unshift({
        ...productData,
        id: productData.id || `prod-${Date.now()}`,
        created_at: new Date().toISOString()
      });
    }
    this.save();
    return this.getProductById(productData.id);
  }

  deleteProduct(id) {
    this.state.products = this.state.products.filter(p => p.id !== id);
    this.state.variants = this.state.variants.filter(v => v.product_id !== id);
    this.save();
    return true;
  }

  // Variants & Inventory
  getVariantsByProductId(productId) {
    return this.state.variants.filter(v => v.product_id === productId);
  }

  getVariantById(variantId) {
    return this.state.variants.find(v => v.id === variantId || v.sku === variantId);
  }

  updateVariantStock(variantId, { stock_quantity, delta, price }) {
    const variant = this.state.variants.find(v => v.id === variantId);
    if (!variant) return null;

    if (stock_quantity !== undefined) {
      variant.stock_quantity = Math.max(0, parseInt(stock_quantity, 10));
    } else if (delta !== undefined) {
      variant.stock_quantity = Math.max(0, variant.stock_quantity + parseInt(delta, 10));
    }

    if (price !== undefined) {
      variant.price = parseFloat(price);
    }

    this.save();
    return variant;
  }

  // Orders
  getOrders(filters = {}) {
    let orders = [...this.state.orders];
    if (filters.status) {
      orders = orders.filter(o => o.order_status === filters.status);
    }
    if (filters.payment_status) {
      orders = orders.filter(o => o.payment_status === filters.payment_status);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      orders = orders.filter(o =>
        o.order_number.toLowerCase().includes(q) ||
        (o.customer && o.customer.name.toLowerCase().includes(q)) ||
        (o.customer && o.customer.email.toLowerCase().includes(q)) ||
        (o.customer && o.customer.phone.includes(q))
      );
    }
    // Sort newest first
    orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return orders;
  }

  getOrderById(id) {
    return this.state.orders.find(o => o.id === id || o.order_number.toUpperCase() === id.toUpperCase());
  }

  createOrder(orderData) {
    const orderNumber = `OV-${10000 + this.state.orders.length + 1}`;
    const newOrder = {
      id: `ord-${Date.now()}`,
      order_number: orderNumber,
      ...orderData,
      created_at: new Date().toISOString(),
      order_status: orderData.order_status || 'CREATED',
      shipment_status: 'UNFULFILLED',
      timeline: [
        {
          status: orderData.order_status || 'CREATED',
          timestamp: new Date().toISOString(),
          message: orderData.payment_method === 'COD' ? 'Order placed via Cash on Delivery' : 'Prepaid checkout initiated'
        }
      ]
    };

    // Decrement stock for ordered items
    if (Array.isArray(orderData.items)) {
      for (const item of orderData.items) {
        if (item.variant_id) {
          this.updateVariantStock(item.variant_id, { delta: -item.quantity });
        }
      }
    }

    this.state.orders.unshift(newOrder);
    this.save();
    return newOrder;
  }

  updateOrderStatus(id, { order_status, payment_status, shipment_status, message }) {
    const order = this.getOrderById(id);
    if (!order) return null;

    if (order_status) order.order_status = order_status;
    if (payment_status) order.payment_status = payment_status;
    if (shipment_status) order.shipment_status = shipment_status;

    if (message) {
      if (!order.timeline) order.timeline = [];
      order.timeline.push({
        status: order_status || order.order_status,
        timestamp: new Date().toISOString(),
        message
      });
    }

    this.save();
    return order;
  }

  // Shipments
  getShipments() {
    return this.state.shipments;
  }

  getShipmentByOrderId(orderId) {
    return this.state.shipments.find(s => s.order_id === orderId);
  }

  saveShipment(shipmentData) {
    const idx = this.state.shipments.findIndex(s => s.id === shipmentData.id || s.order_id === shipmentData.order_id);
    if (idx >= 0) {
      this.state.shipments[idx] = { ...this.state.shipments[idx], ...shipmentData, updated_at: new Date().toISOString() };
    } else {
      this.state.shipments.unshift({
        ...shipmentData,
        id: shipmentData.id || `ship-${Date.now()}`,
        created_at: new Date().toISOString()
      });
    }
    this.save();
    return shipmentData;
  }

  // Coupons
  getCoupons() {
    return this.state.coupons;
  }

  getCouponByCode(code) {
    if (!code) return null;
    return this.state.coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase() && c.is_active);
  }

  saveCoupon(couponData) {
    const idx = this.state.coupons.findIndex(c => c.code.toUpperCase() === couponData.code.toUpperCase());
    if (idx >= 0) {
      this.state.coupons[idx] = { ...this.state.coupons[idx], ...couponData };
    } else {
      this.state.coupons.push({
        ...couponData,
        id: couponData.id || `cpn-${Date.now()}`
      });
    }
    this.save();
    return couponData;
  }

  // Returns & Exchanges
  getReturns() {
    return this.state.returns;
  }

  createReturn(returnData) {
    const item = {
      id: `ret-${Date.now()}`,
      status: 'REQUESTED',
      created_at: new Date().toISOString(),
      ...returnData
    };
    this.state.returns.unshift(item);
    this.save();
    return item;
  }

  updateReturn(id, update) {
    const item = this.state.returns.find(r => r.id === id);
    if (!item) return null;
    Object.assign(item, update, { updated_at: new Date().toISOString() });
    this.save();
    return item;
  }

  // Audit Logs
  getAuditLogs(limit = 100) {
    return this.state.audit_logs.slice(0, limit);
  }

  addAuditLog({ admin_user_id, user_name, action, resource_type, resource_id, details, ip_address }) {
    const log = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      admin_user_id: admin_user_id || 'system',
      user_name: user_name || 'System',
      action,
      resource_type: resource_type || 'GENERAL',
      resource_id: resource_id || 'N/A',
      details: typeof details === 'object' ? JSON.stringify(details) : details,
      ip_address: ip_address || '127.0.0.1',
      timestamp: new Date().toISOString()
    };
    this.state.audit_logs.unshift(log);
    // Keep max 500 logs in memory
    if (this.state.audit_logs.length > 500) {
      this.state.audit_logs = this.state.audit_logs.slice(0, 500);
    }
    this.save();
    return log;
  }

  // Settings
  getSettings() {
    return this.state.settings;
  }

  updateSettings(newSettings) {
    this.state.settings = { ...this.state.settings, ...newSettings };
    this.save();
    return this.state.settings;
  }
}

// Export singleton instance
const storeInstance = new EmbeddedStore();
module.exports = storeInstance;
