import { createContext } from 'react';

export type UserReducerType = {
  id?: number;
  email: string;
  role: string;
  name?: string;
  lName?: string;
  phone?: string;
  image_url?: string | null;
};

export type AuthReducerState = {
  logged: boolean;
  user: UserReducerType | null;
};

type AuthContextType = {
  authState: AuthReducerState;
  onLogin: (user: UserReducerType) => void;
  onLogout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  authState: { logged: false, user: null },
  onLogin: () => null,
  onLogout: () => null,
});
