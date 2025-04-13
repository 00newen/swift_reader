import express from 'express';
import { createSession, getOrCreateSession, addParticipantToSession } from './controllers/sessionController.js';
import { validateParticipantValues, validateSessionCode } from './validators/sessionValidators.js';

const v1Router = express.Router();

// Session routes
v1Router.get('/session', createSession);
v1Router.get('/sessions/:session_code', validateSessionCode, getOrCreateSession);
v1Router.post('/sessions/:session_code/participants', validateParticipantValues, addParticipantToSession);

export default v1Router;
