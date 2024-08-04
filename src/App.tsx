import './App.scss';
import { AuthProvider } from './auth/context/AuthProvider';
import Header from './components/header/Header';
import { AppRouter } from './routes/AppRouter';
// import { useEffect } from 'react';
// import { client } from './supabase/Client';

export const App = () => {
  // useEffect(() => {
  //   client.auth.onAuthStateChange((event, session) => {
  // (!session) ? navigate('/') : navigate('/home');

  // if (event === 'INITIAL_SESSION') {
  //   // handle initial session
  //   console.log(event);
  // } else if (event === 'SIGNED_IN') {
  //   // handle sign in event
  //   console.log(event);
  // } else if (event === 'SIGNED_OUT') {
  //   // handle sign out event
  //   console.log(event);
  // } else if (event === 'PASSWORD_RECOVERY') {
  //   // handle password recovery event
  //   console.log(event);
  // } else if (event === 'TOKEN_REFRESHED') {
  //   // handle token refreshed event
  //   console.log(event);
  // } else if (event === 'USER_UPDATED') {
  //   // handle user updated event
  //   console.log(event);
  // }

  //     console.log(session, 'SESSION OBJECT');
  //   });
  // }, []);

  return (
    <AuthProvider>
      <Header />
      <AppRouter />
    </AuthProvider>
  );
};
