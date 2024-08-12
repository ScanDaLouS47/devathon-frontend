import { z } from 'zod';

export const settingsSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters long' })
      .max(50, { message: 'Name must be at most 50 characters long' })
      .regex(/^[A-Za-zÀ-ÖØ-öø-ÿĀ-ž' ]{3,50}$/, { message: 'Invalid name format' })
      .trim(),
    lastName: z
      .string()
      .min(3, { message: 'Last name must be at least 3 characters long' })
      .max(50, { message: 'Last name must be at most 50 characters long' })
      .regex(/^[A-Za-zÀ-ÖØ-öø-ÿĀ-ž' ]{3,50}$/, { message: 'Invalid last name format' })
      .trim(),
    phone: z
      .string()
      .min(2, { message: 'Phone must be at least 2 character long' })
      .max(14, { message: 'Phone must be at most 14 characters long' })
      .regex(/^\+?[1-9]\d{2,14}$/, { message: 'Invalid phone format' })
      .trim(),
    email: z
      .string()
      .email({ message: 'Invalid email' })
      .min(2, { message: 'Email must be at least 2 characters long' })
      .max(50, { message: 'Email must be at most 50 characters long' })
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,50}$/, { message: 'Invalid email format' })
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
    file: z
      .instanceof(FileList)
      .optional()
      .refine((files) => !files || files.length === 0 || files[0].size <= 5 * 1024 * 1024, {
        message: 'The file must be at most 5MB',
      })
      .refine(
        (files) =>
          !files || files.length === 0 || ['image/jpeg', 'image/jpg', 'image/png'].includes(files[0].type),
        {
          message: 'The file must be JPEG, JPG or PNG',
        },
      ),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  });

export type SettingsType = z.infer<typeof settingsSchema>;
