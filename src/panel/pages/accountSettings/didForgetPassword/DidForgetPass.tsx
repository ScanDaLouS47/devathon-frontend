import styles from './didForgetPass.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { forgotPassSchema, ForgotPassType } from './didForgetPassSchema';
import { client } from '../../../../supabase/Client';
import { useState } from 'react';
import { FormInput } from '../../../../components/formInput/FormInput';
import { useAuth } from '../../../../auth/hook/useAuth';

export const DidForgetPass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPassType>({
    resolver: zodResolver(forgotPassSchema),
    mode: 'onChange',
  });

  const [didForgetPassError, setDidForgetPassError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { authState } = useAuth();
  const { user } = authState;

  const handleForgotPass: SubmitHandler<ForgotPassType> = async (data) => {
    try {
      console.log('Form submitted:', data);
      const { error } = await client.auth.resetPasswordForEmail(data.contactEmail, {
        redirectTo: 'http://localhost:5173/auth/forgot-pass/update-password',
      });

      if (error) {
        throw new Error(error.message);
      }

      setSuccessMessage('We have send an email*');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Launched error:', error.message);
        setDidForgetPassError(`${error.message}*`);
      } else {
        setDidForgetPassError('An unexpected error occurred*');
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <div className={`${styles.didForget}`}>
      <div className={`${styles.didForget__container}`}>
        <h1 className={`${styles.didForget__title}`}>Get Recovery Email</h1>

        {didForgetPassError && <span className={`${styles.error__message}`}>{didForgetPassError}</span>}

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
        {successMessage && <span className={`${styles.didForget__message}`}>{successMessage}</span>}
      </div>
    </div>
  );
};
