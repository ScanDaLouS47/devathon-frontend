import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { AdminRoutes } from '../panel/routes/AdminRoutes';
import { PrivateRoute } from './PrivateRoutes';
import { PublicRoute } from './PublicRoutes';
import { UserRoutes } from '../panel/routes/UserRoutes';

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/auth/*" element={<PublicRoute />}>
          <Route path="*" element={<AuthRoutes />} />
        </Route>

        <Route path="/panel/*" element={<PrivateRoute />}>
          <Route path="*" element={<AdminRoutes />} />
        </Route>

        <Route path="/panel/*" element={<PrivateRoute />}>
          <Route path="*" element={<UserRoutes />} />
        </Route>

        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </>
  );
};
