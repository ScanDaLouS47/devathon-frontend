import { DatesSetArg, EventClickArg } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppDispatch } from '../../../../app/store';
import { Select } from '../../../../components/select/Select';
import { getBookingsData, setPeople } from '../../../../features/bookins/bookinsSlice';
import { getAllBookings } from '../../../../features/bookins/bookinsThunk';
import { CalendarInfo } from '../../../components/calendarInfo/CalendarInfo';
import { EventContent } from '../../../components/eventContent/EventContent';
import { KidIcon } from '../../../components/icons/KidIcon';
import { useSchedulesForm } from '../../../hooks/useSchedulesForm';
import './schedulesPage.scss';
import { PeopleIcon } from '../../../components/icons';

export const SchedulesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const bookingsEvents = useSelector(getBookingsData);
  const { persons, setAdults, setKids } = useSchedulesForm();

  const handleEventClick = (info: EventClickArg) => {
    const eventStatus = info.event._def.extendedProps.status;
    const personsSelected = persons.adults + persons.kids;

    if (eventStatus === 'full' || eventStatus === 'expired') return;
    navigate(`/panel/user/new-booking/${info.event._def.publicId}`);
    dispatch(setPeople(personsSelected));
  };
  const handleFilterBookings = async (event: React.FormEvent<HTMLFormElement>) => {
    const toastInfo = toast.loading('Filtering...');
    event.preventDefault();
    const totalPersons = Number(persons.adults + persons.kids);
    const date = new Date().toISOString().slice(0, 7);

    await dispatch(getAllBookings({ date, totalPersons }));

    toast.update(toastInfo, {
      render: 'Filter completed!',
      type: 'success',
      isLoading: false,
      autoClose: 1000,
    });
  };
  const handleDatesSet = async (arg: DatesSetArg) => {
    const date = arg.startStr.slice(0, 7);
  };
  useEffect(() => {
    dispatch(getAllBookings({}));
  }, []);
  return (
    <div className="schedulesPage">
      <header className="schedulesPage__header">
        <form className="search" onSubmit={handleFilterBookings}>
          <div className="search__container">
            <PeopleIcon className="schedulesPage__icon" />
            <Select
              id="adults"
              value={persons.adults}
              onChange={(event) => setAdults(Number(event.target.value))}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </Select>
          </div>
          <div className="search__container">
            <KidIcon className="schedulesPage__icon" />

            <Select id="kids" value={persons.kids} onChange={(event) => setKids(Number(event.target.value))}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </Select>
          </div>
          <button className="search__btn" type="submit" aria-label="Searching button">
            Search
          </button>
        </form>
        <CalendarInfo />
      </header>
      <div className="calendar">
        <FullCalendar
          weekends={true}
          plugins={[dayGridPlugin]}
          hiddenDays={[0]}
          displayEventTime={false}
          initialView="dayGridMonth"
          events={bookingsEvents}
          eventDidMount={(info) => {
            info.event.setEnd(info.event.start);
          }}
          eventContent={EventContent}
          eventClick={handleEventClick}
          datesSet={handleDatesSet}
        />
      </div>
    </div>
  );
};
