// ============================================================================
// FILE: src/lib/utils/rate-limiter.ts
// Simple IP-based rate limiting
// ============================================================================

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetAt: number;
  };
}

class RateLimiter {
  private store: RateLimitStore = {};
  private max: number;
  private windowMs: number;

  constructor(max: number = 60, windowMs: number = 60000) {
    this.max = max;
    this.windowMs = windowMs;

    // Cleanup old entries every minute
    setInterval(() => this.cleanup(), 60000);
  }

  async check(identifier: string): Promise<{
    allowed: boolean;
    remaining: number;
    resetIn: number;
  }> {
    const now = Date.now();
    const entry = this.store[identifier];

    if (!entry || now > entry.resetAt) {
      this.store[identifier] = {
        count: 1,
        resetAt: now + this.windowMs
      };
      return { allowed: true, remaining: this.max - 1, resetIn: this.windowMs };
    }

    entry.count++;

    if (entry.count > this.max) {
      return {
        allowed: false,
        remaining: 0,
        resetIn: entry.resetAt - now
      };
    }

    return {
      allowed: true,
      remaining: this.max - entry.count,
      resetIn: entry.resetAt - now
    };
  }

  private cleanup(): void {
    const now = Date.now();
    Object.keys(this.store).forEach(key => {
      if (now > this.store[key].resetAt) {
        delete this.store[key];
      }
    });
  }
}

export const rateLimiter = new RateLimiter(60, 60000); // 60 requests per minute