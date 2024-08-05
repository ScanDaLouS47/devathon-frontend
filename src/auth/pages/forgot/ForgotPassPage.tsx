import './forgotPassPage.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { forgotPassSchema, ForgotPassType } from './forgotPassSchema';
import { client } from '../../../supabase/Client';
import { useState } from 'react';
import { FormInput } from '../../../components/formInput/FormInput';

export const ForgotPassPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPassType>({
    resolver: zodResolver(forgotPassSchema),
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const [forgotPassError, setForgotPassError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleForgotPass: SubmitHandler<ForgotPassType> = async (data) => {
    try {
      console.log('Form submitted:', data);
      const { error } = await client.auth.resetPasswordForEmail(data.contactEmail, {
        redirectTo: 'http://localhost:5173/auth/forgot-pass/update-password',
      });

      if (error) {
        throw new Error(error.message);
      }

      setSuccessMessage('A recovery link has been sent to your email*');
      // navigate('/auth/forgot-pass/update-password');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Launched error:', error.message);
      } else {
        setForgotPassError('An unexpected error occurred*');
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <div className="forgot wrapper">
      <div className="forgot__container">
        <h1 className="forgot__title">Get Recovery Email</h1>

        {forgotPassError && <span className="forgot__message--error">{forgotPassError}</span>}

        <form className="form" onSubmit={handleSubmit(handleForgotPass)}>
          <FormInput
            label="Contact Email"
            error={errors['contactEmail']}
            id="contact-email"
            type="email"
            placeholder="bob@bob.com"
            {...register('contactEmail')}
          />

          <button className="form__btn" type="submit">
            Send
          </button>
        </form>
        <div className="forgot__btns">
          <span>Already have an account?</span>
          <NavLink className="forgot__register" to={'/auth/login'}>
            Sign in
          </NavLink>
        </div>
        {successMessage && <span className="forgot__message">{successMessage}</span>}
      </div>
    </div>
  );
};
