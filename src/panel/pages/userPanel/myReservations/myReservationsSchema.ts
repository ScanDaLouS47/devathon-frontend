import z from 'zod';

export const myReservationsSchema = z.object({
  date: z.string().optional(),
  numberOfPersons: z
    .string()
    .refine((value) => !isNaN(Number(value)), { message: 'Must be a valid number' })
    .optional(),
});

export type myReservationsType = z.infer<typeof myReservationsSchema>;
