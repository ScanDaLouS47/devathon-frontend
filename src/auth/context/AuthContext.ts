import { createContext } from 'react';

export type UserReducerType = {
  id?: number;
  email?: string;
  role?: string;
  name?: string;
  lName?: string;
  phone?: string;
  image_url?: string | undefined;
};

export type AuthReducerState = {
  logged: boolean;
  user: UserReducerType | undefined;
};

type AuthContextType = {
  authState: AuthReducerState;
  onLogin: (user: UserReducerType) => void;
  onLogout: () => void;
  updateUser: (updatedUser: UserReducerType) => void;
};

export const AuthContext = createContext<AuthContextType>({
  authState: { logged: false, user: undefined },
  onLogin: () => null,
  onLogout: () => null,
  updateUser: () => null,
});
