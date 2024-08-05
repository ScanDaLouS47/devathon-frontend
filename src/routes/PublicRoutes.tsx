import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/hook/useAuth';

export const PublicRoute = () => {
  const { authState } = useAuth();
  console.log(authState);
  

  if (authState.logged) {
    return <Navigate to={`/panel/${authState.user.role}`} />;
  }

  return <Outlet />;
};
