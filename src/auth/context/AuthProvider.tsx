import { useReducer, useEffect } from 'react';
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

  useEffect(() => {
    const storedAuthState = sessionStorage.getItem('authState');
    if (storedAuthState) {
      dispatch({ type: 'signIn', payload: JSON.parse(storedAuthState) });
    }
  }, []);

  const onLogin = (email: string, password: string, role: string) => {
    const user: UserReducerType = {
      email,
      password,
      role,
    };

    sessionStorage.setItem('authState', JSON.stringify(user));
    dispatch({ type: 'signIn', payload: user });
  };

  const onLogout = () => {
    sessionStorage.removeItem('authState');
    localStorage.removeItem('access_token_api');
    localStorage.removeItem('sb-xyiqucxpwnvmembqwevm-auth-token'); // Supabase
    dispatch({ type: 'signOut' });
  };

  console.log({ authState });

  return <AuthContext.Provider value={{ authState, onLogin, onLogout }}>{children}</AuthContext.Provider>;
};
