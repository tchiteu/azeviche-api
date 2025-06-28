import express from 'express';
import { container } from 'tsyringe';
import { UserController } from '../controllers/user.controller';
import { ensureAuthenticated } from '../middlewares/auth.middleware';

const userRouter = express.Router();
const userController = container.resolve(UserController);

userRouter.use(ensureAuthenticated);
userRouter.get('/my-profile', userController.myProfile.bind(userController));

export default userRouter;
