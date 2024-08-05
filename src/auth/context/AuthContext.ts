import { createContext } from 'react';

export type UserReducerType = {
  id?: number;
  email: string;
  password: string;
  role: string;
  name?: string;
  lName?: string;
  phone?: string;
  image_url?: string | null;
};

export type AuthReducerState = {
  logged: boolean;
  user: UserReducerType;
};

type AuthContextType = {
  authState: AuthReducerState;
  onLogin: (email: string, password: string, role: string) => void;
  onLogout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  authState: { logged: false, user: { email: '', password: '', role: '' } },
  onLogin: () => null,
  onLogout: () => null,
});
