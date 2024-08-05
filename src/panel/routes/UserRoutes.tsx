import { Navigate, Route } from 'react-router-dom';
import { MyReservations } from '../pages/userPanel/myReservations/MyReservations';
import { SchedulesPage } from '../pages/userPanel/schedulesPage/SchedulesPage';
import { UserPage } from '../pages/userPanel/userPage/UserPage';

export const UserRoutes = () => {
  return (
    <>
      {/* <Aside /> */}

      <h2>USEEEEEEEEEEEEEER</h2>

      <Route path="/">
        <Route index path="user" element={<UserPage />} />
        <Route path="my-reservations" element={<MyReservations />} />
        <Route path="schedules" element={<SchedulesPage />} />

        <Route path="*" element={<Navigate to="/panel/user" />} />
      </Route>
    </>
  );
};
