import { useReducer } from 'react';
import { IUser } from '../../interfaces/user.interface';
import { AuthContext, AuthReducerState } from './AuthContext';
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

  const onLogin = (user: IUser) => {
    localStorage.setItem('userData', JSON.stringify(user));
    dispatch({ type: 'signIn', payload: user });
  };

  const onLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('access_token_api');
    localStorage.removeItem('sb-xyiqucxpwnvmembqwevm-auth-token');
    dispatch({ type: 'signOut' });
  };

  const updateUser = (updatedUser: IUser) => {
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    dispatch({ type: 'updateUser', payload: updatedUser });
  };

  return (
    <AuthContext.Provider value={{ authState, onLogin, onLogout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
