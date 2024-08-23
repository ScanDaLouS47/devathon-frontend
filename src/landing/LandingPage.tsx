import { NavLink } from 'react-router-dom';
import style from './landingPage.module.scss';

export const LandingPage = () => {
  return (
    <section className={`${style.landing} wrapper`}>
      <div className={style.landing__left}>
        <div className={style.landing__content}>
          <h2 className={style.landing__title}>
            Effortless <span className={style.landing__span}>Reservations</span>, Anytime, Anywhere
          </h2>

          <p className={style.landing__description}>
            Discover the ultimate reservarion app, where booking your next experience is as easy as a tap.
            Seamless, reliable, and alwayas at your fingertips.
          </p>

          <NavLink to={'/auth/login'} className={style.landing__btn} aria-label='Enter into application'>
            Start Reservation
          </NavLink>
        </div>
      </div>

      <div className={style.landing__right}>
        <div className={style.product}>
          <div
            className={style.product__image}
            style={{ '--url': `url('./images/dish_1.webp')` } as React.CSSProperties}
          ></div>
          <div
            className={style.product__image}
            style={{ '--url': `url('./images/dish_2.webp')` } as React.CSSProperties}
          ></div>
        </div>
      </div>
    </section>
  );
};
