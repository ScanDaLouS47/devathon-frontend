import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/hook/useAuth';

type PrivateRouteType = {
  children: React.ReactNode;
};

export const PrivateRoute = ({ children }: PrivateRouteType) => {
  const { authState } = useAuth();

  // return authState.logged ? children : <Navigate to={`/panel/${authState.user.role}`} />;
  return authState.logged ? children : <Navigate to={'/auth/login'} />;
};
