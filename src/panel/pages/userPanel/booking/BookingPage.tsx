import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckBox } from '../../../../components/checkBox/CheckBox';
import { getPoepleData } from '../../../../features/bookins/bookinsSlice';
import { formatDateTime } from '../../../../utils/formatDateTime';
import { ArrowLeftIcon } from '../../../components/icons/ArrowLeftIcon';
import { CalendarIcon } from '../../../components/icons/CalendarIcon';
import { PeopleIcon } from '../../../components/icons/PeopleIcon';
import { useBooking } from '../../../hooks/useBooking';
import './bookingPage.scss';
import { bookingSchema, BookingSchema } from './bookingSchema';

export const BookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const people = useSelector(getPoepleData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
  });

  const { booking } = useBooking(id!);
  if (!booking) return;
  const { formattedDate, timePart } = formatDateTime(booking.start);

  const onBack = () => {
    navigate(-1);
  };
  const onHandleSubmit: SubmitHandler<BookingSchema> = async (data) => {
    console.log(data);
  };

  return (
    <section className="booking">
      <header>
        <button onClick={onBack} aria-label="button to go back">
          <ArrowLeftIcon className="booking__icon" />
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
            <label htmlFor="special-request">Enter a specual request</label>
            <textarea className="form__area" name="special-request" id="special-request"></textarea>
          </div>
          <CheckBox
            label="I accept the conditions of use, privacy policy and legal notice"
            error={errors['conditions']}
            id="conditions"
            aria-label="I accept the conditions of use, privacy policy and legal notice"
            {...register('conditions')}
          />
          <CheckBox
            label="I consent to the processinf of personal data"
            error={errors['processigData']}
            id="processigData"
            aria-label="I consent to the processinf of personal data"
            {...register('processigData')}
          />
          <button type="submit" aria-label="button to submit reservartion">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};
