import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }).trim(),
    lastName: z.string().min(1, { message: 'Last Name is required' }).trim(),
    email: z.string().email({ message: 'Invalid email' }).min(1, { message: 'Email is required' }).trim(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }).trim(),
    repeatPassword: z.string().min(8, { message: 'Password must be at least 8 characters long' }).trim(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  });


export const passwordSchema = z.object({
})

export type RegisterType = z.infer<typeof registerSchema>;
