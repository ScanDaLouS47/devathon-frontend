import React from 'react';
import { FieldError } from 'react-hook-form';
import './checkBox.scss';

type InputProps = React.ComponentProps<'input'> & {
  label: string;
  error: FieldError | undefined;
};

export const CheckBox = React.forwardRef(
  ({ label, error, ...inputProps }: InputProps, ref: React.Ref<HTMLInputElement>) => {
    const hasError = error?.message ? 'error' : '';

    return (
      <div className="checkBox">
        <input className={`checkBox__input ${hasError}`} type="checkbox" ref={ref} {...inputProps} />
        <label className={`checkBox__lavel ${hasError}`} htmlFor={inputProps.id}>
          {label}*
        </label>
      </div>
    );
  },
);
