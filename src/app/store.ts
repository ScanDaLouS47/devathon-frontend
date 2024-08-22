import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { bookinsSlice } from '../features/bookins/bookinsSlice';

export const store = configureStore({
  reducer: {
    bookings: bookinsSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
