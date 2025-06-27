import { PrismaClient, Project } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { CreateProjectDTO, projectSchema } from '../validations/project.validation';

@injectable()
export class ProjectService {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

  async createProject(data: CreateProjectDTO): Promise<Project> {
    const validatedData = projectSchema.parse(data);

    const project = await this.prisma.project.create({
      data: {
        ...validatedData,
        tasks: validatedData.tasks ? {
          create: validatedData.tasks,
        } : undefined,
      }
    });

    return project;
  }
}