import styles from './didForgetPass.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { forgotPassSchema, ForgotPassType } from './didForgetPassSchema';
import { client } from '../../../../supabase/Client';
import { FormInput } from '../../../../components/formInput/FormInput';
import { useAuth } from '../../../../auth/hook/useAuth';
import { ApiError } from '../../../../utils/apiError';
import { toast } from 'react-toastify';

export const DidForgetPass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPassType>({
    resolver: zodResolver(forgotPassSchema),
    mode: 'onChange',
  });

  const { authState } = useAuth();
  const { user } = authState;

  const handleForgotPass: SubmitHandler<ForgotPassType> = async (data) => {
    const toastInfo = toast.loading('Loading...');
    try {
      const { error } = await client.auth.resetPasswordForEmail(data.contactEmail, {
        redirectTo: 'http://localhost:5173/auth/forgot-pass/update-password',
      });

      if (error) {
        throw new ApiError(error.message);
      }

      let renderMsg;
      if (error === null) {
        renderMsg = 'We have send an email';
      }

      toast.update(toastInfo, { render: renderMsg, type: 'warning', isLoading: false, autoClose: 1500 });
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message, { autoClose: 3000 });
        console.error('Did forget password error', error.message);
      }
    }
  };

  return (
    <div className={`${styles.didForget}`}>
      <div className={`${styles.didForget__container}`}>
        <h1 className={`${styles.didForget__title}`}>Get Recovery Email</h1>

        <form className={`${styles.form}`} onSubmit={handleSubmit(handleForgotPass)}>
          <FormInput
            label="Contact Email"
            error={errors['contactEmail']}
            id="contact-email"
            type="email"
            placeholder="bob@bob.com"
            {...register('contactEmail')}
          />

          <button className={`${styles.form__btn}`} type="submit">
            Send
          </button>
        </form>
        <div className={`${styles.didForget__btns}`}>
          <NavLink className={`${styles.didForget__register}`} to={`/panel/${user?.role}/settings`}>
            Go back
          </NavLink>
        </div>
      </div>
    </div>
  );
};
