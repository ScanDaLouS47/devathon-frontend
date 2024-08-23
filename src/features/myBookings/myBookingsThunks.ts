import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchApi } from '../../utils/fetchApi';
import { IRespBooking } from '../../interfaces';
import { ApiError } from '../../utils/apiError';

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
      console.log(reservationId);
      
      const resp = await fetchApi<IRespBooking>(`/api/v1/booking`, 'DELETE', `/${reservationId}`, null, true, true);

      console.log(resp);
      

      if (!resp.ok) {
        throw new ApiError(resp.msg || 'Failed to delete booking');
      }
      
      return reservationId;
    } catch (error) {
      return rejectWithValue(error instanceof ApiError ? error.message : 'An unexpected error occurred');
    }
  },
);
