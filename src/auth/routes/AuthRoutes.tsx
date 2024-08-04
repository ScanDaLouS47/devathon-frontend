import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage, ForgotPassPage, UpdatePassPage } from '../pages';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route index path="auth/login" element={<LoginPage />} />
      <Route path="auth/register" element={<RegisterPage />} />
      <Route path="auth/forgot-pass" element={<ForgotPassPage />} />
      <Route path="auth/forgot-pass/update-password" element={<UpdatePassPage />} />

      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
