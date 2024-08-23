import { z } from 'zod';

export type CreateBooking = {
  reservationDate: string;
  persons: number;
  shift_id: string;
  additional_info?: string;
};

export const createBookingSchema = ({ persons, reservationDate, shift_id }: CreateBooking) =>
  z.object({
    additional_info: z.string(),
    reservationDate: z.string().min(1, { message: 'Reservation date is required' }).default(reservationDate),
    persons: z.number().int().min(1, { message: 'You must select at least one person' }).default(persons),
    shift_id: z.string().min(1, { message: 'Shift is required' }).default(shift_id),
    conditions: z.boolean().refine((value) => value !== false, { message: 'You must accept the conditions' }),
    processigData: z
      .boolean()
      .refine((value) => value !== false, { message: 'You must accept the processigData' }),
  });

export type BookingSchema = z.infer<ReturnType<typeof createBookingSchema>>;
