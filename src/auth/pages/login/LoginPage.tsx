import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { FormInput } from '../../../components/formInput/FormInput';
import { client } from '../../../supabase/Client';
import { fetchApi } from '../../../utils/fetchApi';
import { useAuth } from '../../hook/useAuth';
import './loginPage.scss';
import { loginSchema, LoginType } from './loginSchema';
import { GoogleIcon } from '../../../components/icons/GoogleIcon';

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'dirij75152@maxturns.com',
      password: '123B456$',
    },
  });

  const { onLogin } = useAuth();

  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin: SubmitHandler<LoginType> = async ({ email, password }) => {
    try {
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password,
      });
      // console.log('ON SUPABASE', data);

      if (error) {
        throw new Error(error.message);
      }

      if (!data.user || !data.session) {
        throw new Error('No user or session data received');
      }

      const supPass = data.user.user_metadata.sub;
      const supEmail = data.user.user_metadata.email;

      const resp = await fetchApi(
        '/api/v1/login',
        'POST',
        '',
        {
          email: supEmail,
          password: supPass,
        },
        false,
        true,
      );

      console.log('ON MY BACKEND', resp);

      //USER DATA TEST
      const user = {
        email: 'pepe@pepe.com',
        role: 'admin',
      };

      onLogin(user);
    } catch (error) {
      if (error instanceof Error) {
        setLoginError(error.message);
        console.error('Login error:', error.message);
      } else {
        setLoginError('An unexpected error occurred');
        console.error('Unexpected error:', error);
      }
    }
  };

  const handleLoginGoogle = async () => {
    try {
      const { data, error } = await client.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `http://localhost:5173/auth/login`,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data) {
        throw new Error('No user or session data received');
      }
    } catch (error) {
      if (error instanceof Error) {
        setLoginError(error.message);
        console.error('Google login error:', error.message);
      } else {
        setLoginError('An unexpected error occurred');
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <div className="login wrapper">
      <div className="login__container">
        <h1 className="login__title">Welcome Back</h1>

        {loginError && <div className="error-message">{loginError}</div>}

        <form className="form" onSubmit={handleSubmit(handleLogin)}>
          <FormInput
            label="Email Address"
            error={errors['email']}
            id="email"
            type="email"
            placeholder="bob@bob.com"
            {...register('email')}
          />

          <FormInput
            label="Password"
            error={errors['password']}
            id="password"
            type="password"
            placeholder="****************"
            {...register('password')}
          />

          <button className="form__btn" type="submit">
            Sign In
          </button>
        </form>

        <div className="login__otherLogins">
          <span className="login__labelLogins">— Or sign in with —</span>
          <button className="login__btn__google" type="button" onClick={handleLoginGoogle}>
            <GoogleIcon className="login__btn__googleIcon" />
          </button>
        </div>

        <div className="login__btns">
          <NavLink className="login__register" to={'/auth/forgot-pass'}>
            Forgot Password?
          </NavLink>
          <NavLink className="login__register" to={'/auth/register'}>
            Sign Up
          </NavLink>
        </div>
      </div>
    </div>
  );
};
