import { Aside } from '../../components/Aside';
import { AdminRoutes } from '../../routes/AdminRoutes';

export const AdminPage = () => {
  return (
    <div>
      <Aside />

      <AdminRoutes />
    </div>
  );
};
