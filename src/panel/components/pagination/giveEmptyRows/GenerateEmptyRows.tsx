import React from 'react';
import classNames from 'classnames';
import styles from './generateEmptyRows.module.scss';

interface CellProps {
  className?: string;
  styledTd?: string;
  onClick?: () => void;
}

interface GenerateEmptyRowsProps extends React.TableHTMLAttributes<HTMLTableRowElement> {
  styledTr?: string;
  count: number;
  cells: CellProps[];
}

export const GenerateEmptyRows: React.FC<GenerateEmptyRowsProps> = ({
  styledTr,
  count,
  cells,
  className,
  ...props
}) => {
  return Array(count)
    .fill(null)
    .map((_, rowIndex) => (
      <tr key={`empty-${rowIndex}`} className={classNames(styles.defaultRow, styledTr, className)} {...props}>
        {cells.map((cell, cellIndex) => {
          const { styledTd, className: cellClassName, onClick, ...cellProps } = cell;
          return (
            <td
              key={`cell-${rowIndex}-${cellIndex}`}
              className={classNames(styles.defaultCell, styledTd, cellClassName)}
              onClick={onClick}
              {...cellProps}
            >
              &nbsp;
            </td>
          );
        })}
      </tr>
    ));
};
