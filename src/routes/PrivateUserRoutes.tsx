import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/hook/useAuth';
import { Link } from '../interfaces/link.interface';
import { Aside } from '../panel/components/Aside';

const links: Link[] = [
  { path: '/panel/user/schedules', name: 'Schedules' },
  { path: '/panel/user/my-reservations', name: 'Reservations' },
];

export const PrivateUserRoutes = () => {
  const { authState } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.logged) {
      navigate('/auth/login');
      return;
    }
    if (authState.user?.role !== 'user') navigate('/panel/admin');
  }, [authState.logged, authState.user?.role, navigate]);

  return (
    <section className="wrapper private">
      <Aside links={links} />
      <Outlet />
    </section>
  );
};
