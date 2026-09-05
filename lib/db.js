// ==============================================================================
// OV™ — UNIFIED DATABASE ADAPTER (PostgreSQL + Embedded Fallback)
// ==============================================================================

const store = require('./store');

let pgPool = null;
const DATABASE_URL = process.env.DATABASE_URL;

if (DATABASE_URL) {
  try {
    const { Pool } = require('pg');
    pgPool = new Pool({
      connectionString: DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' || DATABASE_URL.includes('sslmode=require')
        ? { rejectUnauthorized: false }
        : false
    });
    console.log('[OV DB] Initialized PostgreSQL connection pool.');
  } catch (err) {
    console.warn('[OV DB] pg module not available or connection failed; using embedded store fallback:', err.message);
  }
} else {
  console.log('[OV DB] DATABASE_URL not detected. Operating with resilient embedded store.');
}

async function query(text, params) {
  if (pgPool) {
    try {
      const res = await pgPool.query(text, params);
      return res;
    } catch (err) {
      console.error('[OV DB Error]', err);
      throw err;
    }
  }
  return null;
}

// Unified repository methods that work regardless of Postgres or Store
const db = {
  isPostgres: () => !!pgPool,
  query,

  // Admin
  async findAdminByEmail(email) {
    if (pgPool) {
      const res = await query('SELECT * FROM admin_users WHERE LOWER(email) = LOWER($1) AND is_active = true LIMIT 1', [email]);
      return res.rows[0] || null;
    }
    return store.findAdminByEmail(email);
  },

  async findAdminById(id) {
    if (pgPool) {
      const res = await query('SELECT * FROM admin_users WHERE id = $1 LIMIT 1', [id]);
      return res.rows[0] || null;
    }
    return store.findAdminById(id);
  },

  // Products
  async getProducts(filters) {
    if (pgPool) {
      let sql = `
        SELECT p.*, 
          COALESCE(json_agg(json_build_object(
            'id', v.id, 'sku', v.sku, 'size', v.size, 'color', v.color,
            'price', v.price, 'stock_quantity', v.stock_quantity, 'reserved_quantity', v.reserved_quantity
          )) FILTER (WHERE v.id IS NOT NULL), '[]') AS variants
        FROM products p
        LEFT JOIN product_variants v ON p.id = v.product_id
        WHERE 1=1
      `;
      const params = [];
      if (filters?.status) {
        params.push(filters.status);
        sql += ` AND p.status = $${params.length}`;
      }
      sql += ` GROUP BY p.id ORDER BY p.created_at DESC`;
      const res = await query(sql, params);
      return res.rows;
    }
    return store.getProducts(filters);
  },

  async getProductById(id) {
    if (pgPool) {
      const res = await query(`
        SELECT p.*,
          COALESCE(json_agg(json_build_object(
            'id', v.id, 'sku', v.sku, 'size', v.size, 'color', v.color,
            'price', v.price, 'stock_quantity', v.stock_quantity, 'reserved_quantity', v.reserved_quantity
          )) FILTER (WHERE v.id IS NOT NULL), '[]') AS variants
        FROM products p
        LEFT JOIN product_variants v ON p.id = v.product_id
        WHERE p.id = $1 OR p.slug = $1
        GROUP BY p.id
        LIMIT 1
      `, [id]);
      return res.rows[0] || null;
    }
    return store.getProductById(id);
  },

  async saveProduct(productData) {
    return store.saveProduct(productData);
  },

  async deleteProduct(id) {
    return store.deleteProduct(id);
  },

  // Variants
  async getVariantById(id) {
    return store.getVariantById(id);
  },

  async updateVariantStock(id, update) {
    return store.updateVariantStock(id, update);
  },

  // Orders
  async getOrders(filters) {
    return store.getOrders(filters);
  },

  async getOrderById(id) {
    return store.getOrderById(id);
  },

  async createOrder(orderData) {
    return store.createOrder(orderData);
  },

  async updateOrderStatus(id, update) {
    return store.updateOrderStatus(id, update);
  },

  // Shipments
  async getShipments() {
    return store.getShipments();
  },

  async getShipmentByOrderId(orderId) {
    return store.getShipmentByOrderId(orderId);
  },

  async saveShipment(shipmentData) {
    return store.saveShipment(shipmentData);
  },

  // Coupons
  async getCoupons() {
    return store.getCoupons();
  },

  async getCouponByCode(code) {
    return store.getCouponByCode(code);
  },

  async saveCoupon(couponData) {
    return store.saveCoupon(couponData);
  },

  // Returns
  async getReturns() {
    return store.getReturns();
  },

  async createReturn(returnData) {
    return store.createReturn(returnData);
  },

  async updateReturn(id, update) {
    return store.updateReturn(id, update);
  },

  // Audit
  async getAuditLogs(limit) {
    return store.getAuditLogs(limit);
  },

  async addAuditLog(entry) {
    return store.addAuditLog(entry);
  },

  // Settings
  async getSettings() {
    return store.getSettings();
  },

  async updateSettings(settings) {
    return store.updateSettings(settings);
  }
};

module.exports = db;
