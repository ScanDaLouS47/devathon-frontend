import { EventClickArg } from '@fullcalendar/core/index.js';
import './eventContent.scss';

export const EventContent = (eventInfo: EventClickArg) => {
  const eventStatus = eventInfo.event.extendedProps.status;

  return (
    <div className={`event ${eventStatus}`}>
      <span>{eventInfo.event._def.title}</span>
    </div>
  );
};
