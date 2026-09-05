// ==============================================================================
// OV™ — SHIPPING SERVICE (Provider-Agnostic Interface)
// ==============================================================================

class ShippingService {
  constructor(provider) {
    this.provider = provider;
  }

  setProvider(provider) {
    this.provider = provider;
  }

  async checkServiceability(params) {
    return this.provider.checkServiceability(params);
  }

  async createShipment(orderData) {
    return this.provider.createShipment(orderData);
  }

  async assignAWB(shipmentId, courierId) {
    return this.provider.assignAWB(shipmentId, courierId);
  }

  async schedulePickup(shipmentId, pickupDate) {
    return this.provider.schedulePickup(shipmentId, pickupDate);
  }

  async generateLabel(shipmentId) {
    return this.provider.generateLabel(shipmentId);
  }

  async trackShipment(awbCode) {
    return this.provider.trackShipment(awbCode);
  }

  async cancelShipment(shipmentId) {
    return this.provider.cancelShipment(shipmentId);
  }

  async createReturnShipment(params) {
    return this.provider.createReturnShipment(params);
  }

  async handleNDR(params) {
    return this.provider.handleNDR(params);
  }

  verifyWebhook(req) {
    return this.provider.verifyWebhook(req);
  }
}

module.exports = ShippingService;
