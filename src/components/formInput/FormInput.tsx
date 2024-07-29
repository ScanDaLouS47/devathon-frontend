import React, { useState } from 'react';
import { FieldError } from 'react-hook-form';
import { WarningIcon } from '../icons/WarningIcon';
import './formInput.scss';
import HidePassword from '../icons/HidePassword';
import ShowPassword from '../icons/ShowPassword';

type InputProps = React.ComponentProps<'input'> & {
  label: string;
  error: FieldError | undefined;
};

export const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, type, ...inputProps }, ref) => {
    const hasError = error ? 'row__error' : '';

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const inputType = showPassword && type === 'password' ? 'text' : type;

    return (
      <div className="row">
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
              {showPassword ? <ShowPassword width="21" /> : <HidePassword width="21" />}
            </button>
          )}

          {error && <WarningIcon className="row__icon" />}
        </div>
        <span className="row__message">{error?.message}</span>
      </div>
    );
  },
);

FormInput.displayName = 'FormInput';
