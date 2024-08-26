import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormInput } from '../../../components/formInput/FormInput';
import { GoogleIcon } from '../../../components/icons/GoogleIcon';
import { IRespLogin } from '../../../interfaces';
import { client } from '../../../supabase/Client';
import { ApiError } from '../../../utils/apiError';
import { useAuth } from '../../hook/useAuth';
import styles from './loginPage.module.scss';
import { loginSchema, LoginType } from './loginSchema';
import { fetchApi } from '../../../utils/fetchApi';

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
    // defaultValues: {
    //   email: 'dirij75152@maxturns.com',
    //   password: '123456Aa#',
    // },
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
        throw new ApiError('No user or session data received');
      }

      const supPass = data.user.user_metadata.sub;
      const supEmail = data.user.user_metadata.email;

      const resp = await fetchApi<IRespLogin>(
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

      if (!resp.ok) {
        throw new ApiError(resp.msg);
      }

      if (resp.data) {
        localStorage.setItem('access_token_api', resp.data.token);
        onLogin(resp.data.user);
        toast.update(toastInfo, { render: resp.msg, type: 'success', isLoading: false, autoClose: 1500 });
      }
    } catch (error) {
      if (error instanceof ApiError) {
        toast.update(toastInfo, { render: error.message, type: 'error', isLoading: false, autoClose: 3000 });
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
        throw new ApiError(error.message);
      }

      if (!data) {
        throw new ApiError('No user or session data received');
      }
    } catch (error) {
      if (error instanceof ApiError) {
        console.error('Google login error:', error.message);
      }
    }
  };

  return (
    <div className={`${styles.login} wrapper`}>
      <div className={styles.login__container}>
        <h1 className={styles.login__title}>Welcome Back</h1>

        <form className={styles.form} onSubmit={handleSubmit(handleLogin)}>
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

          <button className={styles.form__btn} type="submit" aria-label='Sign In'>
            Sign In
          </button>
        </form>

        <div className={styles.login__otherLogins}>
          <span className={styles.login__labelLogins}>— Or sign in with —</span>
          <button className={styles.login__btn__google} type="button" onClick={handleLoginGoogle} aria-label='Sign with Google'>
            <GoogleIcon className={styles.login__btn__googleIcon} />
          </button>
        </div>

        <div className={styles.login__btns}>
          <NavLink className={styles.login__register} to={'/auth/forgot-pass'} aria-label='Forgot password?'>
            Forgot Password?
          </NavLink>
          <NavLink className={styles.login__register} to={'/auth/register'} aria-label='Sign Up'>
            Sign Up
          </NavLink>
        </div>
      </div>
    </div>
  );
};
