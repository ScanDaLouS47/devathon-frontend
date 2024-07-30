import { useReducer } from 'react';
import { AuthConext, AuthReducerState, UserReducerType } from './AuthContext';
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

export const AuthProvide = ({ children }: AuthProviderType) => {
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

  return <AuthConext.Provider value={{ authState, onLogin, onLogout }}>{children}</AuthConext.Provider>;
};
