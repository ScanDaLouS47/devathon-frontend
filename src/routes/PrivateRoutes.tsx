import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/hook/useAuth';

export const PrivateRoute = () => {
  const { authState } = useAuth();

  if (authState.user.role === 'admin') {
    return <Outlet />;
  } else if (authState.user.role === 'user') {
    return <Outlet />;
  } else {
    return <Navigate to="/auth/login" replace />;
  }
};
