import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Booking } from '../../interfaces/booking.interface';
import { getAllBookings } from './bookinsThunk';

interface BookinsState {
  bookins: Booking[];
  bookin: Booking | null;
  people: number;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: BookinsState = {
  bookins: [],
  bookin: null,
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
  },
});

export const getBookingsData = (state: RootState) => state.bookings.bookins;
export const getPoepleData = (state: RootState) => state.bookings.people;
export const { setPeople } = bookinsSlice.actions;
