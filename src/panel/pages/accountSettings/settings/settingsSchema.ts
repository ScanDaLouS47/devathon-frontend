import { z } from 'zod';
import { IUser } from '../../../../interfaces/user.interface';

export const createSettingsSchema = (user: IUser | null) =>
  z.object({
    name: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters long' })
      .max(50, { message: 'Name must be at most 50 characters long' })
      .regex(/^[A-Za-zÀ-ÖØ-öø-ÿĀ-ž' ]{3,50}$/, { message: 'Invalid name format' })
      .trim()
      .default(user?.name || ''),
    lastName: z
      .string()
      .min(3, { message: 'Last name must be at least 3 characters long' })
      .max(50, { message: 'Last name must be at most 50 characters long' })
      .regex(/^[A-Za-zÀ-ÖØ-öø-ÿĀ-ž' ]{3,50}$/, { message: 'Invalid last name format' })
      .trim()
      .default(user?.lName || ''),
    phone: z
      .string()
      .min(2, { message: 'Phone must be at least 2 character long' })
      .max(14, { message: 'Phone must be at most 14 characters long' })
      .regex(/^\+?[1-9]\d{2,14}$/, { message: 'Invalid phone format' })
      .trim()
      .default(user?.phone || ''),
    email: z
      .string()
      .email({ message: 'Invalid email' })
      .min(2, { message: 'Email must be at least 2 characters long' })
      .max(50, { message: 'Email must be at most 50 characters long' })
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,50}$/, { message: 'Invalid email format' })
      .trim()
      .default(user?.email || ''),
    file: z
      .any()
      .optional()
      .refine((files) => files instanceof FileList || files === undefined, {
        message: 'No file uploaded',
      })
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
  });

export type SettingsType = z.infer<ReturnType<typeof createSettingsSchema>>;
