import styles from './registerPage.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormInput } from '../../../components/formInput/FormInput';
import { FormInputPhone } from '../../../components/formInputPhone/FormInputPhone';
import { options } from '../../../data/options';
import { IRespForUser } from '../../../interfaces';
import { client } from '../../../supabase/Client';
import { ApiError } from '../../../utils/apiError';
import { fetchApi } from '../../../utils/fetchApi';
import { registerSchema, RegisterType } from './registerSchema';

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

  const handleRegister: SubmitHandler<RegisterType> = async (data) => {
    const toastInfo = toast.loading('Loading...');

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

      const resp = await fetchApi<IRespForUser>(
        '/api/v1/create',
        'POST',
        '',
        {
          name: data.name,
          lName: data.lastName,
          email: data.email,
          phone: data.phone,
          password: authData.user?.user_metadata.sub,
          image_url: 'None',
        },
        false,
        false,
      );

      if (error) {
        throw new ApiError(error.message);
      }

      if (!resp.ok) {
        throw new ApiError(resp.msg[0]);
      }

      toast.update(toastInfo, { render: 'We have send an email', type: 'warning', isLoading: false, autoClose: 1500 });

      navigate('/auth/login');
    } catch (error) {
      if (error instanceof ApiError) {
        toast.update(toastInfo, { render: error.message, type: 'error', isLoading: false, autoClose: 3000 });
        console.error('Registration error:', error.message);
      }
    }
  };

  return (
    <div className={`${styles.register} wrapper`}>
      <div className={styles.register__container}>
        <h1 className={styles.register__title}>Sign Up</h1>

        <form className={styles.form} onSubmit={handleSubmit(handleRegister)}>
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

          <button className={styles.form__btn} type="submit" aria-label='Register'>
            Register
          </button>
        </form>
        <div className={styles.register__btns}>
          <span>Have an account?</span>
          <NavLink className={styles.register__register} to={'/auth/login'} aria-label='Sign In'>
            Sign in
          </NavLink>
        </div>
      </div>
    </div>
  );
};
