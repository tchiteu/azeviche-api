import type { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import { TokenService } from '../services/token.service';

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokenService = container.resolve(TokenService);
    const { authorization } = req.headers;
  
    if (authorization) {
      const TokenPayload = tokenService.validateAccessToken(authorization);
      res.locals.user = TokenPayload;
      next();
    }
  } catch (error) {
    console.error(error)

    res.status(401).json({
      message: 'Você deve estar autenticado para realizar essa requisição'
    });
  }

  next();
};
