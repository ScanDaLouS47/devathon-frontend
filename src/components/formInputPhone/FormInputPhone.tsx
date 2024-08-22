import React, { useState, useEffect, useRef, ForwardedRef } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import styles from './formInputPhone.module.scss';
import { FormInput } from '../formInput/FormInput';

type OptionType = {
  value: string;
  country: string;
  countryTag?: string;
  imgURL?: string;
};

type SelectProps = {
  label: string;
  error: FieldError | undefined;
  options: OptionType[];
  children?: React.ReactNode;
  register: UseFormRegisterReturn;
  placeholder?: string;
  value?: string;
};

export const FormInputPhone = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    { label, error, options, register, placeholder, value }: SelectProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const [selectedValue, setSelectedValue] = useState<OptionType>(options[0]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const selectRef = useRef<HTMLDivElement>(null);
    const hasError = error ? `${styles.row__error}` : '';

    const handleOptionSelect = (option: OptionType) => {
      setSelectedValue(option);
      setIsOpen(false);
    };

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          selectRef.current &&
          !selectRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return (
      <div className={styles.row} ref={ref}>
        <label className={`${styles.row__label} ${hasError}`}>{label}*</label>
        <div className={`${styles.row__container} ${hasError}`}>
          <div
            className={`${styles.row__select}`}
            tabIndex={0}
            onClick={toggleDropdown}
            aria-expanded={isOpen}
            ref={selectRef}
          >
            <img
              className={`${styles.row__selectedImage}`}
              src={selectedValue.imgURL}
              alt={selectedValue.country}
            />
          </div>
          {isOpen && (
            <div className={`${styles.row__options}`} ref={dropdownRef}>
              {options.map((element, index) => (
                <div className={styles.row__option} key={index} onClick={() => handleOptionSelect(element)}>
                  <img className={`${styles.row__optionImage}`} src={element.imgURL} alt={element.country} />
                  <span>{element.countryTag && `+${element.countryTag} ${element.country}`}</span>
                </div>
              ))}
            </div>
          )}
          <FormInput
            label=""
            error={error}
            id="phone"
            type="text"
            placeholder={`+${selectedValue.countryTag} ${placeholder ? placeholder : '123 123 123'}`}
            {...register}
            value={value}
          />
        </div>
      </div>
    );
  },
);

FormInputPhone.displayName = 'FormInputPhone';

export default FormInputPhone;
