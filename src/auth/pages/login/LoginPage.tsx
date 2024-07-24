import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { FormInput } from '../../../components/formInput/FormInput';
import './loginPage.scss';
import { loginSchema, LoginType } from './losginSchema';

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  const handleLogin: SubmitHandler<LoginType> = (data) => {
    console.log(data);
    // navigate('/panel/admin');
  };
  return (
    <div className="login wrapper">
      <div className="login__container">
        <h1 className="login__title">Welcome Back</h1>

        <form className="form" onSubmit={handleSubmit(handleLogin)}>
          <FormInput
            label="Email Addres"
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
        <div className="login__btns">
          <NavLink className="login__register" to={''}>
            Forgot Password?
          </NavLink>
          <NavLink className="login__register" to={'/auth/register'}>
            Create Account
          </NavLink>
        </div>
        <NavLink to={'/panel/admin'}>GO TO PANEL</NavLink>
      </div>
    </div>
  );
};
