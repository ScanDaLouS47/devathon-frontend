import { NavLink } from 'react-router-dom';
import './aside.scss';

export const Aside = () => {
  return (
    <aside className="aside">
      <nav className="aside__nav">
        <NavLink
          className={({ isActive }) => `aside__link ${isActive ? 'active' : ''}`}
          to="/panel/admin/dashboard"
        >
          Dashboard
        </NavLink>
        <NavLink className="aside__link" to="/panel/admin/reservations">
          Reservation
        </NavLink>
        <NavLink className="aside__link" to="/panel/admin/list-reservations">
          Reservations
        </NavLink>
      </nav>
    </aside>
  );
};
