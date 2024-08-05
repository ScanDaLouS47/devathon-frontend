import { useReducer } from 'react';
import { AuthContext, AuthReducerState, UserReducerType } from './AuthContext';
import { authReducer } from './authReducer';

type AuthProviderType = {
  children: React.ReactNode;
};

const initialState: AuthReducerState = {
  logged: false,
  user: {
    email: '',
    password: '',
    role: '',
  },
};

export const AuthProvider = ({ children }: AuthProviderType) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  const onLogin = (email: string, password: string, role: string) => {
    const user: UserReducerType = {
      email,
      password,
      role,
    };

    dispatch({ type: 'signIn', payload: user });
  };

  const onLogout = () => {};

  console.log({ authState });

  return <AuthContext.Provider value={{ authState, onLogin, onLogout }}>{children}</AuthContext.Provider>;
};
