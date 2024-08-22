import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { BookingData } from '../../interfaces';
import {
  deleteMyBookingsThunks,
  getAllMyBookingsThunks,
  getMyBookingsFilteredThunks,
} from './myBookingsThunks';

interface MyBookingState {
  myBookings: BookingData[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MyBookingState = {
  myBookings: [],
  status: 'idle',
  error: null,
};

export const myBookingsSlice = createSlice({
  name: 'myBookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMyBookingsThunks.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(getAllMyBookingsThunks.fulfilled, (state, action: PayloadAction<BookingData[]>) => {
        state.status = 'succeeded';
        state.myBookings = action.payload;
        state.error = null;
      })
      .addCase(getAllMyBookingsThunks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch bookings';
      })
      .addCase(getMyBookingsFilteredThunks.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(getMyBookingsFilteredThunks.fulfilled, (state, action: PayloadAction<BookingData[]>) => {
        state.status = 'succeeded';
        state.myBookings = action.payload;
        state.error = null;
      })
      .addCase(getMyBookingsFilteredThunks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to filter bookings';
      })
      .addCase(deleteMyBookingsThunks.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(deleteMyBookingsThunks.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = 'succeeded';
        state.myBookings = state.myBookings.filter((booking) => booking.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteMyBookingsThunks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete booking';
      });
  },
});

export const getMyBookingsData = (state: RootState) => state.myBookings.myBookings;
export const getMyBookingsStatus = (state: RootState) => state.myBookings.status;
export const getMyBookingsError = (state: RootState) => state.myBookings.error;

export default myBookingsSlice.reducer;
