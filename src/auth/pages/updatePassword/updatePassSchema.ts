import { z } from 'zod';

export const updatePassSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(16, { message: 'Password must be at most 16 characters long' })
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#ñç^¨])[A-Za-z\d@$!%*?&#ñç^¨]{8,16}$/, {
        message: 'Password must have 1 symbol, 1 uppercase, and 1 number',
      })
      .trim(),
    repeatNewPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(16, { message: 'Password must be at most 16 characters long' })
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#ñç^¨])[A-Za-z\d@$!%*?&#ñç^¨]{8,16}$/, {
        message: 'Password must have 1 symbol, 1 uppercase, and 1 number',
      })
      .trim(),
  })
  .refine((data) => data.newPassword === data.repeatNewPassword, {
    message: 'Passwords do not match',
    path: ['repeatNewPassword'],
  });

export type UpdatePassType = z.infer<typeof updatePassSchema>;
