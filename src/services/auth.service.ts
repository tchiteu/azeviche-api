import { PrismaClient, User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { DateTime } from 'luxon';
import { ApiResult } from '../types/result.type';
import { TokenService } from './token.service';
import { AppError } from '../errors/AppError';

export interface SignInResponse {
  userId: string
}

export interface TokenResponse {
  token: string
  refreshToken: string
}

@injectable()
export class AuthService {
  constructor(
    @inject('PrismaClient') private prisma: PrismaClient,
    @inject(TokenService) private tokenService: TokenService
  ) {}

  async generateSignInCode(email: string): Promise<ApiResult<SignInResponse>> {
    const code = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const expiresAt = DateTime.now().plus({ minutes: 15 }).toJSDate();

    await this.prisma.authCode.create({
      data: {
        code,
        email,
        userId: user.id,
        expiresAt
      }
    })

    return {
      success: true,
      message: 'Código gerado com sucesso.',
      data: {
        userId: user.id,
      },
      status: 201
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    const payload = await this.tokenService.validateRefreshToken(refreshToken);

    if (!payload || typeof payload !== 'object' || !payload.data.userId || !payload.data.email) {
      throw new AppError('Payload do refresh token inválido.', 401);
    }

    const newAccessToken = this.tokenService.generateAccessToken({
      userId: payload.data.userId,
      email: payload.data.email,
    });

    return newAccessToken;
  }

  async verifyCode(userId: string, code: string): Promise<TokenResponse> {
    const authCode = await this.prisma.authCode.findFirst({
      where: {
        userId,
        code,
        expiresAt: { gte: new Date() },
      },
    });

    if (!authCode) {
      throw new AppError('Código inválido ou expirado.', 400);
    }

    await this.prisma.authCode.delete({
      where: { id: authCode.id },
    });

    const user = await this.prisma.user.findUnique({ where: { id: userId }});
    if (!user) {
      throw new AppError('Usuário não encontrado.',  404);
    }

    const userData = {
      userId: user.id,
      email: user.email
    };

    const token = this.tokenService.generateAccessToken(userData);
    const refreshToken = await this.tokenService.generateRefreshToken(userData);

    return { token, refreshToken };
  }

  async signOut() {

  }
}