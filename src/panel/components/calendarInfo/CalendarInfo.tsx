import style from './calendarInfo.module.scss';

export const CalendarInfo = () => {
  return (
    <div className={style.info}>
      <div className={style.info__row}>
        <span className={style.info__available}></span>
        <span>Available</span>
      </div>
      <div className={style.info__row}>
        <span className={style.info__expired}></span>
        <span>Expired</span>
      </div>
      <div className={style.info__row}>
        <span className={style.info__full}></span>
        <span>Full</span>
      </div>
    </div>
  );
};
