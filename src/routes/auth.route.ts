import express from 'express';
import { container } from 'tsyringe';
import { AuthController } from '../controllers/auth.controller';

const authRouter = express.Router();
const authController = container.resolve(AuthController);

authRouter.post('/signin', authController.signIn.bind(authController));
authRouter.post('/verify-code', authController.verifyCode.bind(authController));
authRouter.post('/refresh-token', authController.refreshToken.bind(authController));

export default authRouter;