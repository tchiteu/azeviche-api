import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { AuthService } from '../services/auth.service';
import { AppError } from '../errors/AppError';

@injectable()
export class AuthController {
  constructor(@inject(AuthService) private authService: AuthService) {}

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
  
      if (!email) {
        throw new AppError('O campo e-mail não foi informado', 422);
      }
  
      const result = await this.authService.generateSignInCode(email);
  
      res.status(201).json({
        message: 'Código de verificação enviado por e-mail',
        userId: result.userId,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, code } = req.body;
  
      if (!userId || !code) {
        throw new AppError('Os campos userId e code são obrigatórios', 422);
      }
  
      const tokenResponse = await this.authService.verifyCode(userId, code);
  
      res.status(200).json(tokenResponse);
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const refreshedAccessToken = await this.authService.refreshAccessToken(refreshToken);

      res.status(200).json({ token: refreshedAccessToken }).send();
    } catch (error) {
      next(error);
    }
  }
}