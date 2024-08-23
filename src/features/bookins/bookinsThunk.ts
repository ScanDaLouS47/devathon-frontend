import { createAsyncThunk } from '@reduxjs/toolkit';
import { BookingDetails, IRespDetailsForCalendar } from '../../interfaces/booking.interface';
import { IBookingCreate } from '../../interfaces/bookingCreate.interface';
import { CreateBooking } from '../../panel/pages/userPanel/booking/bookingSchema';
import { fetchApiV2 } from '../../utils/fetchApiV2';
type GetAllBookingsType = {
  date?: string | null;
  totalPersons?: number | null;
};

export const getAllBookings = createAsyncThunk(
  'bookings/get',
  async ({ date, totalPersons = 2 }: GetAllBookingsType): Promise<BookingDetails[]> => {
    const currentMonth = date ? date : new Date().toISOString().slice(0, 7);

    const response = await fetchApiV2<IRespDetailsForCalendar, null>(
      `/api/v1/detail_booking?date=${currentMonth}&persons=${totalPersons}`,
      'GET',
      null,
      true,
      true,
    );

    return response.data;
  },
);



export const createBooking = createAsyncThunk(
  'bookings/post',
  async (data: CreateBooking): Promise<IBookingCreate> => {
    const response = await fetchApiV2<IBookingCreate, CreateBooking>(
      '/api/v1/booking',
      'POST',
      data,
      true,
      true,
    );
    return response;
  },
);
