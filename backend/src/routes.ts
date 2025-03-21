import express from 'express';
import { generateSessionCode } from './utils';

const v1Router = express.Router();

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
