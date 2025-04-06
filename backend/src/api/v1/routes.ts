import express from 'express';
import { createSession, getOrCreateSession } from './controllers/sessionController.js';
import { validateSessionCode } from './validators/sessionValidators.js';

const v1Router = express.Router();

// Session routes
v1Router.get('/session', createSession);
v1Router.get('/sessions/:session_code', validateSessionCode, getOrCreateSession);

export default v1Router;
