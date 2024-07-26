import React, { useState, useEffect, useRef, ForwardedRef } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { WarningIcon } from '../icons/WarningIcon';
import styles from './formInputPhone.module.scss';
import { FormInput } from '../formInput/FormInput';

type OptionType = {
  value: string;
  country: string; // Nombre del país
  countryTag?: string; // Extensión del país
  imgURL?: string;
};

type SelectProps = {
  label: string;
  error: FieldError | undefined;
  options: OptionType[];
  children?: React.ReactNode;
  register: UseFormRegisterReturn;
};

export const FormInputPhone = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ label, error, options, register }: SelectProps, ref: ForwardedRef<HTMLDivElement>) => {
    // Inicializa el valor seleccionado con el primer país de las opciones
    const [selectedValue, setSelectedValue] = useState<OptionType>(options[0]);
    const [isOpen, setIsOpen] = useState<boolean>(false); // Estado para manejar la visibilidad del dropdown
    const hasError = error ? `${styles.row__error}` : '';
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleOptionSelect = (option: OptionType) => {
      setSelectedValue(option);
      setIsOpen(false);
    };

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    // Cierra el dropdown si se hace clic fuera del componente
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
          {/* Contenedor de la opción seleccionada */}
          <div
            className={`${styles.row__select}`}
            tabIndex={0}
            onClick={toggleDropdown}
            aria-expanded={isOpen}
          >
            <img
              className={`${styles.row__selectedImage}`}
              src={selectedValue.imgURL}
              alt={selectedValue.country}
            />
          </div>
          <FormInput
            label=""
            error={error}
            id="phone"
            type="text"
            placeholder={`+${selectedValue.countryTag} 123 123 123`}
            {...register}
          />
          {error && <WarningIcon className={`${styles.row__icon}`} />}
        </div>
        {/* Contenedor de las opciones */}
        {isOpen && (
          <div className={`${styles.row__options}`} ref={dropdownRef}>
            {options.map((element, index) => (
              <div
                className={`${styles.row__option}`}
                key={index}
                onClick={() => handleOptionSelect(element)}
              >
                <img className={`${styles.row__optionImage}`} src={element.imgURL} alt={element.country} />
                <span>{element.countryTag && `+${element.countryTag} ${element.country}`}</span>
              </div>
            ))}
          </div>
        )}
        <span className={`${styles.row__message}`}>{error?.message}</span>
      </div>
    );
  },
);

FormInputPhone.displayName = 'FormInputPhone';

export default FormInputPhone;