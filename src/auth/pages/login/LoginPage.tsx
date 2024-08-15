import './loginPage.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormInput } from '../../../components/formInput/FormInput';
import { GoogleIcon } from '../../../components/icons/GoogleIcon';
import { client } from '../../../supabase/Client';
import { ApiError } from '../../../utils/apiError';
import { fetchApiV2 } from '../../../utils/fetchApiV2';
import { useAuth } from '../../hook/useAuth';
import { loginSchema, LoginType } from './loginSchema';

/*
    ** ADMIN **
    defaultValues: {
      email: 'dirij75152@maxturns.com',
      password: '123456Aa#',
    },

    ** USER **
    defaultValues: {
      email: 'fogoho4949@givehit.com',
      password: 'asdf123Aa#',
    },
*/

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'fogoho4949@givehit.com',
      password: 'asdf123Aa#',
    },
  });

  const { onLogin } = useAuth();

  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin: SubmitHandler<LoginType> = async ({ email, password }) => {
    try {
      const toastInfo = toast.loading('Loading...');

      const { data, error } = await client.auth.signInWithPassword({
        email,
        password,
      });
      sessionStorage.setItem('sub', data.user?.user_metadata.sub);

      if (error) {
        throw new ApiError(error.message);
      }

      if (!data.user || !data.session) {
        throw new Error('No user or session data received');
      }

      const supPass = data.user.user_metadata.sub;
      const supEmail = data.user.user_metadata.email;

      // const resp = await fetchApi(
      //   '/api/v1/login',
      //   'POST',
      //   '',
      //   {
      //     email: supEmail,
      //     password: supPass,
      //   },
      //   false,
      //   true,
      // );
      const resp = await fetchApiV2(
        '/api/v1/login',
        'POST',
        {
          email: supEmail,
          password: supPass,
        },
        true,
      );

      if (resp.error) {
        toast.update(toastInfo, { render: resp.message, type: 'error', isLoading: false, autoClose: 3000 });
        return;
      }

      console.log('ON MY BACKEND', resp);

      localStorage.setItem('access_token_api', resp.data.token);

      //USER DATA TEST
      // const user = {
      //   name: 'Test',
      //   lName: 'Testing',
      //   email: 'dirij75152@maxturns.com',
      //   phone: '+34123123123',
      //   role: 'user',
      //   image_url: 'None',
      // };

      onLogin(resp.data.user);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
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

        {loginError && <div className="error__message">{loginError}</div>}

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
