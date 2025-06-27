import express from 'express';
import { container } from 'tsyringe';
import { ProjectController } from '../controllers/project.controller';
import { ensureAuthenticated } from '../middlewares/auth.middleware';

const projectRouter = express.Router();
const projectController = container.resolve(ProjectController);

projectRouter.use(ensureAuthenticated);
projectRouter.post('/', projectController.createProject.bind(projectController));

export default projectRouter;