import z from 'zod';

export const myReservationsSchema = z.object({
  date: z.string().optional(),
  numberOfPersons: z.string().optional(),
});

export type myReservationsType = z.infer<typeof myReservationsSchema>;
