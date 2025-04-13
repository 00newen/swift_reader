import { pgPool } from '@src/db/index.js';
import { generateSessionCode } from '@src/utils/generateSessionCode.js';

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

  const participants = await pgPool.query('SELECT * FROM "swift-reader_participants" WHERE session_id = $1', [
    result.rows[0].id,
  ]);

  if (result.rows.length > 0) {
    return {
      code: sessionCode,
      id: result.rows[0].id,
      exists: true,
      participants: participants.rows,
    };
  } else {
    const insertResult = await pgPool.query('INSERT INTO "swift-reader_sessions" (code) VALUES ($1) RETURNING id', [
      sessionCode,
    ]);

    return {
      code: sessionCode,
      id: insertResult.rows[0].id,
      exists: false,
      participants: participants.rows,
    };
  }
};

export const createParticipantForSession = async (sessionCode: string, name: string, theme: string) => {
  const sessionResult = await pgPool.query('SELECT id FROM "swift-reader_sessions" WHERE code = $1', [sessionCode]);

  if (sessionResult.rows.length === 0) {
    return {
      code: sessionCode,
      error: 'session-not-found',
    };
  }
  const sessionId = sessionResult.rows[0].id;

  const participantExistsResult = await pgPool.query(
    'SELECT * FROM "swift-reader_participants" WHERE session_id = $1 AND name = $2',
    [sessionId, name]
  );

  if (participantExistsResult.rows.length > 0) {
    return {
      code: sessionCode,
      name: name,
      error: 'participant-already-exists',
    };
  }
  const participantResult = await pgPool.query(
    'INSERT INTO "swift-reader_participants" (session_id, name, theme) VALUES ($1, $2, $3) RETURNING id',
    [sessionId, name, theme]
  );

  if (participantResult.rows.length > 0) {
    return {
      code: sessionCode,
      id: participantResult.rows[0].id,
      exists: true,
    };
  } else {
    return {
      code: sessionCode,
      error: 'participant-not-added',
      name: name,
    };
  }
};
