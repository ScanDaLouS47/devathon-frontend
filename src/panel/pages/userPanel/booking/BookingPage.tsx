import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppDispatch } from '../../../../app/store';
import { CheckBox } from '../../../../components/checkBox/CheckBox';
import { getMessageData, getPoepleData } from '../../../../features/bookins/bookinsSlice';
import { createBooking } from '../../../../features/bookins/bookinsThunk';
import { formatDateTime } from '../../../../utils/formatDateTime';
import { ArrowLeftIcon } from '../../../components/icons/ArrowLeftIcon';
import { CalendarIcon } from '../../../components/icons/CalendarIcon';
import { PeopleIcon } from '../../../components/icons/PeopleIcon';
import { useBooking } from '../../../hooks/useBooking';
import './bookingPage.scss';
import { BookingSchema, createBookingSchema } from './bookingSchema';

export const BookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const people = useSelector(getPoepleData);
  const message = useSelector(getMessageData);
  const { booking } = useBooking(id!);

  const bookingSchema = createBookingSchema({
    persons: people,
    reservationDate: booking?.start || '',
    shift_id: id!,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
  });
  if (!booking) return;
  const { formattedDate, timePart } = formatDateTime(booking.start);

  const onBack = () => {
    navigate(-1);
  };
  const onHandleSubmit: SubmitHandler<BookingSchema> = async (data) => {
    const toastInfo = toast.loading('Loading...');

    await dispatch(createBooking(data));

    toast.update(toastInfo, { render: message, type: 'success', isLoading: false, autoClose: 1500 });
  };

  return (
    <section className="booking">
      <header>
        <button className="booking__btn" onClick={onBack} aria-label="button to go back">
          <ArrowLeftIcon className="booking__icon" />
          Go back
        </button>
      </header>
      <div className="booking__content">
        <span className="booking__info">
          <CalendarIcon className="booking__icon" />
          {formattedDate} - {timePart}
        </span>

        <span className="booking__info">
          <PeopleIcon className="booking__icon" />
          People:{people}
        </span>

        <form onSubmit={handleSubmit(onHandleSubmit)} className="form">
          <div>
            <label htmlFor="specialRequest">Enter a special request</label>
            <textarea className="form__area" id="special-request" {...register('additional_info')}></textarea>
          </div>
          <CheckBox
            label="I accept the conditions of use, privacy policy and legal notice"
            error={errors['conditions']}
            id="conditions"
            aria-label="I accept the conditions of use, privacy policy and legal notice"
            {...register('conditions')}
          />
          <CheckBox
            label="I consent to the processing of personal data"
            error={errors['processigData']}
            id="processigData"
            aria-label="I consent to the processing of personal data"
            {...register('processigData')}
          />
          <button className="form__btn" type="submit" aria-label="button to submit reservartion">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};
