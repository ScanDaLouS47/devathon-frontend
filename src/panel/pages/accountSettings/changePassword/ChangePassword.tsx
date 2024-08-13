import styles from './changePassword.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { FormInput } from '../../../../components/formInput/FormInput';
import { changePasswordSchema, ChangePasswordType } from './changePasswordSchema';
import { client } from '../../../../supabase/Client';
import { useState } from 'react';
import { useAuth } from '../../../../auth/hook/useAuth';

export const ChangePassword = () => {
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
  const navigate = useNavigate();

  const handleUpdatePassword: SubmitHandler<ChangePasswordType> = async (data) => {
    try {
      const {
        data: { user },
      } = await client.auth.getUser();

      const { data: signInData, error: signInError } = await client.auth.signInWithPassword({
        email: user?.email || '',
        password: data.oldPassword,
      });
      console.log(signInData.user?.id);

      if (signInError) {
        throw new Error('Incorrect credential');
      }

      const resp = await client.auth.updateUser({ password: data.password });

      console.log('ON SUPABASE', resp);
      if (!resp) {
        throw new Error(resp);
      }

      navigate(`/panel/${user?.role}`);
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

        {changePasswordError && <div className={`${styles.error__message}`}>{changePasswordError}</div>}

        <form className="form" onSubmit={handleSubmit(handleUpdatePassword)}>
          <FormInput
            label="Old Password"
            error={errors['oldPassword']}
            id="old-password"
            type="password"
            placeholder="****************"
            {...register('oldPassword')}
          />

          <FormInput
            label="New Password"
            error={errors['password']}
            id="new-password"
            type="password"
            placeholder="****************"
            {...register('password')}
          />

          <FormInput
            label="Repeat Password"
            error={errors['repeatPassword']}
            id="repeat-new-password"
            type="password"
            placeholder="****************"
            {...register('repeatPassword')}
          />

          <button className={`${styles.form__btn}`} type="submit">
            Change Password
          </button>
        </form>
        <div className={`${styles.changePassword__btns}`}>
          <NavLink className={`${styles.changePassword__register}`} to={`/panel/${user?.role}/settings`}>
            Go back
          </NavLink>
          <NavLink
            className={`${styles.changePassword__register}`}
            to={`/panel/${user?.role}/settings/did-forget`}
          >
            Did you forget?
          </NavLink>
        </div>
      </div>
    </div>
  );
};
