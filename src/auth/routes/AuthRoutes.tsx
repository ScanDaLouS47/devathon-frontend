import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage, ForgotPassPage, UpdatePassPage } from '../pages';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route index path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-pass" element={<ForgotPassPage />} />
      <Route path="/forgot-pass/update-password" element={<UpdatePassPage />} />

      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
