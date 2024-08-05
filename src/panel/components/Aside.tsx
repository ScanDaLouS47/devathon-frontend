import { NavLink } from 'react-router-dom';

export const Aside = () => {
  return (
    <div>
      <NavLink to="/panel/admin/dashboard">dashboard</NavLink>
      <NavLink to="/panel/admin/reservations">reservation</NavLink>
      <NavLink to="/panel/admin/list-reservations">list-reservations</NavLink>
    </div>
  );
};
