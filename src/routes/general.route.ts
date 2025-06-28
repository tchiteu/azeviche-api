import express from 'express';
import { container } from 'tsyringe';
import { UserController } from '../controllers/user.controller';

const generalRouter = express.Router();
const userController = container.resolve(UserController);

generalRouter.post('/signup', userController.createUser.bind(userController));

export default generalRouter;