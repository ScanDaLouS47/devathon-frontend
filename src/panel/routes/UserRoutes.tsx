import { Navigate, Route, Routes } from 'react-router-dom';
import { Aside } from '../components/Aside';
import { UserPage } from '../pages/userPanel/UserPage';
import { MyReservations } from '../pages/userPanel/MyReservations';
import { SchedulesPage } from '../pages/userPanel/SchedulesPage';

export const UserRoutes = () => {
  return (
    <>
      <Aside />

      <Routes>
        <Route index path="user" element={<UserPage />} />
        <Route path="my-reservations" element={<MyReservations />} />
        <Route path="schedules" element={<SchedulesPage />} />

        <Route path="*" element={<Navigate to="/panel/user" />} />
      </Routes>
    </>
  );
};
