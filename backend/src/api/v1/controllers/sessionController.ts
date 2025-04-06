import { Request, Response } from 'express';
import { createNewSession, getOrCreateSessionByCode } from '../services/sessionService.js';

export const createSession = async (req: Request, res: Response) => {
  try {
    const session = await createNewSession();

    res.status(201).json({
      message: `New session created`,
      code: session.code,
      id: session.id,
    });
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ message: 'Failed to create session' });
  }
};

export const getOrCreateSession = async (req: Request, res: Response) => {
  const sessionCode = req.params.session_code;

  try {
    const session = await getOrCreateSessionByCode(sessionCode);

    res.status(200).json({
      message: `Session ${sessionCode} ${session.exists ? 'fetched' : 'created'}`,
      code: session.code,
      id: session.id,
    });
  } catch (error) {
    console.error('Error fetching session:', error);
    res.status(500).json({ message: 'Failed to fetch session' });
  }
};
