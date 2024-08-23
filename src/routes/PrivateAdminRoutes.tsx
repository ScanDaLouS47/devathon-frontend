import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/hook/useAuth';
import { Link } from '../interfaces/link.interface';
import { Aside } from '../panel/components/Aside';
const links: Link[] = [
  { path: '/panel/admin/dashboard', name: 'Dashboard' },
  { path: '/panel/admin/reservations', name: 'Reserves' },
];

export const PrivateAdminRoute = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.logged) {
      navigate('/auth/login');
      return;
    }
    if (authState.user?.role !== 'admin') navigate('/panel/user');
  }, [authState.logged, authState.user?.role, navigate]);

  return (
    <div className="wrapper private">
      <Aside links={links} />
      <Outlet />
    </div>
  );
};
