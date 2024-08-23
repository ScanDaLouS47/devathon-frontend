import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchApi } from '../../utils/fetchApi';
import { IRespBooking } from '../../interfaces';

export const getAllMyBookingsThunks = createAsyncThunk('myBookings/get', async () => {
  const resp = await fetchApi<IRespBooking>(
    `/api/v1/mybookings2`,
    'GET',
    `?active=active`,
    null,
    true,
    true,
  );

  return resp.data;
});

export const getMyBookingsFilteredThunks = createAsyncThunk(
  'myBookingsFiltered/get',
  async ({ queryParams }: { queryParams: string }) => {
    const resp = await fetchApi<IRespBooking>(
      `/api/v1/mybookings2`,
      'GET',
      `?active=active&${queryParams}`,
      null,
      true,
      true,
    );

    return resp.data;
  },
);

export const deleteMyBookingsThunks = createAsyncThunk(
  'myBookings/delete',
  async (reservationId: number, { rejectWithValue }) => {
    try {
      const resp = await fetchApi<IRespBooking>(`/api/v1/booking`, 'DELETE', `${reservationId}`, null, true, true);

      if (!resp.ok) {
        throw new Error(resp.msg || 'Failed to delete booking');
      }

      return reservationId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  },
);
