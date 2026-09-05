-- ==============================================================================
-- OV™ — ORIGINAL VERSION | RELATIONAL DATABASE SCHEMA (PostgreSQL)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ADMIN USERS & RBAC
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL CHECK (role IN ('OWNER', 'ADMIN', 'ORDER_MANAGER', 'WAREHOUSE', 'MARKETING', 'ACCOUNTANT', 'SUPPORT')),
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- 3. CUSTOMERS
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    phone VARCHAR(20) UNIQUE NOT NULL,
    group_tag VARCHAR(30) DEFAULT 'NEW' CHECK (group_tag IN ('NEW', 'RETURNING', 'VIP', 'INACTIVE', 'COD_RISK')),
    total_orders INT DEFAULT 0,
    total_spent DECIMAL(10, 2) DEFAULT 0.00,
    wallet_balance DECIMAL(10, 2) DEFAULT 0.00,
    loyalty_points INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);

-- 4. CUSTOMER ADDRESSES
CREATE TABLE IF NOT EXISTS customer_addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    landmark VARCHAR(150),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_customer_addresses_cust ON customer_addresses(customer_id);

-- 5. CATEGORIES
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. PRODUCTS
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    base_name VARCHAR(100),
    brand VARCHAR(100) DEFAULT 'OV™ FEMME',
    description TEXT,
    fabric_specs TEXT,
    fit VARCHAR(50) DEFAULT 'Oversize',
    gsm VARCHAR(20) DEFAULT '240 GSM',
    category_id VARCHAR(50) REFERENCES categories(id) ON DELETE SET NULL,
    base_price DECIMAL(10, 2) NOT NULL,
    compare_at_price DECIMAL(10, 2),
    cost_price DECIMAL(10, 2),
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'UPCOMING', 'DRAFT', 'ARCHIVED')),
    badge VARCHAR(50),
    is_featured BOOLEAN DEFAULT FALSE,
    rating DECIMAL(2, 1) DEFAULT 4.9,
    review_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);

-- 7. PRODUCT VARIANTS (Variant-level size, color, and stock)
CREATE TABLE IF NOT EXISTS product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id VARCHAR(50) REFERENCES products(id) ON DELETE CASCADE,
    sku VARCHAR(100) UNIQUE NOT NULL,
    size VARCHAR(20) NOT NULL,
    color VARCHAR(50) NOT NULL,
    weight_grams INT DEFAULT 450,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    reserved_quantity INT NOT NULL DEFAULT 0,
    low_stock_threshold INT DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_stock_non_negative CHECK (stock_quantity >= 0)
);

CREATE INDEX IF NOT EXISTS idx_variants_product ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_variants_sku ON product_variants(sku);

