import styles from './changePassword.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { FormInput } from '../../../../components/formInput/FormInput';
import { changePasswordSchema, ChangePasswordType } from './changePasswordSchema';
import { client } from '../../../../supabase/Client';
import { useAuth } from '../../../../auth/hook/useAuth';
import { ApiError } from '../../../../utils/apiError';
import { toast } from 'react-toastify';
import { ArrowLeftIcon } from '../../../components/icons/ArrowLeftIcon';

export const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
  });
  const { authState } = useAuth();
  const { user } = authState;
  const navigate = useNavigate();

  const handleUpdatePassword: SubmitHandler<ChangePasswordType> = async (data) => {
    const toastInfo = toast.loading('Loading...');
    try {
      const {
        data: { user },
      } = await client.auth.getUser();

      const { error: signInError } = await client.auth.signInWithPassword({
        email: user?.email || '',
        password: data.oldPassword,
      });

      if (signInError) {
        throw new ApiError('Incorrect credentials');
      }

      const resp = await client.auth.updateUser({ password: data.password });

      if (!resp) {
        throw new ApiError('Threw error updating password');
      }

      let renderMsg;
      if (resp.error === null) {
        renderMsg = 'Your password has been successfully updated';
      }

      toast.update(toastInfo, { render: renderMsg, type: 'success', isLoading: false, autoClose: 1500 });
      navigate(`/panel/${user?.role}`);
    } catch (error) {
      if (error instanceof ApiError) {
        toast.update(toastInfo, { render: error.message, type: 'error', isLoading: false, autoClose: 3000 });
        console.error('Updating error:', error.message);
      }
    }
  };

  return (
    <div className={styles.changePassword}>
      <div className={styles.changePassword__container}>
        <h1 className={styles.changePassword__title}>Change Password</h1>

        <form className={styles.form} onSubmit={handleSubmit(handleUpdatePassword)}>
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

          <button className={styles.form__btn} type="submit" aria-label="Change Password">
            Change Password
          </button>
        </form>
        <div className={styles.changePassword__btns}>
          <NavLink
            className={styles.changePassword__register}
            to={`/panel/${user?.role}/settings`}
            aria-label="Go Back"
          >
            <ArrowLeftIcon className={styles.changePassword__goBackIcon} />
            Go back
          </NavLink>
          <NavLink
            className={styles.changePassword__register}
            to={`/panel/${user?.role}/settings/did-forget`}
            aria-label="Did you forget?"
          >
            Did you forget?
          </NavLink>
        </div>
      </div>
    </div>
  );
};
