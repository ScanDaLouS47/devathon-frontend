import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBookingsData } from '../../features/bookins/bookinsSlice';
import { BookingDetails } from '../../interfaces/booking.interface';
import { formatDateTime } from '../../utils/formatDateTime';

export const useBooking = (id: string) => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [dateBookingFormat, setDateBookingFormat] = useState({
    date: '',
    timeDate: '',
  });

  const bookings = useSelector(getBookingsData);

  useEffect(() => {
    if (!id) return navigate(-1);
    const booking = bookings.find((booking) => booking.id === id);
    if (!booking) return navigate(-1);

    const { formattedDate, timePart } = formatDateTime(booking.start);
    setBooking(booking);
    setDateBookingFormat({ date: formattedDate, timeDate: timePart });
  }, []);

  return { booking, dateBookingFormat };
};
