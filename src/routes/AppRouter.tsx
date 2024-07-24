import { Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { AdminRoutes } from '../panel/routes/AdminRoutes';
import { PrivateRoute } from './PrivateRoutes';
import { PublicRoute } from './PublicRoutes';

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        index
        path="/*"
        element={
          <PublicRoute>
            <AuthRoutes />
          </PublicRoute>
        }
      />

      <Route
        path="/*"
        element={
          <PrivateRoute>
            <AdminRoutes />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
