import styles from './settings.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { FormInput } from '../../../../components/formInput/FormInput';
import { createSettingsSchema, SettingsType } from './settingsSchema';
import { useEffect, useState } from 'react';
import { fetchApi } from '../../../../utils/fetchApi';
import { useAuth } from '../../../../auth/hook/useAuth';
import EditingIcon from '../../../../components/icons/EditingIcon';

export const Settings = () => {
  // POST a /api/v1/user/
  /**
    _method: PUT

    name

    lName

    email

    phone

    image
   */

  // GET a /api/v1/user/profile

  const { authState, updateUser } = useAuth();
  const { user } = authState;
  const settingsSchema = createSettingsSchema(user);
  const [settingsError, setSettingsError] = useState<string | null>(null);
  const prefix = user?.phone?.slice(0, 3);
  const phoneWithoutPrefix = user?.phone?.slice(3);
  const [isEnable, setIsEnable] = useState(false);
  const enabledClass = isEnable ? `${styles.form__enableBtn} ${styles.active}` : `${styles.form__enableBtn}`;
  const toggleEnable = () => setIsEnable(!isEnable);

  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    formState: { errors /* , isDirty */ },
  } = useForm<SettingsType>({
    resolver: zodResolver(settingsSchema),
    mode: 'onChange',
  });

  useEffect(() => setFocus('name'), [isEnable, setFocus]);
  useEffect(() => {
    if (user) {
      reset({
        name: user?.name || '',
        lastName: user?.lName || '',
        email: user?.email || '',
        phone: phoneWithoutPrefix || '',
        // ToDo: Fix response with backend. Return file is needed
        // Realmente no hay ningún archivo pre-cargado, hay
        // solo una preview de la img que se expone a través
        // de un string (URL) y se necesita un File o
        // FileList. Debería recibir del backend el archivo
        // que se le envió para poder resolver el problema.
        // Por este motivo `isDirty` no se puede utilizar
        file: user?.image_url,
      });
    }
  }, [user, phoneWithoutPrefix, reset]);

  const handleUpdate: SubmitHandler<SettingsType> = async (data) => {
    try {
      // if (!isDirty) {
      //   setSettingsError('Please, modify at least one input');
      //   return;
      // }

      const formData = new FormData();
      formData.append('_method', 'PUT');
      formData.append('name', data.name);
      formData.append('lName', data.lastName);
      formData.append('email', data.email);
      formData.append('phone', `${prefix}${data.phone}`);
      data.file && data.file.length > 0
        ? formData.append('image', data.file[0])
        : formData.append('image', 'None');

      const resp = await fetchApi('/api/v1/user/', 'POST', '', formData, true, true);

      console.log('ON MY BACKEND', resp);

      const updUser = await fetchApi('/api/v1/user/profile', 'GET', '', undefined, true, true);

      updateUser({
        ...user,
        name: updUser.data.name,
        lName: updUser.data.lName,
        email: updUser.data.email,
        phone: updUser.data.phone,
        image_url: updUser.data.image_url,
      });
    } catch (error) {
      if (error instanceof Error) {
        setSettingsError(error.message);
        console.error('Updating error:', error.message);
      } else {
        setSettingsError('An unexpected error occurred');
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <div className={`${styles.settings}`}>
      <div className={`${styles.settings__container}`}>
        <h1 className={`${styles.settings__title}`}>Account Settings</h1>

        {settingsError && <div className={`${styles.error__message}`}>{settingsError}</div>}
        <form className={`${styles.form}`} onSubmit={handleSubmit(handleUpdate)}>
          <div className={`${styles.form__columns}`}>
            <div className={`${styles.form__column}`}>
              <div className={`${styles.form__enableContainer}`}>
                <button className={enabledClass} type="button" onClick={toggleEnable}>
                  <EditingIcon className={`${styles.form__enableBtnIcon}`} />
                </button>
              </div>
              <FormInput
                label="Name"
                error={errors['name']}
                id="name"
                type="text"
                enabled={!isEnable}
                {...register('name')}
              />

              <FormInput
                label="Last Name"
                error={errors['lastName']}
                id="lastName"
                type="text"
                enabled={!isEnable}
                {...register('lastName')}
              />

              <FormInput
                label="Phone Number"
                error={errors['phone']}
                id="phoneN"
                type="text"
                enabled={!isEnable}
                {...register('phone')}
              />

              <FormInput
                label="Email Address"
                error={errors['email']}
                id="email"
                type="email"
                enabled={!isEnable}
                {...register('email')}
              />
            </div>

            <div className={`${styles.form__column}`}>
              <FormInput label="" error={errors['file']} id="image-url" type="file" {...register('file')} />

              <button className={`${styles.form__btn}`} type="submit">
                Modify
              </button>
            </div>
          </div>
        </form>
        <div className={`${styles.settings__btns}`}>
          <span>Change Password?</span>
          <NavLink
            className={`${styles.settings__register}`}
            to={`/panel/${user?.role}/settings/change-password`}
          >
            Let's go
          </NavLink>
        </div>
      </div>
    </div>
  );
};
