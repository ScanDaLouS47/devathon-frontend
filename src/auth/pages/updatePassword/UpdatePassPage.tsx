import styles from './updatePassPage.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { updatePassSchema, UpdatePassType } from './updatePassSchema';
import { client } from '../../../supabase/Client';
import { FormInput } from '../../../components/formInput/FormInput';
import { ApiError } from '../../../utils/apiError';
import { toast } from 'react-toastify';

export const UpdatePassPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePassType>({
    resolver: zodResolver(updatePassSchema),
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const handleUpdatePass: SubmitHandler<UpdatePassType> = async (data) => {
    const toastInfo = toast.loading('Loading...');
    try {
      const { error } = await client.auth.updateUser({ password: data.newPassword });

      let renderMsg;
      if (error) {
        throw new ApiError(error.message);
      } else {
        renderMsg = 'Your password has been successfully updated';
      }

      toast.update(toastInfo, { render: renderMsg, type: 'success', isLoading: false, autoClose: 1500 });
      navigate('/auth/login');
    } catch (error) {
      if (error instanceof ApiError) {
        toast.update(toastInfo, { render: error.message, type: 'error', isLoading: false, autoClose: 3000 });
        console.error('Update password error:', error.message);
      }
    }
  };

  return (
    <div className={`${styles.forgot} wrapper`}>
      <div className={styles.forgot__container}>
        <h1 className={styles.forgot__title}>Reset Your Password</h1>

        <form className={styles.form} onSubmit={handleSubmit(handleUpdatePass)}>
          <FormInput
            label="Create New Password"
            error={errors['newPassword']}
            id="new-password"
            type="password"
            placeholder="****************"
            {...register('newPassword')}
          />

          <FormInput
            label="Repeat New Password"
            error={errors['repeatNewPassword']}
            id="repeat-new-password"
            type="password"
            placeholder="****************"
            {...register('repeatNewPassword')}
          />

          <button className={styles.form__btn} type="submit" aria-label='Send'>
            Send
          </button>
        </form>
        <div className={styles.forgot__btns}>
          <span>Have an account?</span>
          <NavLink className={styles.forgot__register} to={'/auth/login'} aria-label='Sign In'>
            Sign in
          </NavLink>
        </div>
      </div>
    </div>
  );
};
