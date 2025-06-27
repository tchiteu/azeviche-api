import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { UserService } from '../services/user.service';


@injectable()
export class UserController {
  constructor(@inject(UserService) private userService: UserService) {}

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json({ user }).send();
    } catch(error) {
      next(error);
    }
  }

  async myProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.id;
      const user = await this.userService.getUserById(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' }).send();
      }

      res.status(200).json({ user }).send();
    } catch (error) {
      next(error);
    }
  }
}
