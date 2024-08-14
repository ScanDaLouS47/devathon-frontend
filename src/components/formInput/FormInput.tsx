import './formInput.scss';
import React, { useState } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { WarningIcon } from '../icons/WarningIcon';
import HidePassword from '../icons/HidePassword';
import ShowPassword from '../icons/ShowPassword';
import UploadIcon from '../icons/UploadIcon';
import EditingIcon from '../icons/EditingIcon';
import { useAuth } from '../../auth/hook/useAuth';

type InputProps = React.ComponentProps<'input'> & {
  label: string;
  error: FieldError | Merge<FieldError, FieldErrorsImpl<Record<string, undefined>>> | undefined;
  enabled?: boolean;
};

export const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, type, enabled = false, ...inputProps }, ref) => {
    const hasError = error ? 'row__error' : '';
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const inputType = showPassword && type === 'password' ? 'text' : type;
    const [isEnabled, setIsEnabled] = useState(!enabled);
    const toggleEnable = () => setIsEnabled(!isEnabled);
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
      <div className="row">
        {type === 'file' ? (
          <div className="row__input__file">
            <div className="row__input__file--imgContainer">
              <img src={imgPreview} alt="Preview" className="row__input__file--imgPreview" />
              <label htmlFor={inputProps.id} className="row__input__file--imgLabel">
                <UploadIcon className="row__input__file--icon" />
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
              <input
                ref={ref}
                className="row__input"
                autoComplete="off"
                {...inputProps}
                type={inputType}
                disabled={enabled} // Modify `enabled` with `!isEnable` to use an enabling button for each input
              />

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

              {/* Uncomment this part out if you want to use an enabling button for each input */}
              {/* {enabled && (type === 'text' || type === 'email') ? (
                <button
                  type="button"
                  onClick={toggleEnable}
                  className="row__toggleButton"
                  aria-label={isEnabled ? 'Disable input' : 'Enable input'}
                >
                  {isEnabled ? (
                    <EditingIcon className="row__toggleButton__icon" />
                  ) : (
                    <EditingIcon className="row__toggleButton__icon" />
                  )}
                </button>
              ) : null} */}

              {error && <WarningIcon className="row__icon" />}
            </div>
          </>
        )}

        <span className="row__message">{error?.message as string}</span>
      </div>
    );
  },
);

FormInput.displayName = 'FormInput';
