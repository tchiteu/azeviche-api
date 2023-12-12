import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    verify(authorization, process.env.JWT_SECRET);

    return next();
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
};
