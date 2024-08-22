import React, { useState } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { useAuth } from '../../auth/hook/useAuth';
import UploadIcon from '../icons/UploadIcon';
import styles from './formInputImgPreview.module.scss';

type InputProps = React.ComponentProps<'input'> & {
  error: FieldError | Merge<FieldError, FieldErrorsImpl<Record<string, undefined>>> | undefined;
  type: string;
};

export const FormInputFileImgPreview = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, type, ...inputProps }, ref) => {
    const hasError = error ? 'row__error' : '';

    const { authState } = useAuth();
    const { user } = authState;
    const [imageSrc, setImageSrc] = useState<string | undefined>(user?.image_url);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageSrc(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    const randomChart = (chartLength: number) => {
      const charts = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      const random = Math.floor(Math.random() * charts.length);
      let result = '';

      for (let i = 0; i < chartLength; i++) {
        result += charts.charAt(random);
      }

      return result;
    };

    const changingImg = randomChart(3);
    const imgPreview = imageSrc ? imageSrc : `https://robohash.org/user@m${changingImg}.co.ea`;

    return (
      <>
        {type === 'file' && (
          <div className={styles.row}>
            <div className={styles.row__position}>
              <div className={styles.row__fileContainer}>
                <img src={imgPreview} alt="Preview" className={styles.row__preview} />
                <label htmlFor={inputProps.id} className={`${styles.row__inputContainer} ${hasError}`}>
                  <UploadIcon className={styles.row__inputIcon} />
                  <input
                    ref={ref}
                    className={styles.row__input}
                    autoComplete="off"
                    {...inputProps}
                    type={type}
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
            <span className={styles.row__message}>{error?.message as string}</span>
          </div>
        )}
      </>
    );
  },
);

FormInputFileImgPreview.displayName = 'FormInputFileImgPreview';
