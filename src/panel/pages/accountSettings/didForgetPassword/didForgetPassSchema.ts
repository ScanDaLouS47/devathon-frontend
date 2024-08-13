import { z } from 'zod';

export const forgotPassSchema = z.object({
  contactEmail: z
    .string()
    .email({ message: 'Invalid email' })
    .min(2, { message: 'Email must be at least 2 characters long' })
    .max(50, { message: 'Email must be at most 50 characters long' })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,50}$/, { message: 'Invalid email format' })
    .trim(),
});

export type ForgotPassType = z.infer<typeof forgotPassSchema>;
