import React, { ButtonHTMLAttributes, forwardRef, ForwardedRef, MouseEvent } from 'react';
import styles from './btnPagesToShow.module.scss';

type BtnPagesToShowProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
  indexCurrentPage: number;
  onClick: (page: number) => void;
  isActive?: boolean;
};

export const BtnPagesToShow = forwardRef<HTMLButtonElement, BtnPagesToShowProps>(
  (
    { indexCurrentPage, onClick, isActive = false, className, ...props },
    ref: ForwardedRef<HTMLButtonElement>,
  ) => (
    <button
      ref={ref}
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onClick(indexCurrentPage);
      }}
      className={`${styles.pagination__btnsPagesToShow} ${isActive ? styles.active : ''} ${className || ''}`}
      {...props}
    >
      {indexCurrentPage}
    </button>
  ),
);

BtnPagesToShow.displayName = 'BtnPagesToShow';
