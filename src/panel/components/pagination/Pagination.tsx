import React, { useEffect, useState } from 'react';
import styles from './pagination.module.scss';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../icons/ArrowRightIcon';
import { BtnPagesToShow } from './btnPagesToShow/BtnPagesToShow';

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
  const [btnsPagesToShow, setBtnsPagesToShow] = useState(3);
  const handleMediaQueryChange = (e: MediaQueryListEvent) => setBtnsPagesToShow(e.matches ? 0 : 3);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 450px)');

    setBtnsPagesToShow(mediaQuery.matches ? 0 : 3);

    mediaQuery.onchange = handleMediaQueryChange;

    return () => {
      mediaQuery.onchange = null;
    };
  }, []);

  const getPageRange = (): number[] => {
    let startIndex = Math.max(1, currentPage - 1);
    const endIndex = Math.min(totalPages, startIndex + btnsPagesToShow - 1);
    startIndex = Math.max(1, endIndex - btnsPagesToShow + 1);

    return Array.from({ length: endIndex - startIndex + 1 }, (_, i) => startIndex + i);
  };

  const pagesRange = getPageRange();
  const showFirstPage = pagesRange[0] > 2;
  const showLastPage = pagesRange[pagesRange.length - 1] < totalPages - 1;

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.pagination__btnsPagesNav}
        aria-label="Pagination"
      >
        <ArrowLeftIcon className={styles.pagination__btnsPagesToShowIcon} />
        Prev
      </button>

      {showFirstPage && (
        <>
          <BtnPagesToShow
            indexCurrentPage={1}
            onClick={onPageChange}
            className={styles.pagination__btnsPagesToShow}
          />
          <span className={styles.ellipsis}>...</span>
        </>
      )}

      {pagesRange.map((i) => (
        <BtnPagesToShow
          key={i}
          indexCurrentPage={i}
          onClick={onPageChange}
          isActive={currentPage === i}
          aria-label={`Go to page ${i}`}
          className={styles.pagination__btnsPagesToShow}
        />
      ))}

      {showLastPage && (
        <>
          <span className={styles.ellipsis}>...</span>
          <BtnPagesToShow
            indexCurrentPage={totalPages}
            onClick={onPageChange}
            className={styles.pagination__btnsPagesToShow}
          />
        </>
      )}

      {btnsPagesToShow === 0 && <span className={styles.ellipsis}>...</span>}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.pagination__btnsPagesNav}
        aria-label="Next"
      >
        Next
        <ArrowRightIcon className={styles.pagination__btnsPagesToShowIcon} />
      </button>
    </div>
  );
};
