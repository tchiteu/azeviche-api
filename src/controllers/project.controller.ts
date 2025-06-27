import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'tsyringe';
import { ProjectService } from '../services/project.service';
import { AppError } from '../errors/AppError';

@injectable()
export class ProjectController {
  constructor(@inject(ProjectService) private projectService: ProjectService) {}

  async createProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, tasks } = req.body;

      if (!name || !description) {
        throw new AppError('Os campos nome e descrição são obrigatórios', 422);
      }

      const project = await this.projectService.createProject({
        name,
        description,
        tasks,
        userId: res.locals.user.data.userId,
      });

      console.log('tamo kk')
      res.status(200).send()
      // res.status(200).json(project);
    } catch (error) {
      next(error);
    }
  }
}