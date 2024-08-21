import './forgotPassPage.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { forgotPassSchema, ForgotPassType } from './forgotPassSchema';
import { client } from '../../../supabase/Client';
import { FormInput } from '../../../components/formInput/FormInput';
import { ApiError } from '../../../utils/apiError';
import { toast } from 'react-toastify';

export const ForgotPassPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPassType>({
    resolver: zodResolver(forgotPassSchema),
    mode: 'onChange',
  });

  const handleForgotPass: SubmitHandler<ForgotPassType> = async (formData) => {
    const toastInfo = toast.loading('Loading...');
    try {
      const { error } = await client.auth.resetPasswordForEmail(formData.contactEmail, {
        redirectTo: 'http://localhost:5173/auth/forgot-pass/update-password',
      });

      let renderMsg;
      if (error === null) {
        renderMsg = 'We have send an email';
      } else {
        throw new ApiError(error.message);
      }

      toast.update(toastInfo, { render: renderMsg, type: 'warning', isLoading: false, autoClose: 1500 });
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message, { autoClose: 3000 });
        console.error('Forgot password error:', error.message);
      }
    }
  };

  return (
    <div className="forgot wrapper">
      <div className="forgot__container">
        <h1 className="forgot__title">Get Recovery Email</h1>

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
          <span>Have an account?</span>
          <NavLink className="forgot__register" to={'/auth/login'}>
            Sign in
          </NavLink>
        </div>
      </div>
    </div>
  );
};
