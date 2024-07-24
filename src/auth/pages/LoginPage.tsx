import { NavLink, useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/panel/admin');
  };
  return (
    <div>
      LoginPages
      <button onClick={handleLogin}>login</button>
      <NavLink to={'/auth/register'}>Register</NavLink>
    </div>
  );
};
