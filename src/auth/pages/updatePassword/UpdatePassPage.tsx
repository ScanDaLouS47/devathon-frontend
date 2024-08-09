import './updatePassPage.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { updatePassSchema, UpdatePassType } from './updatePassSchema';
import { client } from '../../../supabase/Client';
import { useState } from 'react';
import { FormInput } from '../../../components/formInput/FormInput';

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

  const [updatePassError, setUpdatePassError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleUpdatePass: SubmitHandler<UpdatePassType> = async (data) => {
    try {
      const { error } = await client.auth.updateUser({ password: data.newPassword });

      if (error) {
        throw new Error(error.message);
      }

      setSuccessMessage('Your password has been successfully updated*');
      navigate('/auth/login');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Launched error:', error.message);
      } else {
        setUpdatePassError('An unexpected error occurred*');
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <div className="forgot wrapper">
      <div className="forgot__container">
        <h1 className="forgot__title">Reset Your Password</h1>

        {updatePassError && <span className="forgot__message--error">{updatePassError}</span>}

        <form className="form" onSubmit={handleSubmit(handleUpdatePass)}>
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
        {successMessage && <span className="forgot__message">{successMessage}</span>}
      </div>
    </div>
  );
};
