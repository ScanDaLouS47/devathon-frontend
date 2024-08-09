import './registerPage.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { FormInput } from '../../../components/formInput/FormInput';
import { registerSchema, RegisterType } from './registerSchema';
import { FormInputPhone } from '../../../components/formInputPhone/FormInputPhone';
import { client } from '../../../supabase/Client';
import { options } from '../../../data/options';
import { useState } from 'react';
import { fetchApi } from '../../../utils/fetchApi';

export const RegisterPage = () => {
  // POST a /api/v1/create
  /**
    name

    lName

    email

    phone

    password

    image_url
   */

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
      console.log('ON SUPABASE', authData);
      console.log('SUP_ID', authData.user?.user_metadata.sub);

      const resp = await fetchApi(
        '/api/v1/create',
        'POST',
        '',
        {
          name: data.name,
          lName: data.lastName,
          email: data.email,
          phone: data.phone,
          password: authData.user?.user_metadata.sub,
          // password: '123456Aa#',
          image_url: 'None',
        },
        false,
      );
      console.log('ON MY BACKEND', resp);

      if (error) {
        throw new Error(error.message);
      }

      if (!authData.user) {
        throw new Error('No user data received');
      }

      if (!resp) {
        throw new Error('Bad request');
      }

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
          <span>Have an account?</span>
          <NavLink className="register__register" to={'/auth/login'}>
            Sign in
          </NavLink>
        </div>
      </div>
    </div>
  );
};
