import styles from './settings.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { FormInput } from '../../../../components/formInput/FormInput';
import { createSettingsSchema, SettingsType } from './settingsSchema';
// import { client } from '../../../supabase/Client';
import { useState } from 'react';
import { fetchApi } from '../../../../utils/fetchApi';
import { useAuth } from '../../../../auth/hook/useAuth';

export const Settings = () => {
  // PUT a /api/v1/user/
  /**
    name

    lName

    email

    phone

    image
   */

  const { authState } = useAuth();
  const { user } = authState;
  const settingsSchema = createSettingsSchema(user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsType>({
    resolver: zodResolver(settingsSchema),
    mode: 'onChange',
  });

  const [settingsError, setSettingsError] = useState<string | null>(null);

  const handleUpdate: SubmitHandler<SettingsType> = async (data) => {
    try {
      const formData = new FormData();
      formData.append('_method', 'PUT');
      formData.append('name', data.name);
      formData.append('lName', data.lastName);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      if (data.file && data.file.length > 0) {
        formData.append('image', data.file[0]);
      } else {
        formData.append('image', 'None');
      }

      const resp = await fetchApi('/api/v1/user/', 'POST', '', formData, true, true);

      console.log('ON MY BACKEND', resp);
    } catch (error) {
      if (error instanceof Error) {
        setSettingsError(error.message);
        console.error('Updating error:', error.message);
      } else {
        setSettingsError('An unexpected error occurred');
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <div className={`${styles.settings}`}>
      <div className={`${styles.settings__container}`}>
        <h1 className={`${styles.settings__title}`}>Account Settings</h1>

        {settingsError && <div className="error-message">{settingsError}</div>}

        <form className="form" onSubmit={handleSubmit(handleUpdate)}>
          <FormInput label="" error={errors['file']} id="image-url" type="file" {...register('file')} />

          <FormInput
            label="Name"
            error={errors['name']}
            id="name"
            type="text"
            defaultValue={user?.name}
            notEnabled
            {...register('name')}
          />

          <FormInput
            label="Last Name"
            error={errors['lastName']}
            id="lastName"
            type="text"
            defaultValue={user?.lName}
            notEnabled
            {...register('lastName')}
          />

          <FormInput
            label="Phone Number"
            error={errors['phone']}
            id="phoneN"
            type="text"
            defaultValue={user?.phone}
            notEnabled
            {...register('phone')}
          />

          <FormInput
            label="Email Address"
            error={errors['email']}
            id="email"
            type="email"
            defaultValue={user?.email}
            notEnabled
            {...register('email')}
          />

          <button className={`${styles.form__btn}`} type="submit">
            Modify
          </button>
        </form>
        <div className={`${styles.settings__btns}`}>
          <span>Change Password?</span>
          <NavLink
            className={`${styles.settings__register}`}
            to={`/panel/${user?.role}/settings/change-password`}
          >
            Let's go
          </NavLink>
        </div>
      </div>
    </div>
  );
};
