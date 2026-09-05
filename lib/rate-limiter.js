// ==============================================================================
// OV™ — IN-MEMORY SLIDING WINDOW RATE LIMITER & BRUTE-FORCE DEFENSE
// ==============================================================================

class RateLimiter {
  constructor(options = {}) {
    this.windowMs = options.windowMs || 15 * 60 * 1000; // 15 minutes default
    this.maxAttempts = options.maxAttempts || 5;          // 5 attempts default
    this.hits = new Map();
  }

  _cleanup() {
    const now = Date.now();
    for (const [key, record] of this.hits.entries()) {
      if (now - record.firstHit > this.windowMs) {
        this.hits.delete(key);
      }
    }
  }

  isBlocked(key) {
    this._cleanup();
    const record = this.hits.get(key);
    if (!record) return false;
    return record.count >= this.maxAttempts;
  }

  recordAttempt(key) {
    this._cleanup();
    const now = Date.now();
    let record = this.hits.get(key);
    if (!record || now - record.firstHit > this.windowMs) {
      record = { count: 1, firstHit: now };
      this.hits.set(key, record);
    } else {
      record.count += 1;
    }
    return record.count;
  }

  reset(key) {
    this.hits.delete(key);
  }

  getRemainingTimeMs(key) {
    const record = this.hits.get(key);
    if (!record) return 0;
    const elapsed = Date.now() - record.firstHit;
    return Math.max(0, this.windowMs - elapsed);
  }
}

// Global instances for auth & sensitive operations
const authLimiter = new RateLimiter({ windowMs: 15 * 60 * 1000, maxAttempts: 5 });
const orderLimiter = new RateLimiter({ windowMs: 60 * 1000, maxAttempts: 15 });

module.exports = {
  RateLimiter,
  authLimiter,
  orderLimiter
};
