import { Store, ClientRateLimitInfo } from 'express-rate-limit';
import { pgPool } from '../db/index.js';

export class PostgresStore implements Store {
  async init(): Promise<void> {
    // No initialization needed
  }

  async increment(key: string): Promise<ClientRateLimitInfo> {
    const now = new Date();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const max = 100; // max 100 requests per windowMs
    const expire = new Date(now.getTime() + windowMs);

    // Try to insert or update the rate limit record
    const result = await pgPool.query(
      `INSERT INTO "swift-reader_rate_limits" (key, points, expire)
       VALUES ($1, 1, $2)
       ON CONFLICT (key) DO UPDATE
       SET points = CASE
         WHEN "swift-reader_rate_limits".expire < $2 THEN 1
         ELSE "swift-reader_rate_limits".points + 1
       END,
       expire = CASE
         WHEN "swift-reader_rate_limits".expire < $2 THEN $2
         ELSE "swift-reader_rate_limits".expire
       END
       RETURNING points, expire`,
      [key, expire]
    );

    const { points, expire: resetTime } = result.rows[0];

    return {
      totalHits: points,
      resetTime: resetTime,
    };
  }

  async decrement(key: string): Promise<void> {
    await pgPool.query('UPDATE "swift-reader_rate_limits" SET points = GREATEST(points - 1, 0) WHERE key = $1', [key]);
  }

  async resetKey(key: string): Promise<void> {
    await pgPool.query('DELETE FROM "swift-reader_rate_limits" WHERE key = $1', [key]);
  }
}
