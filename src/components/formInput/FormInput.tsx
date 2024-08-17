import './formInput.scss';
import React, { useState } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { WarningIcon } from '../icons/WarningIcon';
import HidePassword from '../icons/HidePassword';
import ShowPassword from '../icons/ShowPassword';

type InputProps = React.ComponentProps<'input'> & {
  label: string;
  error: FieldError | Merge<FieldError, FieldErrorsImpl<Record<string, undefined>>> | undefined;
};

export const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, type, ...inputProps }, ref) => {
    const hasError = error ? 'row__error' : '';
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
      <div className="row">
        <label className={`row__label ${hasError}`} htmlFor={inputProps.id}>
          {label && `${label}*`}
        </label>
        <div className={`row__container ${hasError}`}>
          <input ref={ref} className="row__input" autoComplete="off" {...inputProps} type={type} />

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

        <span className="row__message">{error?.message as string}</span>
      </div>
    );
  },
);

FormInput.displayName = 'FormInput';
