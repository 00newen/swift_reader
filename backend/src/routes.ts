import express, { Request, Response } from 'express';
import { generateSessionCode } from './utils/generateSessionCode.js';
import { db, pgPool } from './db/index.js';
import { sessions } from './db/schema.js';

const v1Router = express.Router();

v1Router.get('/session', async (req: Request, res: Response) => {
  try {
    // Generate a unique session code
    let sessionCode = generateSessionCode();

    // Check if the code already exists using raw SQL
    let result = await pgPool.query('SELECT * FROM "swift-reader_sessions" WHERE code = $1', [sessionCode]);

    // If the code already exists, generate a new one and check again
    while (result.rows.length > 0) {
      sessionCode = generateSessionCode();
      result = await pgPool.query('SELECT * FROM "swift-reader_sessions" WHERE code = $1', [sessionCode]);
    }

    // Create a new session in the database using raw SQL
    const insertResult = await pgPool.query('INSERT INTO "swift-reader_sessions" (code) VALUES ($1) RETURNING id', [
      sessionCode,
    ]);

    const sessionId = insertResult.rows[0].id;

    res.status(201).json({
      message: `New session created`,
      code: sessionCode,
      id: sessionId,
    });
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ message: 'Failed to create session' });
  }
});

v1Router.get('/sessions/:session_code', (req: Request, res: Response) => {
  res.json({ message: `Fetching session ${req.params.session_code}` });
});

// v1Router.post('/sessions', (req: Request, res: Response) => {
//   const sessionCode = generateSessionCode();

//   res.status(201).json({
//     sessionCode,
//   });
// });

const router = express.Router();

router.use('/v1', v1Router);

export default router;
