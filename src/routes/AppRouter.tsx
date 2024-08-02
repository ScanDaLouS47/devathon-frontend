import { Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { AdminRoutes } from '../panel/routes/AdminRoutes';
import { PrivateRoute } from './PrivateRoutes';
import { PublicRoute } from './PublicRoutes';
import { UserRoutes } from '../panel/routes/UserRoutes';
import Header from '../components/header/Header';

export const AppRouter = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/*"
          element={
            <PublicRoute>
              <AuthRoutes />
            </PublicRoute>
          }
        />

        <Route
          path="/panel/*"
          element={
            <PrivateRoute>
              <AdminRoutes />
            </PrivateRoute>
          }
        />

        <Route
          path="/panel/*"
          element={
            <PrivateRoute>
              <UserRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};
