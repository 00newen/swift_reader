import { Request, Response, NextFunction } from 'express';

export const validateSessionCode = (req: Request, res: Response, next: NextFunction) => {
  const sessionCode = req.params.session_code;

  if (!sessionCode) {
    res.status(400).json({ message: 'Session code is required' });
    return;
  }

  // Add any additional validation logic here
  // For example, check if the session code format is valid

  next();
};
