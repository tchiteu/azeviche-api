import 'reflect-metadata';
import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { ProjectService } from '../services/project.service';
import { ProjectController } from '../controllers/project.controller';

const prisma = new PrismaClient();

container.register<PrismaClient>('PrismaClient', { useValue: prisma });
container.register('accessSecret', { useValue: process.env.ACCESS_TOKEN_SECRET });
container.register('refreshSecret', { useValue: process.env.REFRESH_TOKEN_SECRET });

container.registerSingleton(TokenService);

container.registerSingleton(AuthService);
container.registerSingleton(AuthController);

container.registerSingleton(ProjectService);
container.registerSingleton(ProjectController);

container.registerSingleton(UserService);
container.registerSingleton(UserController);
