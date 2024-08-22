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

    console.log(error?.message);
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

// const InputRow = styled.div`
//   width: 100%;
//   display: flex;

//   gap: 0.3rem;
// `;

// const InputLabel = styled.label<{ $error: boolean }>`
//   color: ${(props) => (props.$error ? 'rgb(237, 74, 74)' : '#f4f4f5')};
//   font-weight: 600;
// `;
// const InputContainer = styled.div<{ $error: boolean }>`
//   border: ${(props) => (props.$error ? '0.125rem solid rgb(237, 74, 74)' : '0.125rem solid transparent')};
//   padding: 0 1rem;
//   border-radius: 0.3125rem;
//   background: var(--bg-gradient);
//   box-shadow: var(--box-shadow);
//   display: flex;
//   justify-content: space-between;
//   input {
//     width: 100%;
//     outline: 0.125rem solid transparent;
//     appearance: revert;
//     padding: 0.75rem 0;
//   }
//   svg {
//     color: rgb(237, 74, 74);
//     width: 1rem;
//   }
// `;
// const InputMessage = styled.span`
//   font-size: 0.75rem;
//   font-weight: 600;
//   line-height: 1rem;
//   color: rgb(237, 74, 74);
// `;
