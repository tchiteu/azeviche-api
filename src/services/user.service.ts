import { PrismaClient, User } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import { ApiResult } from '../types/result.type';
import { CreateUserDTO, userSchema } from '../validations/user.validation';
import { AppError } from '../errors/AppError';

@injectable()
export class UserService {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

  async createUser(data: CreateUserDTO): Promise<User> {
    const validatedData = userSchema.strict().parse(data);

    const alreadyRegistered = await this.prisma.user.findUnique({
      where: { email: data.email }
    });

    if (!!alreadyRegistered) {
      throw new AppError('Usuário já registrado', 409);
    }

    const user = await this.prisma.user.create({
      data: validatedData,
    });

    return user;
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user;
  }

  async updateUser(id: string, data: Partial<CreateUserDTO>): Promise<User> {
    const updateUserSchema = userSchema.partial();
    const validatedData = updateUserSchema.parse(data);

    const user = await this.prisma.user.update({
      where: { id },
      data: validatedData,
    });

    return user;
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.prisma.user.delete({
      where: { id },
    });

    return user;
  }
}
