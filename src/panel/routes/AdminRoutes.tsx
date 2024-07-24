import { Navigate, Route, Routes } from 'react-router-dom';
import { Aside } from '../components/Aside';
import { AdminPage } from '../pages/adminPanel/AdminPage';
import { DashboardPage } from '../pages/adminPanel/DashboardPage';
import { ListReservationsPage } from '../pages/adminPanel/ListReservationsPage';
import { ReservationsPage } from '../pages/adminPanel/ReservationsPage';

export const AdminRoutes = () => {
  return (
    <>
      <Aside />

      <Routes>
        <Route index path="admin" element={<AdminPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="reservations" element={<ReservationsPage />} />
        <Route path="list-reservations" element={<ListReservationsPage />} />

        <Route path="*" element={<Navigate to="/panel/admin" />} />
      </Routes>
    </>
  );
};
