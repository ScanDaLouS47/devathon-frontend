import styles from './formInput.module.scss';
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
  ({ label, error, ...inputProps }, ref) => {
    const hasError = error ? `${styles.row__error}` : '';
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const inputType = showPassword && inputProps.type === 'password' ? 'text' : inputProps.type;

    return (
      <div className={styles.row}>
        <label className={`${styles.row__label} ${hasError}`} htmlFor={inputProps.id}>
          {label && `${label}*`}
        </label>
        <div className={`${styles.row__container} ${hasError}`}>
          <input
            ref={ref}
            className={styles.row__input}
            autoComplete="off"
            {...inputProps}
            type={inputType}
          />

          {inputProps.type === 'password' && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={styles.row__toggleButton}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <ShowPassword className={styles.row__toggleButton__icon} />
              ) : (
                <HidePassword className={styles.row__toggleButton__icon} />
              )}
            </button>
          )}

          {error && <WarningIcon className={styles.row__icon} />}
        </div>

        <span className={styles.row__message}>{error?.message as string}</span>
      </div>
    );
  },
);

FormInput.displayName = 'FormInput';
