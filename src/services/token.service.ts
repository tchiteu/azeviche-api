import { inject, injectable } from 'tsyringe';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { DateTime } from 'luxon';
import { AppError } from '../errors/AppError';

export interface TokenPayload {
  data: { userId: string, email: string },
  iat: number,
  exp: number
}

@injectable()
export class TokenService {
  constructor(
    @inject('accessSecret') private accessSecret: string,
    @inject('refreshSecret') private refreshSecret: string,
    @inject('PrismaClient') private prisma: PrismaClient
  ) {}

  generateAccessToken(data: TokenPayload['data']): string {
    try {
      return jwt.sign({ data }, this.accessSecret, { expiresIn: '1h' });
    } catch (error) {
      throw new AppError('Erro ao gerar token de acesso.', 400);
    }
  }

  validateAccessToken(token: string): TokenPayload {
    try {
      const payload = jwt.verify(token, this.accessSecret) as TokenPayload;

      return payload;
    } catch (error) {
      throw new AppError('Token inválido ou expirado.', 401);
    }
  }

  async generateRefreshToken(data: TokenPayload['data']): Promise<string> {
    try {
      const { userId } = data;
      const token = jwt.sign({ data }, this.refreshSecret, { expiresIn: '6m' });
      const expiresAt = DateTime.now().plus({ months: 6 }).toJSDate();

      await this.prisma.refreshToken.updateMany({
        where: { userId },
        data: { revoked: true }
      });

      await this.prisma.refreshToken.create({ data: { token, expiresAt, userId } });

      return token;
    } catch (error) {
      throw new AppError('Erro ao gerar token de refresh.', 400);
    }
  }

  async validateRefreshToken(token: string): Promise<JwtPayload | string> {
    try {
      const payload = jwt.verify(token, this.refreshSecret);
      const storedRefreshToken = await this.prisma.refreshToken.findUnique({
        where: {
          token,
          revoked: false
        }
      });
  
      if (!storedRefreshToken) {
        throw new Error();
      }

      return payload;
    } catch (error) {
      throw new AppError('Token de refresh inválido ou expirado.', 401);
    }
  }
}