import './updatePassPage.scss';
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
      if (error === null) {
        renderMsg = 'Your password has been successfully updated';
      } else {
        throw new ApiError(error.message);
      }

      toast.update(toastInfo, { render: renderMsg, type: 'success', isLoading: false, autoClose: 1500 });
      navigate('/auth/login');
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message, { autoClose: 3000 });
        console.error('Update password error:', error.message);
      }
    }
  };

  return (
    <div className="forgot wrapper">
      <div className="forgot__container">
        <h1 className="forgot__title">Reset Your Password</h1>

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
      </div>
    </div>
  );
};
