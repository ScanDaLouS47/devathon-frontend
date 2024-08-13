import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(16, { message: 'Password must be at most 16 characters long' })
      .trim(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(16, { message: 'Password must be at most 16 characters long' })
      .regex(
        /^(?!.*(.)\1{2})(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#ñç^¨~€·"'=/()¿\\n|¬{}£¥₹¢₽₿₴₩₦₡฿₴₱₫₭₲₳₲₭₳₱₦₵])[A-Za-z\d@$!%*?&#ñç^¨~€·"'=/()¿\\n|¬{}£¥₹¢₽₿₴₩₦₡฿₴₱₫₭₲₳₲₭₳₱₦₵]{8,16}$/,
        {
          message: 'Password must have 1 symbol, 1 upper, 1 lower and 1 number',
        },
      )
      .trim(),
    repeatPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(16, { message: 'Password must be at most 16 characters long' })
      .regex(
        /^(?!.*(.)\1{2})(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#ñç^¨~€·"'=/()¿\\n|¬{}£¥₹¢₽₿₴₩₦₡฿₴₱₫₭₲₳₲₭₳₱₦₵])[A-Za-z\d@$!%*?&#ñç^¨~€·"'=/()¿\\n|¬{}£¥₹¢₽₿₴₩₦₡฿₴₱₫₭₲₳₲₭₳₱₦₵]{8,16}$/,
        {
          message: 'Password must have 1 symbol, 1 upper, 1 lower and 1 number',
        },
      )
      .trim(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  });

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;
