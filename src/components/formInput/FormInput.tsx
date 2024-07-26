import React from 'react';
import { FieldError } from 'react-hook-form';
import { WarningIcon } from '../icons/WarningIcon';
import './formInput.scss';

type InputProps = React.ComponentProps<'input'> & {
  label: string;
  error: FieldError | undefined;
};
export const FormInput = React.forwardRef(
  ({ label, error, ...inputProps }: InputProps, ref: React.Ref<HTMLInputElement>) => {
    const hasError = error ? 'row__error' : '';

    return (
      <div className="row">
        <label className={`row__label ${hasError}`} htmlFor={inputProps.id}>
          {label && `${label}*`}
        </label>
        <div className={`row__container ${hasError}`}>
          <input ref={ref} className="row__input" autoComplete="off" {...inputProps} />
          {error && <WarningIcon className="row__icon" />}
        </div>
        <span className="row__message">{error?.message} </span>
      </div>
    );
  },
);
