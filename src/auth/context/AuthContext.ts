import { createContext } from 'react';
export type AuthReducerState = {
  logged: boolean;
  user: UserReducerType;
};
export type UserReducerType = {
  id: string;
  email: string | null;
};

type AuthContextType = {
  authState: AuthReducerState;
  onLogin: (id: string, email: string) => void;
  onLogout: () => void;
};

export const AuthConext = createContext<AuthContextType>({
  authState: { logged: false, user: { id: '', email: null } },
  onLogin: () => null,
  onLogout: () => null,
});
