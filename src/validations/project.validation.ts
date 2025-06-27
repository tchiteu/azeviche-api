import { z } from 'zod';

export const taskSchema = z.object({
  name: z.string().min(3).max(44),
  description: z.string().max(200).optional(),
  hours: z.number().min(0).max(8766),
  hourValue: z.number().optional()
})

export const projectSchema = z.object({
  name: z.string().min(3).max(44),
  description: z.string().max(200).optional(),
  tasks: z.array(taskSchema),
  userId: z.string(),
});

export type CreateProjectDTO = z.infer<typeof projectSchema>;
