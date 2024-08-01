import './registerPage.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { FormInput } from '../../../components/formInput/FormInput';
import { registerSchema, RegisterType } from './registerSchema';
import { FormInputPhone } from '../../../components/formSelect/FormInputPhone';
import { client } from '../../../supabase/Client';
import { options } from '../../../../data/options';
import { useState } from 'react';

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const [registerError, setRegisterError] = useState<string | null>(null);

  const handleRegister: SubmitHandler<RegisterType> = async (data) => {
    try {
      const { data: authData, error } = await client.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            lastName: data.lastName,
            phone: data.phone,
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!authData.user) {
        throw new Error('No user data received');
      }

      console.log('Registration successful:', authData);
      navigate('/auth/login');
    } catch (error) {
      if (error instanceof Error) {
        setRegisterError(error.message);
        console.error('Registration error:', error.message);
      } else {
        setRegisterError('An unexpected error occurred');
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <div className="register wrapper">
      <div className="register__container">
        <h1 className="register__title">Sign Up</h1>

        {registerError && <div className="error-message">{registerError}</div>}

        <form className="form" onSubmit={handleSubmit(handleRegister)}>
          <FormInput
            label="Name"
            error={errors['name']}
            id="name"
            type="text"
            placeholder="John"
            autoFocus
            {...register('name')}
          />

          <FormInput
            label="Last Name"
            error={errors['lastName']}
            id="lastName"
            type="text"
            placeholder="Doe"
            {...register('lastName')}
          />

          <FormInputPhone
            options={options}
            label={'Phone Number'}
            error={errors['phone']}
            register={register('phone', {
              setValueAs: (value) => `${options[0].countryTag ? `+${options[0].countryTag}` : ''}${value}`,
            })}
          />

          <FormInput
            label="Email Address"
            error={errors['email']}
            id="email"
            type="email"
            placeholder="bob@mail.com"
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

          <FormInput
            label="Repeat Password"
            error={errors['repeatPassword']}
            id="RepeatPassword"
            type="password"
            placeholder="****************"
            {...register('repeatPassword')}
          />

          <button className="form__btn" type="submit">
            Register
          </button>
        </form>
        <div className="register__btns">
          <span>Already have an account?</span>
          <NavLink className="register__register" to={'/auth/login'}>
            Sign in
          </NavLink>
        </div>
        {/* <NavLink to={'/panel/admin'}>GO TO PANEL</NavLink> */}
      </div>
    </div>
  );
};
