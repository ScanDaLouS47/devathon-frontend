import { z } from 'zod';

export const bookingSchema = z.object({
  specialRequest: z.string().optional(),
  allerguies: z.boolean().refine((value) => value !== undefined),

  conditions: z.boolean().refine((value) => value !== false, { message: 'You must accept the conditions' }),
  processigData: z
    .boolean()
    .refine((value) => value !== false, { message: 'You must accept the processigData' }),
});

export type BookingSchema = z.infer<typeof bookingSchema>;
