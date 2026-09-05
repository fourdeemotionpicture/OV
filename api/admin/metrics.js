// ==============================================================================
// OV™ — ADMIN ANALYTICS & METRICS API (/api/admin/metrics)
// ==============================================================================

const db = require('../../lib/db');
const { requireAuth, ROLES } = require('../../lib/auth');
const { sendSuccess, sendError } = require('../../lib/response');

module.exports = async function handler(req, res) {
  const user = requireAuth(req, res, [ROLES.OWNER, ROLES.ADMIN, ROLES.ORDER_MANAGER, ROLES.ACCOUNTANT]);
  if (!user) return;

  try {
    const orders = await db.getOrders();
    const products = await db.getProducts();
    const returns = await db.getReturns();

    let netSales = 0;
    let unitsSold = 0;
    let unfulfilledOrders = 0;
    let rtoCount = 0;
    let ndrCount = 0;

    orders.forEach(o => {
      if (o.payment_status === 'PAID' || o.payment_method === 'COD') {
        netSales += o.total_amount || 0;
      }
      if (Array.isArray(o.items)) {
        o.items.forEach(i => {
          unitsSold += i.quantity || 0;
        });
      }
      if (o.order_status === 'PROCESSING' || o.shipment_status === 'UNFULFILLED') {
        unfulfilledOrders++;
      }
      if (o.order_status === 'RTO' || o.shipment_status === 'RTO_INITIATED') {
        rtoCount++;
      }
      if (o.order_status === 'NDR') {
        ndrCount++;
      }
    });

    const lowStockVariants = [];
    products.forEach(p => {
      p.variants?.forEach(v => {
        if (v.stock_quantity <= (v.low_stock_threshold || 5)) {
          lowStockVariants.push({
            product_title: p.title,
            sku: v.sku,
            size: v.size,
            color: v.color,
            stock_quantity: v.stock_quantity,
            low_stock_threshold: v.low_stock_threshold || 5
          });
        }
      });
    });

    const averageOrderValue = orders.length > 0 ? Math.round(netSales / orders.length) : 0;

    return sendSuccess(res, {
      net_sales: netSales,
      total_orders: orders.length,
      units_sold: unitsSold,
      average_order_value: averageOrderValue,
      unfulfilled_orders: unfulfilledOrders,
      rto_count: rtoCount,
      ndr_count: ndrCount,
      pending_returns: returns.filter(r => r.status === 'REQUESTED').length,
      low_stock_items: lowStockVariants
    }, 'Store metrics calculated');

  } catch (err) {
    console.error('[Metrics API Error]', err);
    return sendError(res, 'Failed to compute store metrics', 500);
  }
};
