import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { BookingDetails } from '../../interfaces/booking.interface';
import { createBooking, getAllBookings } from './bookinsThunk';

interface BookinsState {
  bookins: BookingDetails[];
  bookin: BookingDetails | null;
  message: string;
  people: number;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: BookinsState = {
  bookins: [],
  bookin: null,
  message: '',
  people: 0,
  loading: 'idle',
};

export const bookinsSlice = createSlice({
  name: 'bookins',
  initialState,
  reducers: {
    setPeople: (state, action) => {
      state.people = action.payload;
    },
  },

  extraReducers(builder) {
    builder.addCase(getAllBookings.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllBookings.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.bookins = action.payload;
    });

    builder.addCase(getAllBookings.rejected, (state) => {
      state.loading = 'failed';
    });

    builder.addCase(createBooking.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(createBooking.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.message = action.payload.msg;
    });
    builder.addCase(createBooking.rejected, (state) => {
      state.loading = 'failed';
    });
  },
});

export const getBookingsData = (state: RootState) => state.bookings.bookins;
export const getPoepleData = (state: RootState) => state.bookings.people;
export const getMessageData = (state: RootState) => state.bookings.message;
export const { setPeople } = bookinsSlice.actions;
