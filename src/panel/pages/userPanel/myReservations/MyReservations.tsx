import styles from './myReservations.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FormInput } from '../../../../components/formInput/FormInput';
import { BookingData, IRespBooking } from '../../../../interfaces/';
import { ApiError } from '../../../../utils/apiError';
import { fetchApi } from '../../../../utils/fetchApi';
import { myReservationsType, myReservationsSchema } from './myReservationsSchema';
import { useAuth } from '../../../../auth/hook/useAuth';
import { useEffect, useState } from 'react';
import { Pagination } from '../../../../components/pagination/Pagination';

export const MyReservations = () => {
  // GET a /api/v1/mybookings/62?filter=2024-08-26&active=active&number=5

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<myReservationsType>({
    resolver: zodResolver(myReservationsSchema),
    mode: 'onChange',
  });

  const { authState } = useAuth();
  const [dataBookings, setDataBookings] = useState<BookingData[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    (async () => {
      await fetchApi<IRespBooking>(`/api/v1/mybookings`, 'GET', `${authState.user?.id}`, null, true, true)
        .then((r) => setDataBookings(r.data))
        .catch((e) => console.error(e));
    })();
  }, [authState.user?.id]);

  const handleMyBookings: SubmitHandler<myReservationsType> = async (data) => {
    const queryParamsFilter = data.date ? `filter=${data.date}` : '';
    const queryParamsPersons = data.numberOfPersons ? `persons=${data.numberOfPersons}` : '';
    const toastInfo = toast.loading('Loading...');
    try {
      const myBookingsResp = await fetchApi<IRespBooking>(
        `/api/v1/mybookings`,
        'GET',
        `${authState.user?.id}?${queryParamsFilter}&${queryParamsPersons}`,
        null,
        true,
        true,
      );

      if (!myBookingsResp.ok) {
        throw new ApiError(myBookingsResp.msg);
      }

      if (myBookingsResp.data) {
        toast.update(toastInfo, {
          render: myBookingsResp.msg,
          type: 'success',
          isLoading: false,
          autoClose: 1500,
        });
      }

      console.log('ON MY BACKEND', myBookingsResp);
      setDataBookings(myBookingsResp.data);
    } catch (error) {
      if (error instanceof ApiError) {
        toast.update(toastInfo, { render: error.message, type: 'error', isLoading: false, autoClose: 3000 });
        console.error('Updating error:', error.message);
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const actualIndex = (currentPage - 1) * itemsPerPage;
  const selectedItemsToView = dataBookings?.slice(actualIndex, actualIndex + itemsPerPage);

  return (
    <div className={styles.myReservations}>
      <div className={styles.myReservations__container}>
        <h1 className={styles.myReservations__title}>My Reservations</h1>

        <form className={styles.form} onSubmit={handleSubmit(handleMyBookings)}>
          <FormInput
            label="Date"
            error={errors['date']}
            id="reservation-date"
            type="date"
            {...register('date')}
          />
          <FormInput
            label="Number of persons"
            error={errors['numberOfPersons']}
            id="number-of-persons"
            type="text"
            {...register('numberOfPersons')}
          />
          <div className={styles.form__btnContainer}>
            <button className={styles.form__btn} type="submit">
              Search
            </button>
          </div>
        </form>
        <table className={styles.table}>
          <thead>
            <tr className={styles.table__tr}>
              <th>ID</th>
              <th>TURNOS</th>
              <th>FECHA</th>
              {/* <th>STATUS</th> */}
            </tr>
          </thead>
          <tbody>
            {selectedItemsToView &&
              selectedItemsToView.map((e, i) => {
                return (
                  <tr key={i} className={styles.table__tr}>
                    <td>{e.id}</td>
                    <td>{e.shift}</td>
                    <td>{String(e.reservationDate)}</td>
                    {/* <td>{e.status}</td> */}
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Pagination
          totalItems={dataBookings ? dataBookings.length : 0}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
