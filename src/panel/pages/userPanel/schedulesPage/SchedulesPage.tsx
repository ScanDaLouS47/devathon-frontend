import { EventClickArg } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../../app/store';
import { Select } from '../../../../components/select/Select';
import { getBookingsData, setPeople } from '../../../../features/bookins/bookinsSlice';
import { getAllBookings } from '../../../../features/bookins/bookinsThunk';
import { EventContent } from '../../../components/eventContent/EventContent';
import { KidIcon } from '../../../components/icons/KidIcon';
import './schedulesPage.scss';

export const SchedulesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const bookingsEvents = useSelector(getBookingsData);

  const handleEventClick = (info: EventClickArg) => {
    const eventStatus = info.event._def.extendedProps.status;

    if (eventStatus === 'full' || eventStatus === 'expired') return;
    navigate(`/panel/user/new-booking/${info.event._def.publicId}`);
    dispatch(setPeople(4));
  };

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);
  return (
    <div className="schedulesPage">
      <header className="schedulesPage__header">
        <form className="search">
          <div className="search__container">
            <KidIcon className="schedulesPage__icon" />
            <Select id="adults">
              <option value="1">1</option>
              <option value="1">2</option>
              <option value="1">3</option>
              <option value="1">4</option>
            </Select>
          </div>
          <div className="search__container">
            <KidIcon className="schedulesPage__icon" />

            <Select id="kids">
              <option value="1">1</option>
              <option value="1">2</option>
              <option value="1">3</option>
              <option value="1">4</option>
            </Select>
          </div>
          <button className="search__btn" type="submit">
            Search
          </button>
        </form>

        <ul className="schedulesPage__info">
          <li>Full</li>
          <li>Available</li>
        </ul>
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
        />
      </div>
    </div>
  );
};
