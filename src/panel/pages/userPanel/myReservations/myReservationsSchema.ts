import z from 'zod';

export const myReservationsSchema = z.object({
  date: z.string().optional(),
  numberOfPersons: z.string().optional(),
  // reservationNumber: z
  //   .string()
  //   .min(1, { message: 'Must be at least 3 characters long' })
  //   .max(10, { message: 'Must be at most 10 characters long' })
  //   // .regex(/^#[a-zA-Z0-9]{3,10}$/, { message: 'Invalid format' })
  //   .trim(),
});

export type myReservationsType = z.infer<typeof myReservationsSchema>;
