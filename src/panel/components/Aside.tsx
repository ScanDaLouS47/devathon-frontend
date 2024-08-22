import { NavLink } from 'react-router-dom';
import { Link } from '../../interfaces/link.interface';
import styles from './aside.module.scss';

type AsideProps = {
  links: Link[];
};

export const Aside = ({ links }: AsideProps) => {
  return (
    <aside className={`${styles.aside}`}>
      <nav className={`${styles.aside__nav}`}>
        {links.map((link) => (
          <NavLink
            key={link.name}
            className={({ isActive }) => `${styles.aside__link} ${isActive ? styles.active : ''}`}
            to={link.path}
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
