import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppDispatch } from '../../../../app/store';
import { CheckBox } from '../../../../components/checkBox/CheckBox';
import { getMessageData, getPoepleData } from '../../../../features/bookins/bookinsSlice';
import { createBooking } from '../../../../features/bookins/bookinsThunk';
import { ArrowLeftIcon, CalendarIcon, PeopleIcon } from '../../../components/icons';
import { useBooking } from '../../../hooks/useBooking';
import './bookingPage.scss';
import { BookingSchema, createBookingSchema } from './bookingSchema';

export const BookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const persons = useSelector(getPoepleData);
  const message = useSelector(getMessageData);
  const { booking, dateBookingFormat } = useBooking(id!);

  const bookingSchema = createBookingSchema({
    persons,
    reservationDate: booking?.start || '',
    shift_id: booking?.title.slice(6) || '',
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      additional_info: 'no additional info',
    },
  });

  const onBack = () => {
    navigate(-1);
  };
  const onHandleSubmit: SubmitHandler<BookingSchema> = async (data) => {
    const toastInfo = toast.loading('Loading...');

    await dispatch(createBooking(data));

    toast.update(toastInfo, {
      render: 'Reservation do it',
      type: 'success',
      isLoading: false,
      autoClose: 1500,
    });
    navigate(-1);
  };

  return (
    <section className="booking">
      <header>
        <button className="booking__btn" onClick={onBack} aria-label="Go back">
          <ArrowLeftIcon className="booking__icon" />
          Go back
        </button>
      </header>
      <div className="booking__content">
        <span className="booking__info">
          <CalendarIcon className="booking__icon" />
          {dateBookingFormat.date} - {dateBookingFormat.timeDate}
        </span>

        <span className="booking__info">
          <PeopleIcon className="booking__icon" />
          {persons}
        </span>

        <form onSubmit={handleSubmit(onHandleSubmit)} className="form">
          <div>
            <label htmlFor="specialRequest">Enter a special request:</label>
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
