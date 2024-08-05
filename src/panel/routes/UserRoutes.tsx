import { Navigate, Route, Routes } from 'react-router-dom';
import { Aside } from '../components/Aside';
import { UserPage } from '../pages/userPanel/userPage/UserPage';
import { MyReservations } from '../pages/userPanel/myReservations/MyReservations';
import { SchedulesPage } from '../pages/userPanel/schedulesPage/SchedulesPage';

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