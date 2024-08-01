import { useReducer } from 'react';
import { AuthContext, AuthReducerState, UserReducerType } from './AuthContext';
import { authReducer } from './authReducer';

type AuthProviderType = {
  children: React.ReactNode;
};

const initalState: AuthReducerState = {
  logged: false,
  user: {
    id: '',
    email: null,
  },
};

export const AuthProvider = ({ children }: AuthProviderType) => {
  const [authState, dispatch] = useReducer(authReducer, initalState);

  const onLogin = (id: string, email: string) => {
    const user: UserReducerType = {
      id,
      email,
    };

    dispatch({ type: 'signIn', payload: user });
  };

  const onLogout = () => {};

  console.log({ authState });

  return <AuthContext.Provider value={{ authState, onLogin, onLogout }}>{children}</AuthContext.Provider>;
};
