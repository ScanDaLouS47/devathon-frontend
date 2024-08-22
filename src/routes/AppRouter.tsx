import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { LandingPage } from '../landing/LandingPage';
import { ChangePassword } from '../panel/pages/accountSettings/changePassword/ChangePassword';
import { DidForgetPass } from '../panel/pages/accountSettings/didForgetPassword/DidForgetPass';
import { Settings } from '../panel/pages/accountSettings/settings/Settings';
import { DashboardPage } from '../panel/pages/adminPanel/DashboardPage';
import { ListReservationsPage } from '../panel/pages/adminPanel/ListReservationsPage';
import { ReservationsPage } from '../panel/pages/adminPanel/ReservationsPage';
import { BookingPage } from '../panel/pages/userPanel/booking/BookingPage';
import { MyReservations } from '../panel/pages/userPanel/myReservations/MyReservations';
import { SchedulesPage } from '../panel/pages/userPanel/schedulesPage/SchedulesPage';
import { PrivateAdminRoute } from './PrivateAdminRoutes';
import { PrivateUserRoutes } from './PrivateUserRoutes';
import { PublicRoute } from './PublicRoutes';

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<PublicRoute />}>
          <Route index element={<LandingPage />} />
        </Route>
        <Route path="/auth/*" element={<PublicRoute />}>
          <Route path="*" element={<AuthRoutes />} />
        </Route>

        <Route path="/panel/admin/*" element={<PrivateAdminRoute />}>
          <Route index path="dashboard" element={<DashboardPage />} />
          <Route path="reservations" element={<ReservationsPage />} />
          <Route path="list-reservations" element={<ListReservationsPage />} />

          <Route path="settings" element={<Settings />} />
          <Route path="settings/change-password" element={<ChangePassword />} />
          <Route path="settings/did-forget" element={<DidForgetPass />} />

          <Route path="*" element={<Navigate to="/panel/admin/dashboard" replace />} />
        </Route>

        <Route path="/panel/user/*" element={<PrivateUserRoutes />}>
          <Route index path="schedules" element={<SchedulesPage />} />
          <Route index path="new-booking/:id" element={<BookingPage />} />

          <Route path="my-reservations" element={<MyReservations />} />

          <Route path="settings" element={<Settings />} />
          <Route path="settings/change-password" element={<ChangePassword />} />
          <Route path="settings/did-forget" element={<DidForgetPass />} />

          <Route path="*" element={<Navigate to="/panel/user/schedules" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
};
