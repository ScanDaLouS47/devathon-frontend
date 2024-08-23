import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchApi } from '../../utils/fetchApi';
import { IRespBooking } from '../../interfaces';

export const getAllMyBookingsThunks = createAsyncThunk('myBookings/get', async (id: number | undefined) => {
  const resp = await fetchApi<IRespBooking>(
    `/api/v1/mybookings`,
    'GET',
    `${id}?active=active`,
    null,
    true,
    true,
  );

  return resp.data;
});

export const getMyBookingsFilteredThunks = createAsyncThunk(
  'myBookingsFiltered/get',
  async ({ userId, queryParams }: { userId: number | undefined; queryParams: string }) => {
    const resp = await fetchApi<IRespBooking>(
      `/api/v1/mybookings`,
      'GET',
      `${userId}?active=active&${queryParams}`,
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
