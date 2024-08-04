import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/hook/useAuth';

type PublicRouteType = {
  children: React.ReactNode;
};

export const PublicRoute = ({ children }: PublicRouteType) => {
  const { authState } = useAuth();

  // return authState.logged ? <Navigate to={`/panel/${authState.user.role}`} /> : children;
  return authState.logged ? <Navigate to={`/panel/admin`} /> : children;
};
