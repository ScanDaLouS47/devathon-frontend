import { NavLink } from 'react-router-dom';

export const RegisterPage = () => {
  return (
    <div>
      RegisterPage
      <NavLink to={'/auth/login'}>Login</NavLink>
    </div>
  );
};
