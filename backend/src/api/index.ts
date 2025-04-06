import express from 'express';
import v1Router from './v1/routes.js';
import { createRateLimiter } from '../middleware/rateLimiter.js';

const apiRouter = express.Router();

// Apply rate limiting to all API routes
apiRouter.use(createRateLimiter());

apiRouter.use('/v1', v1Router);

export default apiRouter;
