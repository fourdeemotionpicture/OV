// ==============================================================================
// OV™ — SHIPPING SERVICE FACTORY
// ==============================================================================

const ShippingService = require('./ShippingService');
const ShiprocketProvider = require('./providers/ShiprocketProvider');

const provider = new ShiprocketProvider();
const shippingService = new ShippingService(provider);

module.exports = shippingService;
