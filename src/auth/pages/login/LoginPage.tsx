import './loginPage.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { FormInput } from '../../../components/formInput/FormInput';
import { loginSchema, LoginType } from './loginSchema';
import { client } from '../../../supabase/Client';
import { useState } from 'react';
import { useAuth } from '../../hook/useAuth';

// POST a Jose con sup_id e email

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const { onLogin } = useAuth();

  const navigate = useNavigate();

  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin: SubmitHandler<LoginType> = async ({ email, password }) => {
    try {
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.user || !data.session) {
        throw new Error('No user or session data received');
      }

      const supId = data.user.user_metadata.sub;
      const supEmail = data.user.user_metadata.email;
      onLogin(supId, supEmail);

      // console.log(data, 'HTTP RESPONSE');
      navigate('/panel/admin', {
        replace: true,
      });
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

      // console.log(data, 'HTTP RESPONSE');
      // navigate('/panel/...');
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
        <button className="form__btn" type="button" onClick={handleLoginGoogle}>
          Google
        </button>
        <div className="login__btns">
          <NavLink className="login__register" to={'/auth/forgot-pass'}>
            Forgot Password?
          </NavLink>
          <NavLink className="login__register" to={'/auth/register'}>
            Create Account
          </NavLink>
        </div>
        {/* <NavLink to={'/panel/admin'}>GO TO PANEL</NavLink> */}
      </div>
    </div>
  );
};
