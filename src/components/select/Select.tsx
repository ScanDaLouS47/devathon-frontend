import { ArrowTriangleIcon } from '../icons/ArrowTriangleIcon';
import './select.scss';

type SelectProps = React.ComponentProps<'select'>;

export const Select = ({ ...props }: SelectProps) => (
  <div className="select">
    <select {...props} className="select__select"></select>
    <ArrowTriangleIcon className="select__arrow" />
  </div>
);
