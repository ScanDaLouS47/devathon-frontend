import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AppDispatch } from '../../../../app/store';
import { useAuth } from '../../../../auth/hook/useAuth';
import { FormInput } from '../../../../components/formInput/FormInput';
import { getMyBookingsData } from '../../../../features/myBookings/myBookingsSlice';
import {
  deleteMyBookingsThunks,
  getAllMyBookingsThunks,
  getMyBookingsFilteredThunks,
} from '../../../../features/myBookings/myBookingsThunks';
import { ApiError } from '../../../../utils/apiError';
import { TrashIcon } from '../../../components/icons/TrashIcon';
import { GenerateEmptyRows } from '../../../components/pagination/giveEmptyRows/GenerateEmptyRows';
import { Pagination } from '../../../components/pagination/Pagination';
import styles from './myReservations.module.scss';
import { myReservationsSchema, myReservationsType } from './myReservationsSchema';

export const MyReservations = () => {
  // GET a /api/v1/mybookings/62?filter=2024-08-26&active=active&number=5

  const { authState } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const myBookings = useSelector(getMyBookingsData);
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const actualIndex = (currentPage - 1) * itemsPerPage;
  const handlePageChange = (page: number) => setCurrentPage(page);
  const selectedItemsToView = myBookings?.slice(actualIndex, actualIndex + itemsPerPage);
  const emptyRowsCount = selectedItemsToView ? itemsPerPage - selectedItemsToView.length : itemsPerPage;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<myReservationsType>({
    resolver: zodResolver(myReservationsSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    dispatch(getAllMyBookingsThunks(authState.user?.id));
  }, [authState.user?.id, dispatch]);

  const handleMyBookings: SubmitHandler<myReservationsType> = async (data) => {
    const queryParamsFilters = new URLSearchParams();
    data.date ? queryParamsFilters.append('filter', data.date) : null;
    data.numberOfPersons ? queryParamsFilters.append('persons', data.numberOfPersons) : null;
    const queryParams = queryParamsFilters.toString();
    const toastInfo = toast.loading('Loading...');
    const id = authState.user?.id;

    try {
      const response = await dispatch(getMyBookingsFilteredThunks({ id, queryParams })).unwrap();
      console.log(response);

      if (response.length !== 1) {
        throw new ApiError('Fail to found reservation');
      } else {
        toast.update(toastInfo, {
          render: 'Reservation found',
          type: 'success',
          isLoading: false,
          autoClose: 1500,
        });
      }
    } catch (error) {
      if (error instanceof ApiError) {
        toast.update(toastInfo, { render: error.message, type: 'error', isLoading: false, autoClose: 3000 });
        console.error('Filter error:', error.message);
      }
    }
  };

  const handleDeleteBooking = async (tableId: number) => {
    const toastInfo = toast.loading('Loading...');
    try {
      const response = await dispatch(deleteMyBookingsThunks(tableId)).unwrap();

      if (isNaN(response)) {
        throw new ApiError('Fail to delete reservation');
      } else {
        toast.update(toastInfo, {
          render: 'Reservation deleted successfully',
          type: 'success',
          isLoading: false,
          autoClose: 1500,
        });
      }
      await dispatch(getAllMyBookingsThunks(authState.user?.id));
    } catch (error) {
      if (error instanceof ApiError) {
        toast.update(toastInfo, { render: error.message, type: 'error', isLoading: false, autoClose: 3000 });
        console.error('Error deleting booking', error.message);
      }
    }
  };

  return (
    <div className={styles.myReservations}>
      <header className={styles.myReservations__header}>
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
      </header>
      <div className={styles.myReservations__container}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.table__trHeader}>
              <th className={styles.table__tFirst}>TIME</th>
              {/* <th className={styles.table__th}>TURN</th> */}
              <th className={styles.table__th}>DATE</th>
              <th className={styles.table__th}>GUESTS</th>
              <th className={styles.table__tLast}>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {selectedItemsToView &&
              selectedItemsToView.map((e, i) => {
                // const turno1 = e.shift === "Turno 1" ? '12:30h' : e.shift;
                // const turno2 = e.shift === 'Turno 2' ? '14:30h' : e.shift;
                // const turno2 = e.shift === 'Turno 2' ? '19:30h' : e.shift;
                // const turno2 = e.shift === 'Turno 2' ? '21:30h' : e.shift;
                return (
                  <tr key={i} className={styles.table__tr}>
                    {/* <td className={styles.table__td}>{turno2}</td> */}
                    <td className={`${styles.table__td} ${styles.table__tFirst}`}>{e.shift}</td>
                    <td className={styles.table__td}>{String(e.reservationDate)}</td>
                    <td className={styles.table__td}>{e.persons}</td>
                    <td className={styles.table__td}>
                      <TrashIcon
                        className={styles.table__tdIconDelete}
                        onClick={() => handleDeleteBooking(selectedItemsToView[i].id)}
                      />
                    </td>
                  </tr>
                );
              })}
            <GenerateEmptyRows
              styledTr={styles.table__tr}
              count={emptyRowsCount}
              cells={[
                { styledTd: `${styles.table__td} ${styles.table__tFirst}` },
                { styledTd: styles.table__td },
                { styledTd: styles.table__td },
                { styledTd: `${styles.table__td} ${styles.table__tLast}` },
              ]}
            />
          </tbody>
        </table>
      </div>
      <Pagination
        lengthData={myBookings ? myBookings.length : 0}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
