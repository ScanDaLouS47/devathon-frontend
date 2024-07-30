import { useContext } from 'react';
import { AuthConext } from '../context/AuthContext';

export const useAuth = () => {
  return useContext(AuthConext);
};
