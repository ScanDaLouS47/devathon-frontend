import { createContext } from 'react';
import { IUser } from '../../interfaces/user.interface';

export type AuthReducerState = {
  logged: boolean;
  user: IUser | null;
};

type AuthContextType = {
  authState: AuthReducerState;
  onLogin: (user: IUser) => void;
  onLogout: () => void;
  updateUser: (updatedUser: IUser) => void;
};

export const AuthContext = createContext<AuthContextType>({
  authState: { logged: false, user: null },
  onLogin: () => null,
  onLogout: () => null,
  updateUser: () => null,
});
