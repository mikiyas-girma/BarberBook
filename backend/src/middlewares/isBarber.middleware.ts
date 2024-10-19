import { Request, Response, NextFunction } from 'express';
import { IBarber } from '../types/barberInterface.js';

export const isBarber = (req: Request, res: Response, next: NextFunction): void => {
  // `authMiddleware` already attaches `req.user`
  const user = req.user;

  if (!user) {
    res.status(401).json({ message: 'Unauthorized user' });
    return;
  }

  // Check if the user is an admin
if (req.userType !== 'barber') {
    res.status(403).json({ message: 'Access denied. Barbers only.' });
    return; 
}

  // User is an barber, proceed
  next();
};
