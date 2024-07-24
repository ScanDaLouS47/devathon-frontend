import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminPage } from '../pages/adminPanel/AdminPage';
import { DashboardPage } from '../pages/adminPanel/DashboardPage';
import { ListReservationsPage } from '../pages/adminPanel/ListReservationsPage';
import { ReservationsPage } from '../pages/adminPanel/ReservationsPage';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/panel/admin" element={<AdminPage />} />
      <Route path="/panel/dashboard" element={<DashboardPage />} />
      <Route path="/panel/reservations" element={<ReservationsPage />} />
      <Route path="/panel/list-reservations" element={<ListReservationsPage />} />

      <Route path="*" element={<Navigate to="/panel/admin" />} />
    </Routes>
  );
};
