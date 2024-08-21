import './loginPage.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormInput } from '../../../components/formInput/FormInput';
import { GoogleIcon } from '../../../components/icons/GoogleIcon';
import { IRespLogin } from '../../../interfaces';
import { client } from '../../../supabase/Client';
import { ApiError } from '../../../utils/apiError';
import { fetchApiV2 } from '../../../utils/fetchApiV2';
import { useAuth } from '../../hook/useAuth';
import { loginSchema, LoginType } from './loginSchema';
// import { fetchApi } from '../../../utils/fetchApi';

/**
    ** ADMIN **
    defaultValues: {
      email: 'dirij75152@maxturns.com',
      password: '123456Aa#',
    },

    ** USER **
    defaultValues: {
      email: 'vohac64895@iteradev.com',
      password: 'Aa1234~~',
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
      email: 'vohac64895@iteradev.com',
      password: 'Aa1234~~',
    },
  });

  const { onLogin } = useAuth();

  const handleLogin: SubmitHandler<LoginType> = async ({ email, password }) => {
    const toastInfo = toast.loading('Loading...');
    try {
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new ApiError(error.message);
      }

      if (!data.user || !data.session) {
        throw new Error('No user or session data received');
      }

      const supPass = data.user.user_metadata.sub;
      const supEmail = data.user.user_metadata.email;

      // const resp = await fetchApi<IRespLogin>(
      //   '/api/v1/login',
      //   'POST',
      //   '', // id
      //   {
      //     email: supEmail,
      //     password: supPass,
      //   },
      //   false, // Token
      //   true, // Credentials
      // );
      const resp = await fetchApiV2<IRespLogin>(
        '/api/v1/login',
        'POST',
        {
          email: supEmail,
          password: supPass,
        },
        false,
        true,
      );

      if (!resp.ok) {
        throw new ApiError(resp.msg);
      }

      console.log('ON MY BACKEND', resp);

      if (resp.data) {
        localStorage.setItem('access_token_api', resp.data.token);
        onLogin(resp.data.user);
        toast.update(toastInfo, { render: resp.msg, type: 'success', isLoading: false, autoClose: 1500 });
      }
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message, { autoClose: 3000 });
        console.error('Login error:', error);
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

      // onLogin(data.data.user);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Google login error:', error.message);
      }
    }
  };

  return (
    <div className="login wrapper">
      <div className="login__container">
        <h1 className="login__title">Welcome Back</h1>

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
