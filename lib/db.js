// ==============================================================================
// OV™ — UNIFIED PRODUCTION DATABASE ADAPTER (PostgreSQL Sole Source of Truth)
// ==============================================================================

const fs = require('fs');
const path = require('path');
const store = require('./store');

let pgPool = null;
const DATABASE_URL = process.env.DATABASE_URL;
const IS_PROD = process.env.NODE_ENV === 'production';

// In production, PostgreSQL is the strictly enforced sole source of truth.
if (IS_PROD && !DATABASE_URL) {
  const err = new Error('[OV DB CRITICAL] PostgreSQL DATABASE_URL is strictly required in production mode. Refusing to operate with fallback storage.');
  console.error(err.message);
  throw err;
}

if (DATABASE_URL) {
  try {
    const { Pool } = require('pg');
    pgPool = new Pool({
      connectionString: DATABASE_URL,
      ssl: IS_PROD || DATABASE_URL.includes('sslmode=require')
        ? { rejectUnauthorized: false }
        : false,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000
    });
    console.log('[OV DB] Initialized PostgreSQL connection pool.');

    // Auto-bootstrap schema if on fresh database
    bootstrapSchema().catch(e => console.warn('[OV DB Schema Check]', e.message));
  } catch (err) {
    if (IS_PROD) throw err;
    console.warn('[OV DB] pg connection initialization failed; using embedded store fallback for dev:', err.message);
  }
} else {
  console.log('[OV DB] DATABASE_URL not detected. Operating with resilient embedded store (Dev/Test mode).');
}

async function query(text, params) {
  if (pgPool) {
    try {
      return await pgPool.query(text, params);
    } catch (err) {
      console.error('[OV DB Error executing query]', { text, error: err.message });
      throw err;
    }
  }
  return null;
}

async function transaction(callback) {
  if (pgPool) {
    const client = await pgPool.connect();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }
  // Store fallback transaction simulation
  return callback({ query: () => {} });
}

async function bootstrapSchema() {
  if (!pgPool) return;
  try {
    const check = await pgPool.query("SELECT 1 FROM information_schema.tables WHERE table_name = 'orders' LIMIT 1");
    if (check.rows.length === 0) {
      console.log('[OV DB] Fresh database detected. Applying schema.sql...');
      const schemaPath = path.join(process.cwd(), 'schema.sql');
      if (fs.existsSync(schemaPath)) {
        const sql = fs.readFileSync(schemaPath, 'utf8');
        await pgPool.query(sql);
        console.log('[OV DB] Successfully bootstrapped PostgreSQL schema.');
      }
    }
  } catch (err) {
    console.warn('[OV DB Bootstrap Warning]', err.message);
  }
}

