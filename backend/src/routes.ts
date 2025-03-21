import express from 'express';
import { generateSessionCode } from './utils/generateSessionCode';

const v1Router = express.Router();

v1Router.get('/session', (req, res) => {
  const sessionCode = generateSessionCode();
  // TODO: Check that the generated session doesn't already exist in DB.
  res.status(201).json({ message: `New session code generated`, code: sessionCode });
});
v1Router.get('/sessions/:session_code', (req, res) => {
  res.json({ message: `Fetching session ${req.params.session_code}` });
});

v1Router.post('/sessions', (req, res) => {
  const sessionCode = generateSessionCode();

  res.status(201).json({
    sessionCode,
  });
});

const router = express.Router();

router.use('/v1', v1Router);

export default router;
