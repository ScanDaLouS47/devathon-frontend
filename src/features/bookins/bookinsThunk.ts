import { createAsyncThunk } from '@reduxjs/toolkit';
import { BookingDetails, IRespDetailsForCalendar } from '../../interfaces/booking.interface';
import { IBookingCreate } from '../../interfaces/bookingCreate.interface';
import { CreateBooking } from '../../panel/pages/userPanel/booking/bookingSchema';
import { fetchApiV2 } from '../../utils/fetchApiV2';

export const getAllBookings = createAsyncThunk('bookings/get', async (): Promise<BookingDetails[]> => {
  const response = await fetchApiV2<IRespDetailsForCalendar>(
    '/api/v1/detail_booking?date=2024-08-12&persons=10',
    'GET',
    null,
    true,
    true,
  );

  return response.data;
});

export const createBooking = createAsyncThunk(
  'bookings/post',
  async (data: CreateBooking): Promise<IBookingCreate> => {
    const response = await fetchApiV2<IBookingCreate>('/api/v1/booking', 'POST', data, true, true);
    console.log('ON MY BACKEND', response);

    return response;
  },
);
