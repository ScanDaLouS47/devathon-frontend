import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import './App.scss';
import { store } from './app/store';
import { AuthProvider } from './auth/context/AuthProvider';
import Header from './components/header/Header';
import { AppRouter } from './routes/AppRouter';

export const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Header />
        <AppRouter />
        <ToastContainer position="top-right" autoClose={1500} />
      </AuthProvider>
    </Provider>
  );
};
