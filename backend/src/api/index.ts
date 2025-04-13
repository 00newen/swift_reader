import express from 'express';
import v1Router from '@api/v1/routes.js';
import { createRateLimiter } from '@src/middleware/rateLimiter.js';

const apiRouter = express.Router();

apiRouter.use(createRateLimiter());

apiRouter.use('/v1', v1Router);

export default apiRouter;
