import React from 'react';
import styles from './pagination.module.scss';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../icons/ArrowRightIcon';

type PaginationProps = {
  lengthData: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  lengthData,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(lengthData / itemsPerPage);
  const btnsPagesToShow = 3;

  const getPageRange = (): number[] => {
    let startIndex = Math.max(1, currentPage - 1);
    const endIndex = Math.min(totalPages, startIndex + btnsPagesToShow - 1);
    startIndex = Math.max(1, endIndex - btnsPagesToShow + 1);

    return Array.from({ length: endIndex - startIndex + 1 }, (_, i) => startIndex + i);
  };

  const pagesRange = getPageRange();
  const showFirstPage = pagesRange[0] > 1;
  const showLastPage = pagesRange[pagesRange.length - 1] < totalPages;

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.pagination__btnsPagesNav}
      >
        <ArrowLeftIcon className={styles.pagination__btnsPagesToShowIcon} />
        Prev
      </button>

      {showFirstPage && (
        <>
          <BtnPagesToShow page={1} onClick={onPageChange} />
          {pagesRange[0] > 2 && <span className={styles.ellipsis}>...</span>}
        </>
      )}

      {pagesRange.map((i) => (
        <BtnPagesToShow key={i} page={i} onClick={onPageChange} isActive={currentPage === i} />
      ))}

      {showLastPage && (
        <>
          {pagesRange[pagesRange.length - 1] < totalPages - 1 && <span className={styles.ellipsis}>...</span>}
          <BtnPagesToShow page={totalPages} onClick={onPageChange} />
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.pagination__btnsPagesNav}
      >
        Next
        <ArrowRightIcon className={styles.pagination__btnsPagesToShowIcon} />
      </button>
    </div>
  );
};

const BtnPagesToShow: React.FC<{ page: number; onClick: (page: number) => void; isActive?: boolean }> = ({
  page,
  onClick,
  isActive = false,
}) => (
  <button
    onClick={() => onClick(page)}
    className={`${styles.pagination__btnsPagesToShow} ${isActive ? styles.active : ''}`}
  >
    {page}
  </button>
);
