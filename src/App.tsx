import { useEffect } from 'react';
import './App.scss';
import { AppRouter } from './routes/AppRouter';
import { client } from './supabase/Client';



export const App = () => {  
  useEffect(() => {
    client.auth.onAuthStateChange((event, session) => {    
      console.log(event, 'EVENT');
      console.log(session, '##session');      
    })
    
  }, []);

  return (
    <>
      <AppRouter />
    </>
  );
};
