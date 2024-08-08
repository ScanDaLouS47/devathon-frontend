import { NavLink } from 'react-router-dom';
import { Link } from '../../interfaces/link.interface';
import './aside.scss';

type AsideProps = {
  links: Link[];
};

export const Aside = ({ links }: AsideProps) => {
  return (
    <aside className="aside">
      <nav className="aside__nav">
        {links.map((link) => (
          <NavLink
            key={link.name}
            className={({ isActive }) => `aside__link ${isActive ? 'active' : ''}`}
            to={link.path}
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
