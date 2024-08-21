import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../app/store';
import { getBookingsData } from '../../features/bookins/bookinsSlice';
import { Booking } from '../../interfaces/booking.interface';

export const useBooking = (id: string) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [booking, setBooking] = useState<Booking | null>(null);

  const bookings = useSelector(getBookingsData);

  useEffect(() => {
    if (!id) return navigate(-1);
    const booking = bookings.find((booking) => booking.id === id);
    if (!booking) return navigate(-1);
    setBooking(booking);
  }, [dispatch]);

  return { booking };
};