-- 8. PRODUCT IMAGES
CREATE TABLE IF NOT EXISTS product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id VARCHAR(50) REFERENCES products(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(200),
    sort_order INT DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_product_images_prod ON product_images(product_id);

-- 9. ORDERS
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(150),
    customer_phone VARCHAR(20) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    discount_amount DECIMAL(10, 2) DEFAULT 0.00,
    tax_amount DECIMAL(10, 2) DEFAULT 0.00,
    shipping_fee DECIMAL(10, 2) DEFAULT 0.00,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(30) NOT NULL CHECK (payment_method IN ('PREPAID_UPI', 'PREPAID_CARD', 'PREPAID_NETBANKING', 'COD')),
    payment_status VARCHAR(30) DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'PAID', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED')),
    order_status VARCHAR(30) DEFAULT 'CREATED' CHECK (order_status IN ('CREATED', 'PROCESSING', 'READY_TO_SHIP', 'SHIPPED', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED', 'RTO', 'NDR', 'RETURN_REQUESTED', 'RETURNED')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_orders_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);

-- 10. ORDER ITEMS
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id VARCHAR(50) REFERENCES products(id) ON DELETE SET NULL,
    variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
    product_name VARCHAR(200) NOT NULL,
    variant_title VARCHAR(100) NOT NULL,
    sku VARCHAR(100),
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(500)
);

CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

-- 11. ORDER ADDRESSES
CREATE TABLE IF NOT EXISTS order_addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    recipient_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    type VARCHAR(20) DEFAULT 'SHIPPING' CHECK (type IN ('SHIPPING', 'BILLING'))
);

CREATE INDEX IF NOT EXISTS idx_order_addresses_order ON order_addresses(order_id);

-- 12. PAYMENTS
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    gateway VARCHAR(30) DEFAULT 'RAZORPAY',
    gateway_order_id VARCHAR(100),
    gateway_payment_id VARCHAR(100),
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    status VARCHAR(30) NOT NULL CHECK (status IN ('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED')),
    signature_verified BOOLEAN DEFAULT FALSE,
    raw_response JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_payments_order ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_gw_pay_id ON payments(gateway_payment_id);

-- 13. SHIPMENTS (Shiprocket Integration Hub)
CREATE TABLE IF NOT EXISTS shipments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    provider VARCHAR(30) DEFAULT 'SHIPROCKET',
    shiprocket_order_id VARCHAR(100),
    shiprocket_shipment_id VARCHAR(100),
    courier_id INT,
    courier_name VARCHAR(100),
    awb_code VARCHAR(100),
    shipping_rate DECIMAL(10, 2),
    estimated_delivery_date DATE,
    pickup_token_number VARCHAR(100),
    pickup_scheduled_date TIMESTAMP WITH TIME ZONE,
    label_url VARCHAR(500),
    manifest_url VARCHAR(500),
    invoice_url VARCHAR(500),
    status VARCHAR(30) DEFAULT 'CREATED' CHECK (status IN ('CREATED', 'AWB_ASSIGNED', 'PICKUP_SCHEDULED', 'PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'NDR', 'RTO', 'CANCELLED', 'RETURNED')),
    is_rto BOOLEAN DEFAULT FALSE,
    rto_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_shipments_order ON shipments(order_id);
CREATE INDEX IF NOT EXISTS idx_shipments_awb ON shipments(awb_code);
CREATE INDEX IF NOT EXISTS idx_shipments_status ON shipments(status);

-- 14. TRACKING EVENTS
CREATE TABLE IF NOT EXISTS tracking_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shipment_id UUID REFERENCES shipments(id) ON DELETE CASCADE,
    awb_code VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    location VARCHAR(150),
    activity_description TEXT,
    event_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_tracking_events_awb ON tracking_events(awb_code);

-- 15. RETURNS & EXCHANGES
CREATE TABLE IF NOT EXISTS returns_exchanges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('RETURN', 'EXCHANGE')),
    reason VARCHAR(50) NOT NULL,
    customer_comments TEXT,
    status VARCHAR(30) DEFAULT 'REQUESTED' CHECK (status IN ('REQUESTED', 'APPROVED', 'REJECTED', 'REVERSE_PICKUP_SCHEDULED', 'RECEIVED', 'QC_PASSED', 'QC_FAILED', 'REFUNDED', 'REPLACED', 'CANCELLED')),
    replacement_variant_id UUID REFERENCES product_variants(id),
    reverse_awb VARCHAR(100),
    refund_amount DECIMAL(10, 2),
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_returns_order ON returns_exchanges(order_id);

-- 16. COUPONS
CREATE TABLE IF NOT EXISTS coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('PERCENTAGE', 'FIXED')),
    discount_value DECIMAL(10, 2) NOT NULL,
    min_order_amount DECIMAL(10, 2) DEFAULT 0.00,
    max_discount_amount DECIMAL(10, 2),
    usage_limit INT,
    times_used INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);

-- 17. AUDIT LOGS
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_user_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    admin_email VARCHAR(150),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id VARCHAR(100),
    diff_json JSONB,
    ip_address VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_resource ON audit_logs(resource_type, resource_id);

-- 18. STORE SETTINGS (Key-Value CMS and System Configs)
CREATE TABLE IF NOT EXISTS store_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
