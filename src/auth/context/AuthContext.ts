import { createContext } from 'react';

export type AuthReducerState = {
  logged: boolean;
  user: UserReducerType;
};

export type UserReducerType = {
  email: string;
  password: string;
};

type AuthContextType = {
  authState: AuthReducerState;
  onLogin: (email: string, password: string) => void;
  onLogout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  authState: { logged: false, user: { email: '', password: '' } },
  onLogin: () => null,
  onLogout: () => null,
});
