import { useReducer } from 'react';
import { AuthContext, AuthReducerState, UserReducerType } from './AuthContext';
import { authReducer } from './authReducer';

type AuthProviderType = {
  children: React.ReactNode;
};

const initialState: AuthReducerState = {
  logged: false,
  user: null,
};
const init = (): AuthReducerState => {
  const userString = localStorage.getItem('userData');
  const userData = userString ? JSON.parse(userString) : null;
  return {
    logged: !!userData,
    user: userData,
  };
};

export const AuthProvider = ({ children }: AuthProviderType) => {
  const [authState, dispatch] = useReducer(authReducer, initialState, init);

  const onLogin = (user: UserReducerType) => {
    console.log(user);
    localStorage.setItem('userData', JSON.stringify(user));
    dispatch({ type: 'signIn', payload: user });
  };

  const onLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('access_token_api');
    localStorage.removeItem('sb-xyiqucxpwnvmembqwevm-auth-token'); // Supabase
    dispatch({ type: 'signOut' });
  };

  console.log({ authState });

  return <AuthContext.Provider value={{ authState, onLogin, onLogout }}>{children}</AuthContext.Provider>;
};
