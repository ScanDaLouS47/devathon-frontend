import './formInput.scss';
import React, { useState } from 'react';
import { FieldError } from 'react-hook-form';
import { WarningIcon } from '../icons/WarningIcon';
import HidePassword from '../icons/HidePassword';
import ShowPassword from '../icons/ShowPassword';
import UploadIcon from '../icons/UploadIcon';

type InputProps = React.ComponentProps<'input'> & {
  label: string;
  error: FieldError | undefined;
};

export const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, type, ...inputProps }, ref) => {
    const hasError = error ? 'row__error' : '';

    const [showPassword, setShowPassword] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | undefined>('');

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const inputType = showPassword && type === 'password' ? 'text' : type;

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
        return (result += charts.charAt(random));
      }
    };

    const changingImg = randomChart(3);
    const imgPreview = imageSrc ? imageSrc : `https://robohash.org/user@m${changingImg}.co.ea`;

    return (
      <div className="row">
        {type === 'file' ? (
          <div className="row__input--flex">
            <div className="row__input--imgContainer">
              <img src={imgPreview} alt="Preview" className="row__image-preview" />
              <label htmlFor={inputProps.id}>
                <UploadIcon className="row__input--icon" />
                <input
                  ref={ref}
                  className="row__input"
                  autoComplete="off"
                  {...inputProps}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        ) : (
          <>
            <label className={`row__label ${hasError}`} htmlFor={inputProps.id}>
              {label && `${label}*`}
            </label>
            <div className={`row__container ${hasError}`}>
              <input ref={ref} className="row__input" autoComplete="off" {...inputProps} type={inputType} />

              {type === 'password' && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="row__toggleButton"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <ShowPassword className="row__toggleButton__icon" />
                  ) : (
                    <HidePassword className="row__toggleButton__icon" />
                  )}
                </button>
              )}

              {error && <WarningIcon className="row__icon" />}
            </div>
          </>
        )}

        <span className="row__message">{error?.message}</span>
      </div>
    );
  },
);

FormInput.displayName = 'FormInput';
