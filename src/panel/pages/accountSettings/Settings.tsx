import styles from './settings.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { FormInput } from '../../../components/formInput/FormInput';
import { settingsSchema, SettingsType } from './settingsSchema';
// import { client } from '../../../supabase/Client';
import { useState } from 'react';
import { fetchApi } from '../../../utils/fetchApi';
import { useAuth } from '../../../auth/hook/useAuth';

export const Settings = () => {
  // PUT a /api/v1/user/
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
  } = useForm<SettingsType>({
    resolver: zodResolver(settingsSchema),
    mode: 'onChange',
  });

  const [settingsError, setRegisterError] = useState<string | null>(null);

  const { authState } = useAuth();
  const { user } = authState;

  const phonePrefix = user?.phone?.includes('+') ? user?.phone?.slice(0, 3) : user?.phone;

  const handleRegister: SubmitHandler<SettingsType> = async (data) => {
    try {
      const resp = await fetchApi(
        '/api/v1/user/',
        'POST',
        '',
        {
          name: data.name,
          lName: data.lastName,
          email: data.email,
          phone: phonePrefix + data.phone,
          image_url: 'None',
        },
        true,
        true,
      );
      console.log('ON MY BACKEND', resp);

      if (!resp) {
        throw new Error('Bad request');
      }
    } catch (error) {
      if (error instanceof Error) {
        setRegisterError(error.message);
        console.error('Updating error:', error.message);
      } else {
        setRegisterError('An unexpected error occurred');
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <div className={`${styles.settings}`}>
      <div className={`${styles.settings__container}`}>
        <h1 className={`${styles.settings__title}`}>Account Settings</h1>

        {settingsError && <div className="error-message">{settingsError}</div>}

        <form className="form" onSubmit={handleSubmit(handleRegister)}>
          <FormInput
            label=""
            error={errors['file']}
            id="image-url"
            type="file"
            placeholder={user?.image_url}
            {...register('file')}
          />

          <FormInput
            label="Name"
            error={errors['name']}
            id="name"
            type="text"
            placeholder={user?.name}
            {...register('name')}
          />

          <FormInput
            label="Last Name"
            error={errors['lastName']}
            id="lastName"
            type="text"
            placeholder={user?.lName}
            {...register('lastName')}
          />

          <FormInput
            label="Phone Number"
            error={errors['phone']}
            id="phoneN"
            type="text"
            placeholder={user?.phone}
            {...register('phone')}
          />

          <FormInput
            label="Email Address"
            error={errors['email']}
            id="email"
            type="email"
            placeholder={user?.email}
            {...register('email')}
          />

          <button className={`${styles.form__btn}`} type="submit">
            Modify
          </button>
        </form>
        <div className={`${styles.settings__btns}`}>
          <NavLink className={`${styles.settings__register}`} to={'/auth/forgot-pass'}>
            Change password?
          </NavLink>
        </div>
      </div>
    </div>
  );
};
