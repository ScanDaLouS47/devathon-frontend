import { createAsyncThunk } from '@reduxjs/toolkit';
import { events } from '../../data/bookings';
import { Booking } from '../../interfaces/booking.interface';
import { asyncRequest } from '../../utils/asynRequest';

export const getAllBookings = createAsyncThunk('bookings/get', async (): Promise<Booking[]> => {
  const response = await asyncRequest<Booking>({ data: events, delay: 2000 });

  return response as Booking[];
});
