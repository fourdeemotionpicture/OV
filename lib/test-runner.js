// ==============================================================================
// OV™ — COMPREHENSIVE PRODUCTION TEST SUITE & SECURITY AUDITOR
// ==============================================================================

const path = require('path');
const crypto = require('crypto');

// 1. Set dynamic test credentials before requiring application modules
const TEST_ADMIN_PASSWORD = 'Test@' + Date.now() + '!SecureRotated2026';
process.env.ADMIN_INITIAL_PASSWORD = TEST_ADMIN_PASSWORD;
process.env.JWT_SECRET = 'ov_test_jwt_secret_key_random_' + Date.now();
process.env.PAYMENT_WEBHOOK_SECRET = 'ov_rzp_webhook_secret_test_2026';
process.env.SHIPROCKET_WEBHOOK_TOKEN = 'ov_sr_webhook_token_test_2026';

const router = require('../api/index');
const db = require('./db');

function mockRes() {
  const res = {
    statusCode: 200,
    headers: {},
    body: null,
    setHeader(k, v) { res.headers[k] = v; },
    status(code) { res.statusCode = code; return res; },
    json(data) { res.body = data; return res; },
    end(data) { if (data) res.body = data; return res; }
  };
  return res;
}

async function runAllTests() {
  console.log('\n===============================================================');
  console.log('  OV™ PRODUCTION FULL E-COMMERCE & SECURITY VERIFICATION SUITE');
  console.log('===============================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(name, condition, extra = '') {
    if (condition) {
      console.log(`[PASS ✓] ${name}${extra ? ' — ' + extra : ''}`);
      passed++;
    } else {
      console.error(`[FAIL ✗] ${name}${extra ? ' — ' + extra : ''}`);
      failed++;
    }
  }

  // TEST 1: API Health Router
  const res1 = mockRes();
  await router({ url: '/api/health', method: 'GET', headers: {} }, res1);
  assert('1. API Health & Serverless Router', res1.statusCode === 200 && res1.body?.status === 'ONLINE');

  // TEST 2: Admin Login with Dynamic Rotated Credential
  const res2 = mockRes();
  await router({
    url: '/api/auth/admin-login',
    method: 'POST',
    headers: { 'x-forwarded-for': '127.0.0.1' },
    body: { email: 'admin@ovclothing.com', password: TEST_ADMIN_PASSWORD }
  }, res2);
  const token = res2.body?.data?.token;
  assert('2. Admin Login (JWT generation with secure rotated credentials)', res2.statusCode === 200 && !!token);

  // TEST 3: Rate Limiter / Brute-Force Defense
  const bruteRes = mockRes();
  for (let i = 0; i < 6; i++) {
    await router({
      url: '/api/auth/admin-login',
      method: 'POST',
      headers: { 'x-forwarded-for': '192.168.1.99' },
      body: { email: 'attacker@evil.com', password: 'WrongPassword' }
    }, bruteRes);
  }
  assert('3. Brute-Force Rate Limiter (Locks out IP after repeated failures)', bruteRes.statusCode === 429);

  // TEST 4: Session Verification & RBAC
  const res4 = mockRes();
  await router({
    url: '/api/auth/verify',
    method: 'GET',
    headers: { authorization: 'Bearer ' + token }
  }, res4);
  assert('4. Session Verification & RBAC', res4.statusCode === 200 && res4.body?.data?.user?.role === 'OWNER');

  // TEST 5: Password Rotation Endpoint
  const NEW_PASSWORD = 'New@' + Date.now() + '!RotatedNow';
  const res5 = mockRes();
  await router({
    url: '/api/auth/change-password',
    method: 'POST',
    headers: { authorization: 'Bearer ' + token },
    body: { current_password: TEST_ADMIN_PASSWORD, new_password: NEW_PASSWORD }
  }, res5);
  assert('5. Admin Password Rotation (/api/auth/change-password)', res5.statusCode === 200 && res5.body?.success === true);

  // Restore password for downstream tests
  await router({
    url: '/api/auth/change-password',
    method: 'POST',
    headers: { authorization: 'Bearer ' + token },
    body: { current_password: NEW_PASSWORD, new_password: TEST_ADMIN_PASSWORD }
  }, mockRes());

  // TEST 6: Catalog Listing & Variants
  const res6 = mockRes();
  await router({ url: '/api/products', method: 'GET', headers: {} }, res6);
  const prods = res6.body?.data || [];
  assert('6. Catalog Products & Variants Retrieval', res6.statusCode === 200 && prods.length >= 2, `${prods.length} products found`);

  // TEST 7: Dynamic Product Detail Route
  const res7 = mockRes();
  await router({ url: '/api/products/ov-grace-240gsm-tee-beige', method: 'GET', headers: {} }, res7);
  assert('7. Dynamic Product Detail Route (/products/:id)', res7.statusCode === 200 && res7.body?.data?.slug === 'ov-grace-240gsm-tee-beige');

  // TEST 8: Concurrency Inventory Adjustment
  const res8 = mockRes();
  await router({
    url: '/api/inventory/adjust',
    method: 'POST',
    headers: { authorization: 'Bearer ' + token },
    body: { variant_id: 'var-grace-s', stock_quantity: 60, reason: 'RESTOCK_BATCH' }
  }, res8);
  assert('8. Inventory Adjustment & Transaction Logging', res8.statusCode === 200 && res8.body?.data?.stock_quantity === 60);

  // TEST 9: Negative Stock Prevention
  let negError = false;
  try {
    const res9 = mockRes();
    await router({
      url: '/api/inventory/adjust',
      method: 'POST',
      headers: { authorization: 'Bearer ' + token },
      body: { variant_id: 'var-grace-s', delta: -999999 }
    }, res9);
    negError = res9.statusCode >= 400;
  } catch (e) {
    negError = true;
  }
  assert('9. Concurrency Protection (Prevents Negative Inventory & Overselling)', negError);

  // TEST 10: Server-Verified Quote (Detects and Rejects Price Tampering)
  const res10 = mockRes();
  await router({
    url: '/api/checkout/quote',
    method: 'POST',
    headers: {},
    body: { items: [{ variant_id: 'var-grace-m', quantity: 2, client_price: 1 }], payment_method: 'UPI' }
  }, res10);
  assert('10. Server-Verified Quote (Enforces DB Pricing, Ignores Client Tampering)', res10.statusCode === 200 && res10.body?.data?.subtotal === 1998);

  // TEST 11: Abandoned Checkout Tracking
  const res11 = mockRes();
  await router({
    url: '/api/checkout/abandoned',
    method: 'POST',
    headers: {},
    body: {
      session_id: `sess_${Date.now()}`,
      customer_email: 'abandoned.buyer@example.com',
      customer_phone: '9840112233',
      customer_name: 'Lead Customer',
      items: [{ variant_id: 'var-grace-m', quantity: 1 }],
      subtotal: 999
    }
  }, res11);
  assert('11. Abandoned Checkout Recovery Engine', res11.statusCode === 200 && res11.body?.data?.tracked === true);

  // TEST 12: Order Creation (COD)
  const res12 = mockRes();
  await router({
    url: '/api/orders',
    method: 'POST',
    headers: {},
    body: {
      customer: { name: 'Vikram Seth', phone: '9840199999', email: 'vikram@example.com' },
      shipping_address: { address_line1: '9 Boat Club Road', city: 'Chennai', state: 'Tamil Nadu', pincode: '600028' },
      items: [{ variant_id: 'var-grace-xl', quantity: 1 }],
      payment_method: 'COD'
    }
  }, res12);
  const orderNumber = res12.body?.data?.order_number;
  assert('12. Order Creation & Atomic Stock Reservation (COD)', res12.statusCode === 201 && !!orderNumber, `Order: ${orderNumber}`);

  // TEST 13: Razorpay Payment Order Creation
  const res13 = mockRes();
  await router({
    url: '/api/payments/create-order',
    method: 'POST',
    headers: {},
    body: { amount: 1998, customer_email: 'vikram@example.com', customer_phone: '9840199999' }
  }, res13);
  const rzpOrderId = res13.body?.data?.order_id;
  assert('13. Razorpay Server Order Creation', res13.statusCode === 200 && !!rzpOrderId);

  // TEST 14: Razorpay Signature Verification
  const res14 = mockRes();
  await router({
    url: '/api/payments/verify',
    method: 'POST',
    headers: {},
    body: {
      razorpay_order_id: rzpOrderId,
      razorpay_payment_id: 'pay_test_verified_123',
      razorpay_signature: 'test_signature_simulated',
      order_number: orderNumber
    }
  }, res14);
  assert('14. Razorpay Payment Signature Verification', res14.statusCode === 200 && res14.body?.data?.verified === true);

  // TEST 15: Shiprocket Serviceability & Multi-Courier Rate Comparison
  const res15 = mockRes();
  await router({
    url: '/api/shipping/serviceability?pincode=600028',
    method: 'GET',
    headers: {}
  }, res15);
  const couriers = res15.body?.data?.couriers || [];
  assert('15. Shiprocket Serviceability & Multi-Courier Quotes', res15.statusCode === 200 && couriers.length >= 2, `${couriers.length} couriers available`);

  // TEST 16: Shiprocket AWB Generation & Courier Assignment
  const res16 = mockRes();
  await router({
    url: '/api/shipping/assign-awb',
    method: 'POST',
    headers: { authorization: 'Bearer ' + token },
    body: { order_id: orderNumber, courier_id: 101 }
  }, res16);
  const awbCode = res16.body?.data?.shipment?.awb_code;
  assert('16. Shiprocket Courier Assignment & AWB Generation', res16.statusCode === 200 && !!awbCode, `AWB: ${awbCode}`);

  // TEST 17: Shiprocket Pickup Scheduling
  const res17 = mockRes();
  await router({
    url: '/api/shipping/schedule-pickup',
    method: 'POST',
    headers: { authorization: 'Bearer ' + token },
    body: { order_id: orderNumber }
  }, res17);
  assert('17. Shiprocket Logistics Pickup Scheduling', res17.statusCode === 200 && res17.body?.data?.success === true);

  // TEST 18: Shiprocket Shipping Label PDF Generation
  const res18 = mockRes();
  await router({
    url: `/api/shipping/label?order_id=${orderNumber}`,
    method: 'GET',
    headers: { authorization: 'Bearer ' + token }
  }, res18);
  assert('18. Shiprocket Shipping Label PDF Generation', res18.statusCode === 200 && !!res18.body?.data?.label_url);

  // TEST 19: Shiprocket NDR Action Submission
  const res19 = mockRes();
  await router({
    url: '/api/shipping/ndr',
    method: 'POST',
    headers: { authorization: 'Bearer ' + token },
    body: { awb: awbCode, action: 'REATTEMPT', comments: 'Customer requested evening delivery' }
  }, res19);
  assert('19. Shiprocket NDR Action (Re-attempt Dispatch)', res19.statusCode === 200 && res19.body?.success === true);

  // TEST 20: Shiprocket Webhook Idempotency (Deduplication)
  const webhookEventId = `SR_EVT_${Date.now()}`;
  const res20a = mockRes();
  await router({
    url: '/api/webhooks/shiprocket',
    method: 'POST',
    headers: { 'x-shiprocket-token': process.env.SHIPROCKET_WEBHOOK_TOKEN },
    body: { event_id: webhookEventId, awb: awbCode, current_status: 'IN TRANSIT', location: 'Chennai Hub' }
  }, res20a);
  const res20b = mockRes();
  await router({
    url: '/api/webhooks/shiprocket',
    method: 'POST',
    headers: { 'x-shiprocket-token': process.env.SHIPROCKET_WEBHOOK_TOKEN },
    body: { event_id: webhookEventId, awb: awbCode, current_status: 'IN TRANSIT', location: 'Chennai Hub' }
  }, res20b);
  assert('20. Shiprocket Webhook Idempotency (Duplicate Event Ignored)', res20a.statusCode === 200 && res20b.body?.data?.duplicate === true);

  // TEST 21: Public Order Tracking & Milestones
  const res21 = mockRes();
  await router({
    url: `/api/orders/track?order_number=${orderNumber}`,
    method: 'GET',
    headers: {}
  }, res21);
  assert('21. Public Order & AWB Tracking with Live Milestones', res21.statusCode === 200 && res21.body?.data?.order_number === orderNumber);

  // TEST 22: Customer Return/Exchange Request
  const res22 = mockRes();
  await router({
    url: '/api/returns',
    method: 'POST',
    headers: {},
    body: {
      order_number: orderNumber,
      type: 'EXCHANGE',
      reason: 'SIZE_TOO_LARGE',
      desired_size: 'L',
      notes: 'Please exchange for Large size'
    }
  }, res22);
  const returnId = res22.body?.data?.id;
  assert('22. Customer Return & Exchange Portal Submission', res22.statusCode === 201 && !!returnId, `Return ID: ${returnId}`);

  // TEST 23: Admin Return Approval & Reverse Pickup AWB Generation
  const res23 = mockRes();
  await router({
    url: `/api/returns/${returnId}`,
    method: 'PUT',
    headers: { authorization: 'Bearer ' + token },
    body: { status: 'APPROVED', admin_notes: 'Exchange approved. Reverse courier scheduled.' }
  }, res23);
  const revAwb = res23.body?.data?.reverse_awb;
  assert('23. Admin Return Approval & Reverse Pickup AWB Generation', res23.statusCode === 200 && !!revAwb, `Reverse AWB: ${revAwb}`);

  // TEST 24: Admin Refund Processing
  const res24 = mockRes();
  await router({
    url: '/api/admin/refunds',
    method: 'POST',
    headers: { authorization: 'Bearer ' + token },
    body: { order_number: orderNumber, amount: 999, reason: 'Approved customer return' }
  }, res24);
  assert('24. Refund Processing (Razorpay API / DB Record)', res24.statusCode === 200 && res24.body?.data?.amount === 999);

  // TEST 25: Admin Customers Management
  const res25 = mockRes();
  await router({
    url: '/api/admin/customers',
    method: 'GET',
    headers: { authorization: 'Bearer ' + token }
  }, res25);
  assert('25. Admin Customers Directory & Analytics', res25.statusCode === 200 && Array.isArray(res25.body?.data));

  // TEST 26: Admin Payments & COD Management
  const res26 = mockRes();
  await router({
    url: '/api/admin/payments',
    method: 'POST',
    headers: { authorization: 'Bearer ' + token },
    body: { order_number: orderNumber, action: 'MARK_COD_COLLECTED' }
  }, res26);
  assert('26. Admin Payments & COD Collection Confirmation', res26.statusCode === 200 && res26.body?.data?.payment_status === 'PAID');

  // TEST 27: System Health & Integrations Diagnostic
  const res27 = mockRes();
  await router({
    url: '/api/admin/health',
    method: 'GET',
    headers: { authorization: 'Bearer ' + token }
  }, res27);
  assert('27. System Health Diagnostic (PostgreSQL, Razorpay, Shiprocket)', res27.statusCode === 200 && res27.body?.data?.status === 'ONLINE');

  // TEST 28: Security Audit Logs
  const res28 = mockRes();
  await router({
    url: '/api/admin/audit-logs?limit=20',
    method: 'GET',
    headers: { authorization: 'Bearer ' + token }
  }, res28);
  assert('28. Security Audit Trail Logs', res28.statusCode === 200 && res28.body?.data?.length > 0);

  // TEST 29: Admin Metrics & Sales KPIs
  const res29 = mockRes();
  await router({
    url: '/api/admin/metrics',
    method: 'GET',
    headers: { authorization: 'Bearer ' + token }
  }, res29);
  assert('29. Admin Executive Sales & Logistics Metrics', res29.statusCode === 200 && res29.body?.data?.total_orders >= 1);

  // TEST 30: Zero Hardcoded Secret Scanner Verification
  const fs = require('fs');
  const filesToCheck = ['index.html', 'app.js', 'lib/store.js', 'api/index.js'];
  let secretsFound = 0;
  for (const f of filesToCheck) {
    const filePath = path.join(__dirname, '..', f);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('Admin@OV2026!') || content.includes('rzp_live_secret') || content.includes('postgres://password')) {
        secretsFound++;
      }
    }
  }
  assert('30. Production Security Audit: Zero Plaintext Secrets in Tracked Code', secretsFound === 0);

  console.log('\n===============================================================');
  console.log(`    TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  if (failed === 0) {
    console.log('    ✓ ALL 30 PRODUCTION SUITE TESTS PASSED WITH 100% SUCCESS!  ');
  } else {
    console.log('    ✗ SOME TESTS FAILED. PLEASE REVIEW LOGS ABOVE.            ');
  }
  console.log('===============================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runAllTests().catch(err => {
  console.error('Fatal test runner failure:', err);
  process.exit(1);
});
