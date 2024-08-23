import React from 'react';
import classNames from 'classnames';

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
      <tr key={`empty-${rowIndex}`} className={classNames(styledTr, className)} {...props}>
        {cells.map((cell, cellIndex) => {
          const { styledTd, className: cellClassName, onClick, ...cellProps } = cell;
          return (
            <td
              key={`cell-${rowIndex}-${cellIndex}`}
              className={classNames(styledTd, cellClassName)}
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
