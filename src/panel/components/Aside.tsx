import { NavLink } from 'react-router-dom';

export const Aside = () => {
  return (
    <div>
      <NavLink to="/panel/dashboard">Admin</NavLink>
      <NavLink to="/panel/reservations">reservation</NavLink>
      <NavLink to="/panel/list-reservations">list-reservations</NavLink>
    </div>
  );
};
