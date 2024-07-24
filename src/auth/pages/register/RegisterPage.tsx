import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { FormInput } from '../../../components/formInput/FormInput';
import './registerPage.scss';
import { registerSchema, RegisterType } from './registerSchema';
import { useEffect, useRef, useState } from 'react';
import { client } from '../../../supabase/Client';

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });
  const navigate = useNavigate();

  const watchFields = watch();

  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    const isFilled =
      watchFields.name !== undefined &&
      watchFields.lastName !== undefined &&
      watchFields.email !== undefined &&
      watchFields.password !== undefined &&
      watchFields.repeatPassword !== undefined &&
      watchFields.name !== '' &&
      watchFields.lastName !== '' &&
      watchFields.email !== '' &&
      watchFields.password !== '' &&
      watchFields.repeatPassword !== '';

    setIsDisabled(!isFilled);
  }, [watchFields]);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleRegister: SubmitHandler<RegisterType> = async(data) => {
    console.log(data);
    const resp = await client.auth.signUp({
      email: watchFields.email,
      password: watchFields.password,
    });

    (resp.error) && console.log(resp.error);
    // navigate('/panel/admin');

    useEffect(() => {
      client.auth.onAuthStateChange((event, session) => {
  
        (!session) ? navigate('/') : navigate('/home');      
  
        console.log(event, 'EVENT');
        console.log(session, '##session');      
      })
      
    }, [])
  };

  return (
    <div className="register wrapper">
      <div className="register__container">
        <h1 className="register__title">Sign Up</h1>

        <form className="form" onSubmit={handleSubmit(handleRegister)}>
          <FormInput
            label="Name"
            error={errors['name']}
            id="name"
            type="name"
            placeholder="John"
            autoFocus
            {...register('name')}
          />

          <FormInput
            label="lastName"
            error={errors['lastName']}
            id="lastName"
            type="lastName"
            placeholder="Doe"
            {...register('lastName')}
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

          <button className="form__btn" type="submit" disabled={isDisabled}>
            Register
          </button>
        </form>
        <div className="register__btns">
          <span>Already have an account?</span>
          <NavLink className="register__register" to={'/auth/login'}>
            Sign in
          </NavLink>
        </div>
        <NavLink to={'/panel/admin'}>GO TO PANEL</NavLink>
      </div>
    </div>
  );
};
