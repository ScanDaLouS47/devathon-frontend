import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/hook/useAuth';
import { Aside } from '../panel/components/Aside';

export const PrivateRoute = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  console.log(authState);

  useEffect(() => {
    if (!authState.logged) {
      navigate('/auth/login');
      return;
    }
    if (authState.user?.role !== 'admin') navigate('/panel/user');
  }, [authState.user?.role]);

  return (
    <section>
      <Aside />
      <Outlet />
    </section>
  );
};
