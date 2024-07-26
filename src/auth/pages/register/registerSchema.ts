import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters long' })
      .max(50, { message: 'Name must be at most 50 characters long' })
      .regex(/^[A-Za-zÁÉÍÓÚÑäëïöüñ'-]+$/, { message: 'Invalid name format' })
      .trim(),
    lastName: z
      .string()
      .min(3, { message: 'Last name must be at least 3 characters long' })
      .max(50, { message: 'Last name must be at most 50 characters long' })
      .regex(/^[A-Za-zÁÉÍÓÚÑäëïöüñ'-]+$/, { message: 'Invalid last name format' })
      .trim(),
    phone: z
      .string()
      .min(1, { message: 'Phone must be at least 1 characters long' })
      .max(14, { message: 'Phone must be at most 14 characters long' })
      .regex(/^\+?[1-9]\d$/, 'Invalid phone format')
      .trim(),
    email: z
      .string()
      .email({ message: 'Invalid email' })
      .min(2, { message: 'Phone must be at least 2 characters long' })
      .max(50, { message: 'Phone must be at most 50 characters long' })
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {})
      .trim(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(16, { message: 'Password must be at most 16 characters long' })
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$/, {
        message: 'Password must have 1 symbol, 1 uppercase, 1 number',
      })
      .trim(),
    repeatPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .min(16, { message: 'Password must be at most 16 characters long' })
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$/, {
        message: 'Password must have 1 symbol, 1 uppercase, 1 number',
      })
      .trim(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  });

export const passwordSchema = z.object({});

export type RegisterType = z.infer<typeof registerSchema>;
