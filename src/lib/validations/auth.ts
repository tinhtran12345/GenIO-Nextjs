import * as z from 'zod';

export const authSchema = z.object({
  email: z.string().min(3).max(64),
  password: z.string().min(8).max(128),
});