const db = {
  isPostgres: () => !!pgPool,
  query,
  transaction,

  // ==========================================
  // 1. ADMIN USERS & RBAC
  // ==========================================
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

  async getAdminUsers() {
    if (pgPool) {
      const res = await query('SELECT id, name, email, role, is_active, last_login_at, created_at FROM admin_users ORDER BY created_at DESC');
      return res.rows;
    }
    return store.getAdminUsers ? store.getAdminUsers() : (store.state.admin_users || []);
  },

  async createAdminUser({ name, email, password_hash, role }) {
    if (pgPool) {
      const res = await query(
        `INSERT INTO admin_users (name, email, password_hash, role, is_active)
         VALUES ($1, $2, $3, $4, true)
         RETURNING id, name, email, role, is_active, created_at`,
        [name, email.toLowerCase(), password_hash, role]
      );
      return res.rows[0];
    }
    const newUser = { id: `admin-${Date.now()}`, name, email: email.toLowerCase(), password_hash, role, is_active: true, created_at: new Date().toISOString() };
    store.state.admin_users.push(newUser);
    store.save();
    return newUser;
  },

  async updateAdminPassword(id, password_hash) {
    if (pgPool) {
      await query('UPDATE admin_users SET password_hash = $1, updated_at = NOW() WHERE id = $2', [password_hash, id]);
      return true;
    }
    const user = store.state.admin_users.find(u => u.id === id);
    if (user) {
      user.password_hash = password_hash;
      store.save();
      return true;
    }
    return false;
  },

  // ==========================================
  // 2. PRODUCTS & VARIANTS
  // ==========================================
  async getProducts(filters = {}) {
    if (pgPool) {
      let sql = `
        SELECT p.*, 
          COALESCE(json_agg(json_build_object(
            'id', v.id, 'sku', v.sku, 'size', v.size, 'color', v.color,
            'price', v.price, 'stock_quantity', v.stock_quantity, 'reserved_quantity', v.reserved_quantity,
            'low_stock_threshold', v.low_stock_threshold
          )) FILTER (WHERE v.id IS NOT NULL), '[]') AS variants
        FROM products p
        LEFT JOIN product_variants v ON p.id = v.product_id
        WHERE 1=1
      `;
      const params = [];
      if (filters.status) {
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
            'price', v.price, 'stock_quantity', v.stock_quantity, 'reserved_quantity', v.reserved_quantity,
            'low_stock_threshold', v.low_stock_threshold
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
    if (pgPool) {
      const res = await query(
        `INSERT INTO products (id, title, slug, base_name, brand, description, base_price, compare_at_price, cost_price, status, is_featured)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         ON CONFLICT (id) DO UPDATE SET
           title = EXCLUDED.title,
           slug = EXCLUDED.slug,
           base_price = EXCLUDED.base_price,
           compare_at_price = EXCLUDED.compare_at_price,
           cost_price = EXCLUDED.cost_price,
           status = EXCLUDED.status,
           is_featured = EXCLUDED.is_featured,
           updated_at = NOW()
         RETURNING *`,
        [
          productData.id, productData.title, productData.slug, productData.base_name || productData.title,
          productData.brand || 'OV — ORIGINAL VERSION', productData.description, productData.base_price,
          productData.compare_at_price, productData.cost_price, productData.status || 'ACTIVE',
          Boolean(productData.is_featured)
        ]
      );
      return res.rows[0];
    }
    return store.saveProduct(productData);
  },

  async getVariantById(id) {
    if (pgPool) {
      const res = await query('SELECT * FROM product_variants WHERE id::text = $1 OR sku = $1 LIMIT 1', [id]);
      return res.rows[0] || null;
    }
    return store.getVariantById(id);
  },

  // Atomic stock adjustment with concurrency control
  async updateVariantStock(id, { delta, stock_quantity, price, reason = 'MANUAL_ADJUSTMENT', reference_id = null, created_by = 'SYSTEM' }) {
    if (pgPool) {
      return await transaction(async (client) => {
        // Lock variant row for update
        const selectRes = await client.query('SELECT * FROM product_variants WHERE id::text = $1 OR sku = $1 FOR UPDATE', [id]);
        const variant = selectRes.rows[0];
        if (!variant) return null;

        const prevQty = variant.stock_quantity;
        let newQty = prevQty;
        if (stock_quantity !== undefined) {
          newQty = parseInt(stock_quantity, 10);
        } else if (delta !== undefined) {
          newQty = prevQty + Number(delta);
        }

        if (newQty < 0) {
          throw new Error(`Insufficient stock for variant ${variant.sku}. Current: ${prevQty}, Requested: ${newQty}`);
        }

        const updateRes = await client.query(
          'UPDATE product_variants SET stock_quantity = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
          [newQty, variant.id]
        );

        // Record inventory transaction
        await client.query(
          `INSERT INTO inventory_transactions (variant_id, delta, reason, reference_id, previous_quantity, new_quantity, created_by)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [variant.id, newQty - prevQty, reason, reference_id, prevQty, newQty, created_by]
        );

        return updateRes.rows[0];
      });
    }
    return store.updateVariantStock(id, { delta, stock_quantity, price, reason, reference_id });
  },

  // ==========================================
  // 3. ORDERS & TIMELINE
  // ==========================================
  async getOrders(filters = {}) {
    if (pgPool) {
      let sql = `
        SELECT o.*,
          COALESCE(json_agg(json_build_object(
            'id', oi.id, 'sku', oi.sku, 'product_name', oi.product_name,
            'variant_title', oi.variant_title, 'quantity', oi.quantity,
            'unit_price', oi.unit_price, 'total_price', oi.total_price
          )) FILTER (WHERE oi.id IS NOT NULL), '[]') AS items
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        WHERE 1=1
      `;
      const params = [];
      if (filters.status) {
        params.push(filters.status);
        sql += ` AND o.order_status = $${params.length}`;
      }
      if (filters.search) {
        params.push(`%${filters.search}%`);
        sql += ` AND (o.order_number ILIKE $${params.length} OR o.customer_name ILIKE $${params.length} OR o.customer_phone ILIKE $${params.length})`;
      }
      sql += ` GROUP BY o.id ORDER BY o.created_at DESC`;
      const res = await query(sql, params);
      return res.rows;
    }
    return store.getOrders(filters);
  },

  async getOrderById(id) {
    if (pgPool) {
      const res = await query(`
        SELECT o.*,
          COALESCE(json_agg(DISTINCT jsonb_build_object(
            'id', oi.id, 'sku', oi.sku, 'product_name', oi.product_name,
            'variant_title', oi.variant_title, 'quantity', oi.quantity,
            'unit_price', oi.unit_price, 'total_price', oi.total_price
          )) FILTER (WHERE oi.id IS NOT NULL), '[]') AS items,
          COALESCE(json_agg(DISTINCT jsonb_build_object(
            'status', ot.status, 'message', ot.message, 'created_at', ot.created_at
          )) FILTER (WHERE ot.id IS NOT NULL), '[]') AS timeline
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        LEFT JOIN order_timeline ot ON o.id = ot.order_id
        WHERE o.id::text = $1 OR o.order_number = $1
        GROUP BY o.id
        LIMIT 1
      `, [id]);
      return res.rows[0] || null;
    }
    return store.getOrderById(id);
  },

  async createOrder(orderData) {
    if (pgPool) {
      return await transaction(async (client) => {
        // 1. Insert order
        const orderRes = await client.query(
          `INSERT INTO orders (
            order_number, customer_name, customer_email, customer_phone,
            subtotal, discount_amount, shipping_fee, total_amount,
            payment_method, payment_status, order_status, notes
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          RETURNING *`,
          [
            orderData.order_number, orderData.customer.name, orderData.customer.email, orderData.customer.phone,
            orderData.subtotal, orderData.discount_amount || 0, orderData.shipping_fee || 0, orderData.total_amount,
            orderData.payment_method, orderData.payment_status || 'PENDING', orderData.order_status || 'PROCESSING',
            orderData.notes || ''
          ]
        );
        const order = orderRes.rows[0];

        // 2. Insert items and decrement stock atomically
        for (const item of orderData.items) {
          await client.query(
            `INSERT INTO order_items (order_id, product_name, variant_title, sku, quantity, unit_price, total_price)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [order.id, item.product_title, `${item.color} / ${item.size}`, item.sku, item.quantity, item.unit_price, item.total_price]
          );

          if (item.variant_id) {
            await client.query(
              `UPDATE product_variants
               SET stock_quantity = stock_quantity - $1, updated_at = NOW()
               WHERE (id::text = $2 OR sku = $2) AND stock_quantity >= $1`,
              [item.quantity, item.variant_id]
            );
          }
        }

        // 3. Insert address
        if (orderData.shipping_address) {
          const addr = orderData.shipping_address;
          await client.query(
            `INSERT INTO order_addresses (order_id, recipient_name, phone, address_line1, address_line2, city, state, pincode)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [order.id, orderData.customer.name, orderData.customer.phone, addr.address_line1, addr.address_line2 || '', addr.city, addr.state, addr.pincode]
          );
        }

        // 4. Record initial timeline
        await client.query(
          `INSERT INTO order_timeline (order_id, order_number, status, message, created_by)
           VALUES ($1, $2, $3, $4, $5)`,
          [order.id, order.order_number, order.order_status, `Order placed via ${order.payment_method}`, 'SYSTEM']
        );

        return { ...order, items: orderData.items, shipping_address: orderData.shipping_address };
      });
    }
    return store.createOrder(orderData);
  },

  async updateOrderStatus(id, { order_status, payment_status, notes = null, message = null }) {
    if (pgPool) {
      const updates = [];
      const params = [id];
      if (order_status) {
        params.push(order_status);
        updates.push(`order_status = $${params.length}`);
      }
      if (payment_status) {
        params.push(payment_status);
        updates.push(`payment_status = $${params.length}`);
      }
      if (notes) {
        params.push(notes);
        updates.push(`notes = $${params.length}`);
      }
      updates.push('updated_at = NOW()');

      const sql = `UPDATE orders SET ${updates.join(', ')} WHERE id::text = $1 OR order_number = $1 RETURNING *`;
      const res = await query(sql, params);
      const updatedOrder = res.rows[0];

      if (updatedOrder && (message || order_status)) {
        await query(
          `INSERT INTO order_timeline (order_id, order_number, status, message, created_by)
           VALUES ($1, $2, $3, $4, $5)`,
          [updatedOrder.id, updatedOrder.order_number, order_status || updatedOrder.order_status, message || `Order status updated to ${order_status}`, 'SYSTEM']
        );
      }
      return updatedOrder;
    }
    return store.updateOrderStatus(id, { order_status, payment_status, notes, message });
  },

  async addOrderTimeline(orderId, { status, message, created_by = 'SYSTEM' }) {
    if (pgPool) {
      const ord = await this.getOrderById(orderId);
      if (!ord) return null;
      const res = await query(
        `INSERT INTO order_timeline (order_id, order_number, status, message, created_by)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [ord.id, ord.order_number, status, message, created_by]
      );
      return res.rows[0];
    }
    const order = store.getOrderById(orderId);
    if (order) {
      order.timeline = order.timeline || [];
      order.timeline.push({ status, message, timestamp: new Date().toISOString() });
      store.save();
    }
    return { status, message };
  },

  // ==========================================
  // 4. SHIPMENTS (Shiprocket Integration)
  // ==========================================
  async getShipments() {
    if (pgPool) {
      const res = await query('SELECT * FROM shipments ORDER BY created_at DESC');
      return res.rows;
    }
    return store.getShipments();
  },

  async getShipmentByOrderId(orderId) {
    if (pgPool) {
      const res = await query(
        `SELECT s.* FROM shipments s
         JOIN orders o ON s.order_id = o.id
         WHERE o.id::text = $1 OR o.order_number = $1 OR s.awb_code = $1
         LIMIT 1`,
        [orderId]
      );
      return res.rows[0] || null;
    }
    return store.getShipmentByOrderId(orderId);
  },

  async saveShipment(shipmentData) {
    if (pgPool) {
      const ord = await this.getOrderById(shipmentData.order_id);
      const orderDbId = ord ? ord.id : shipmentData.order_id;

      const res = await query(
        `INSERT INTO shipments (
          order_id, provider, shiprocket_order_id, shiprocket_shipment_id,
          courier_id, courier_name, awb_code, status, label_url, pickup_scheduled_date
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (id) DO UPDATE SET
          courier_id = EXCLUDED.courier_id,
          courier_name = EXCLUDED.courier_name,
          awb_code = EXCLUDED.awb_code,
          status = EXCLUDED.status,
          label_url = EXCLUDED.label_url,
          pickup_scheduled_date = EXCLUDED.pickup_scheduled_date,
          updated_at = NOW()
        RETURNING *`,
        [
          orderDbId, shipmentData.provider || 'SHIPROCKET', shipmentData.shiprocket_order_id,
          shipmentData.shiprocket_shipment_id, shipmentData.courier_id, shipmentData.courier_name,
          shipmentData.awb_code, shipmentData.status || 'CREATED', shipmentData.label_url,
          shipmentData.pickup_scheduled_date
        ]
      );
      return res.rows[0];
    }
    return store.saveShipment(shipmentData);
  },

  // ==========================================
  // 5. PAYMENTS & REFUNDS
  // ==========================================
  async getPayments() {
    if (pgPool) {
      const res = await query('SELECT p.*, o.order_number, o.customer_name FROM payments p JOIN orders o ON p.order_id = o.id ORDER BY p.created_at DESC');
      return res.rows;
    }
    return (store.state.orders || []).map(o => ({
      id: o.payment_id || `pay-${o.order_number}`,
      order_number: o.order_number,
      customer_name: o.customer.name,
      amount: o.total_amount,
      currency: 'INR',
      status: o.payment_status === 'PAID' ? 'SUCCESS' : o.payment_status,
      payment_method: o.payment_method,
      created_at: o.created_at
    }));
  },

  async savePayment(paymentData) {
    if (pgPool) {
      const res = await query(
        `INSERT INTO payments (order_id, gateway, gateway_order_id, gateway_payment_id, amount, status, signature_verified, raw_response)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [
          paymentData.order_id, paymentData.gateway || 'RAZORPAY', paymentData.gateway_order_id,
          paymentData.gateway_payment_id, paymentData.amount, paymentData.status,
          Boolean(paymentData.signature_verified), JSON.stringify(paymentData.raw_response || {})
        ]
      );
      return res.rows[0];
    }
    return paymentData;
  },

  async createRefund({ order_id, order_number, payment_id, gateway_refund_id, amount, reason }) {
    if (pgPool) {
      const ord = await this.getOrderById(order_number || order_id);
      const res = await query(
        `INSERT INTO refunds (order_id, order_number, payment_id, gateway_refund_id, amount, reason, status)
         VALUES ($1, $2, $3, $4, $5, $6, 'PROCESSED') RETURNING *`,
        [ord ? ord.id : order_id, order_number, payment_id, gateway_refund_id, amount, reason]
      );
      return res.rows[0];
    }
    store.state.refunds = store.state.refunds || [];
    const refund = {
      id: `ref-${Date.now()}`,
      order_number,
      payment_id,
      gateway_refund_id,
      amount,
      reason,
      status: 'PROCESSED',
      created_at: new Date().toISOString()
    };
    store.state.refunds.unshift(refund);
    store.save();
    return refund;
  },

  async getRefunds() {
    if (pgPool) {
      const res = await query('SELECT * FROM refunds ORDER BY created_at DESC');
      return res.rows;
    }
    return store.state.refunds || [];
  },

  // ==========================================
  // 6. RETURNS & EXCHANGES
  // ==========================================
  async getReturns() {
    if (pgPool) {
      const res = await query('SELECT * FROM returns_exchanges ORDER BY created_at DESC');
      return res.rows;
    }
    return store.getReturns();
  },

  async createReturn(returnData) {
    if (pgPool) {
      const ord = await this.getOrderById(returnData.order_id);
      const res = await query(
        `INSERT INTO returns_exchanges (order_id, type, reason, customer_comments, status, refund_amount)
         VALUES ($1, $2, $3, $4, 'REQUESTED', $5) RETURNING *`,
        [ord ? ord.id : returnData.order_id, returnData.type, returnData.reason, returnData.customer_comments, returnData.refund_amount || 0]
      );
      return res.rows[0];
    }
    return store.createReturn(returnData);
  },

  async updateReturn(id, update) {
    if (pgPool) {
      const updates = [];
      const params = [id];
      if (update.status) {
        params.push(update.status);
        updates.push(`status = $${params.length}`);
      }
      if (update.reverse_awb) {
        params.push(update.reverse_awb);
        updates.push(`reverse_awb = $${params.length}`);
      }
      if (update.admin_notes) {
        params.push(update.admin_notes);
        updates.push(`admin_notes = $${params.length}`);
      }
      updates.push('updated_at = NOW()');

      const res = await query(`UPDATE returns_exchanges SET ${updates.join(', ')} WHERE id::text = $1 RETURNING *`, params);
      return res.rows[0];
    }
    return store.updateReturn(id, update);
  },

  // ==========================================
  // 7. CUSTOMERS
  // ==========================================
  async getCustomers() {
    if (pgPool) {
      const res = await query('SELECT * FROM customers ORDER BY total_spent DESC');
      return res.rows;
    }
    // Aggregate customer data from orders
    const custMap = new Map();
    (store.state.orders || []).forEach(o => {
      const phone = o.customer.phone;
      if (!custMap.has(phone)) {
        custMap.set(phone, {
          name: o.customer.name,
          email: o.customer.email,
          phone: o.customer.phone,
          total_orders: 1,
          total_spent: o.total_amount,
          group_tag: 'NEW',
          created_at: o.created_at
        });
      } else {
        const c = custMap.get(phone);
        c.total_orders += 1;
        c.total_spent += o.total_amount;
        if (c.total_orders >= 3) c.group_tag = 'VIP';
      }
    });
    return Array.from(custMap.values());
  },

  // ==========================================
  // 8. COUPONS
  // ==========================================
  async getCoupons() {
    if (pgPool) {
      const res = await query('SELECT * FROM coupons ORDER BY created_at DESC');
      return res.rows;
    }
    return store.getCoupons();
  },

  async getCouponByCode(code) {
    if (pgPool) {
      const res = await query('SELECT * FROM coupons WHERE UPPER(code) = UPPER($1) AND is_active = true LIMIT 1', [code]);
      return res.rows[0] || null;
    }
    return store.getCouponByCode(code);
  },

  async saveCoupon(couponData) {
    if (pgPool) {
      const res = await query(
        `INSERT INTO coupons (code, discount_type, discount_value, min_order_amount, max_discount_amount, usage_limit, is_active)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (code) DO UPDATE SET
           discount_type = EXCLUDED.discount_type,
           discount_value = EXCLUDED.discount_value,
           min_order_amount = EXCLUDED.min_order_amount,
           max_discount_amount = EXCLUDED.max_discount_amount,
           usage_limit = EXCLUDED.usage_limit,
           is_active = EXCLUDED.is_active
         RETURNING *`,
        [couponData.code.toUpperCase(), couponData.discount_type, couponData.discount_value, couponData.min_order_amount || 0, couponData.max_discount_amount || null, couponData.usage_limit || null, couponData.is_active !== false]
      );
      return res.rows[0];
    }
    return store.saveCoupon(couponData);
  },

  // ==========================================
  // 9. ABANDONED CHECKOUTS
  // ==========================================
  async saveAbandonedCheckout({ session_id, customer_email, customer_phone, customer_name, items, subtotal }) {
    if (pgPool) {
      const res = await query(
        `INSERT INTO abandoned_checkouts (session_id, customer_email, customer_phone, customer_name, items, subtotal)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (session_id) DO UPDATE SET
           items = EXCLUDED.items,
           subtotal = EXCLUDED.subtotal,
           updated_at = NOW()
         RETURNING *`,
        [session_id, customer_email, customer_phone, customer_name, JSON.stringify(items), subtotal]
      );
      return res.rows[0];
    }
    store.state.abandoned_checkouts = store.state.abandoned_checkouts || [];
    const item = { id: `ab-${Date.now()}`, session_id, customer_email, customer_phone, customer_name, items, subtotal, recovery_status: 'ABANDONED', created_at: new Date().toISOString() };
    store.state.abandoned_checkouts.unshift(item);
    store.save();
    return item;
  },

  async getAbandonedCheckouts() {
    if (pgPool) {
      const res = await query('SELECT * FROM abandoned_checkouts ORDER BY created_at DESC LIMIT 50');
      return res.rows;
    }
    return store.state.abandoned_checkouts || [];
  },

  // ==========================================
  // 10. WEBHOOK IDEMPOTENCY
  // ==========================================
  async recordWebhookEvent({ event_id, provider, event_type, payload }) {
    if (pgPool) {
      try {
        const res = await query(
          `INSERT INTO webhook_events (event_id, provider, event_type, payload, status)
           VALUES ($1, $2, $3, $4, 'PROCESSED') RETURNING *`,
          [event_id, provider, event_type, JSON.stringify(payload)]
        );
        return { is_new: true, record: res.rows[0] };
      } catch (err) {
        if (err.code === '23505') { // Unique violation
          return { is_new: false, duplicate: true };
        }
        throw err;
      }
    }
    store.state.webhook_events = store.state.webhook_events || [];
    if (store.state.webhook_events.some(e => e.event_id === event_id)) {
      return { is_new: false, duplicate: true };
    }
    store.state.webhook_events.push({ event_id, provider, event_type, payload, created_at: new Date().toISOString() });
    store.save();
    return { is_new: true };
  },

  // ==========================================
  // 11. AUDIT TRAIL
  // ==========================================
  async getAuditLogs(limit = 100) {
    if (pgPool) {
      const res = await query('SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT $1', [limit]);
      return res.rows;
    }
    return store.getAuditLogs(limit);
  },

  async addAuditLog(entry) {
    if (pgPool) {
      const res = await query(
        `INSERT INTO audit_logs (admin_user_id, admin_email, action, resource_type, resource_id, diff_json, ip_address)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [entry.user?.id || null, entry.user?.email || 'system', entry.action, entry.resource_type, entry.resource_id, JSON.stringify(entry.diff || entry.details || {}), entry.ip || '127.0.0.1']
      );
      return res.rows[0];
    }
    return store.addAuditLog(entry);
  },

  // ==========================================
  // 12. STORE SETTINGS & CMS
  // ==========================================
  async getSettings() {
    if (pgPool) {
      const res = await query('SELECT key, value FROM store_settings');
      const settings = {};
      res.rows.forEach(r => settings[r.key] = r.value);
      return settings;
    }
    return store.getSettings();
  },

  async updateSettings(settingsObj) {
    if (pgPool) {
      for (const [key, val] of Object.entries(settingsObj)) {
        await query(
          `INSERT INTO store_settings (key, value, updated_at)
           VALUES ($1, $2, NOW())
           ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`,
          [key, JSON.stringify(val)]
        );
      }
      return settingsObj;
    }
    return store.updateSettings(settingsObj);
  }
};

module.exports = db;
