import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/hook/useAuth';

export const PrivateUserRoutes = () => {
  const { authState } = useAuth();
  console.log(authState);

  const navigate = useNavigate();
  console.log(authState);

  useEffect(() => {
    if (!authState.logged) {
      navigate('/auth/login');
      return;
    }
    if (authState.user?.role !== 'user') navigate('/panel/admin');
  }, []);

  return (
    <section>
      <h2>ASIDE</h2>
      <Outlet />
    </section>
  );
};
