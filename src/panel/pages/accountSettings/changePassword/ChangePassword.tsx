import styles from './changePassword.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { FormInput } from '../../../../components/formInput/FormInput';
import { changePasswordSchema, ChangePasswordType } from './changePasswordSchema';
// import { client } from '../../../supabase/Client';
import { useState } from 'react';
import { fetchApi } from '../../../../utils/fetchApi';
import { useAuth } from '../../../../auth/hook/useAuth';

export const ChangePassword = () => {
  // ToDo: change password on Supabase

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
  });

  const [changePasswordError, setChangePasswordError] = useState<string | null>(null);

  const { authState } = useAuth();
  const { user } = authState;

  const handleRegister: SubmitHandler<ChangePasswordType> = async (data) => {
    try {
      const resp = await fetchApi(
        '/api/v1/user/',
        'POST',
        '',
        {
          email: user?.email,
          password: data.password,
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
        setChangePasswordError(error.message);
        console.error('Updating error:', error.message);
      } else {
        setChangePasswordError('An unexpected error occurred');
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <div className={`${styles.changePassword}`}>
      <div className={`${styles.changePassword__container}`}>
        <h1 className={`${styles.changePassword__title}`}>Change Password</h1>

        {changePasswordError && <div className="error-message">{changePasswordError}</div>}

        <form className="form" onSubmit={handleSubmit(handleRegister)}>
          <FormInput
            label="Old Password"
            error={errors['password']}
            id="old-password"
            type="password"
            placeholder="****************"
            {...register('password')}
          />

          <FormInput
            label="New Password"
            error={errors['repeatPassword']}
            id="new-password"
            type="password"
            placeholder="****************"
            notEnabled
            {...register('repeatPassword')}
          />

          <FormInput
            label="Repeat Password"
            error={errors['repeatPassword']}
            id="repeat-new-password"
            type="password"
            placeholder="****************"
            notEnabled
            {...register('repeatPassword')}
          />

          <button className={`${styles.form__btn}`} type="submit">
            Change Password
          </button>
        </form>
        <div className={`${styles.changePassword__btns}`}>
          <NavLink className={`${styles.changePassword__register}`} to={`/panel/${user?.role}/settings`}>
            Return
          </NavLink>
        </div>
      </div>
    </div>
  );
};
