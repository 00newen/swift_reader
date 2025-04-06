import { pgPool } from '../../../db/index.js';
import { generateSessionCode } from '../../../utils/generateSessionCode.js';

export const createNewSession = async () => {
  let sessionCode = generateSessionCode();

  // Check if code already exists
  let result = await pgPool.query('SELECT * FROM "swift-reader_sessions" WHERE code = $1', [sessionCode]);

  // generate a new one if already exists, and repeat check
  while (result.rows.length > 0) {
    sessionCode = generateSessionCode();
    result = await pgPool.query('SELECT * FROM "swift-reader_sessions" WHERE code = $1', [sessionCode]);
  }

  const insertResult = await pgPool.query('INSERT INTO "swift-reader_sessions" (code) VALUES ($1) RETURNING id', [
    sessionCode,
  ]);

  return {
    code: sessionCode,
    id: insertResult.rows[0].id,
  };
};

export const getOrCreateSessionByCode = async (sessionCode: string) => {
  const result = await pgPool.query('SELECT id FROM "swift-reader_sessions" WHERE code = $1', [sessionCode]);

  if (result.rows.length > 0) {
    return {
      code: sessionCode,
      id: result.rows[0].id,
      exists: true,
    };
  } else {
    const insertResult = await pgPool.query('INSERT INTO "swift-reader_sessions" (code) VALUES ($1) RETURNING id', [
      sessionCode,
    ]);

    return {
      code: sessionCode,
      id: insertResult.rows[0].id,
      exists: false,
    };
  }
};
