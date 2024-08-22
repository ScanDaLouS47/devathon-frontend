import styles from './pagination.module.scss';
import React from 'react';

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className={styles.pagination}>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button key={index} onClick={() => onPageChange(index + 1)} className={styles.pagination__btns}>
          {index + 1}
        </button>
      ))}
    </div>
  );
};
