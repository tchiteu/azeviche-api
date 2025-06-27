import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3).max(200),
});

export type CreateUserDTO = z.infer<typeof userSchema>;
