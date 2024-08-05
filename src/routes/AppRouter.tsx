import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { DashboardPage } from '../panel/pages/adminPanel/DashboardPage';
import { ListReservationsPage } from '../panel/pages/adminPanel/ListReservationsPage';
import { ReservationsPage } from '../panel/pages/adminPanel/ReservationsPage';
import { MyReservations } from '../panel/pages/userPanel/myReservations/MyReservations';
import { SchedulesPage } from '../panel/pages/userPanel/schedulesPage/SchedulesPage';
import { UserPage } from '../panel/pages/userPanel/userPage/UserPage';
import { PrivateRoute } from './PrivateRoutes';
import { PrivateUserRoutes } from './PrivateUserRoutes';
import { PublicRoute } from './PublicRoutes';

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/auth/*" element={<PublicRoute />}>
          <Route path="*" element={<AuthRoutes />} />
        </Route>

        <Route path="/panel/admin/*" element={<PrivateRoute />}>
          <Route index path="dashboard" element={<DashboardPage />} />
          <Route path="reservations" element={<ReservationsPage />} />
          <Route path="list-reservations" element={<ListReservationsPage />} />

          <Route path="*" element={<Navigate to="/panel/admin/admin1" replace />} />
        </Route>

        <Route path="/panel/user/*" element={<PrivateUserRoutes />}>
          <Route index path="user1" element={<UserPage />} />
          <Route path="my-reservations" element={<MyReservations />} />
          <Route path="schedules" element={<SchedulesPage />} />

          <Route path="*" element={<Navigate to="/panel/user/user1" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </>
  );
};
