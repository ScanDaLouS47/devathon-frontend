import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../../../auth/hook/useAuth';
import { FormInput } from '../../../../components/formInput/FormInput';
import { FormInputFileImgPreview } from '../../../../components/formInputImgFile/FormInputFileImgPreview';
import EditingIcon from '../../../../components/icons/EditingIcon';
import { IRespForUser } from '../../../../interfaces/respForUser.interface';
import { ApiError } from '../../../../utils/apiError';
import { fetchApi } from '../../../../utils/fetchApi';
import styles from './settings.module.scss';
import { createSettingsSchema, SettingsType } from './settingsSchema';

export const Settings = () => {
  const { authState, updateUser } = useAuth();
  const { user } = authState;
  const settingsSchema = createSettingsSchema(user);
  const prefix = user?.phone?.slice(0, 3);
  const phoneWithoutPrefix = user?.phone?.slice(3);
  const [isEnable, setIsEnable] = useState(false);
  const enabledClass = isEnable ? `${styles.form__enableBtn} ${styles.active}` : `${styles.form__enableBtn}`;
  const toggleEnable = () => setIsEnable(!isEnable);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<SettingsType>({
    resolver: zodResolver(settingsSchema),
    mode: 'onChange',
    defaultValues: {
      name: user?.name,
      lastName: user?.lName,
      email: user?.email,
      phone: phoneWithoutPrefix,
      file: user?.image_url,
    },
  });

  useEffect(() => {
    setFocus('name');
  }, [isEnable, setFocus]);

  const handleUpdate: SubmitHandler<SettingsType> = async (data) => {
    const toastInfo = toast.loading('Loading...');
    try {
      const formData = new FormData();
      formData.append('_method', 'PUT');
      formData.append('name', data.name);
      formData.append('lName', data.lastName);
      formData.append('email', data.email);
      formData.append('phone', `${prefix}${data.phone}`);
      data.file && data.file.length > 0
        ? formData.append('image', data.file[0])
        : formData.append('image', 'None');

      const udpResp = await fetchApi<IRespForUser>('/api/v1/user/', 'POST', '', formData, true, true);

      console.log(udpResp);
      

      if (!udpResp.ok) {
        throw new ApiError(udpResp.msg);
      }

      if (udpResp.data) {
        updateUser(udpResp.data);
        toast.update(toastInfo, { render: udpResp.msg, type: 'success', isLoading: false, autoClose: 1500 });
      }
    } catch (error) {
      if (error instanceof ApiError) {
        toast.update(toastInfo, { render: error.message, type: 'error', isLoading: false, autoClose: 3000 });
        console.error('Updating error:', error.message);
      }
    }
  };

  return (
    <div className={styles.settings}>
      <div className={styles.settings__container}>
        <h1 className={styles.settings__title}>Account Settings</h1>

        <form className={styles.form} onSubmit={handleSubmit(handleUpdate)}>
          <div className={styles.form__columns}>
            <div className={styles.form__column}>
              <div className={styles.form__enableContainer}>
                <button className={enabledClass} type="button" onClick={toggleEnable} aria-label="Editing">
                  <EditingIcon className={styles.form__enableBtnIcon} />
                </button>
              </div>
              <FormInput
                label="Name"
                error={errors['name']}
                id="name"
                type="text"
                disabled={!isEnable}
                {...register('name')}
              />

              <FormInput
                label="Last Name"
                error={errors['lastName']}
                id="lastName"
                type="text"
                disabled={!isEnable}
                {...register('lastName')}
              />

              <FormInput
                label="Phone Number"
                error={errors['phone']}
                id="phoneN"
                type="text"
                disabled={!isEnable}
                {...register('phone')}
              />

              <FormInput
                label="Email Address"
                error={errors['email']}
                id="email"
                type="email"
                disabled={!isEnable}
                {...register('email')}
              />
            </div>

            <div className={styles.form__column}>
              <FormInputFileImgPreview
                error={errors['file']}
                id="image-url"
                type="file"
                {...register('file')}
              />
              <button className={styles.form__btn} type="submit" aria-label="Modify">
                Modify
              </button>
            </div>
          </div>
        </form>
        <div className={styles.settings__btns}>
          <span>Change Password?</span>
          <NavLink
            className={styles.settings__register}
            to={`/panel/${user?.role}/settings/change-password`}
            aria-label="Let's go"
          >
            Let's go
          </NavLink>
        </div>
      </div>
    </div>
  );
};
