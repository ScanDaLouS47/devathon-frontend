import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hook/useAuth';
import { fetchApi } from '../../utils/fetchApi';
import LogOutIcon from '../icons/LogOutIcon';
// import { LogoV2 } from '../icons/LogoV2';
import SettingsIcon from '../icons/SettingsIcon';
import { UserIconV2 } from '../icons/UserIconV2';
import styles from './header.module.scss';
import Logo from '../icons/Logo';
import { ThemeSwitcher } from '../themeSwitcher/ThemeSwitcher';

export const Header = React.forwardRef(() => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { authState, onLogout } = useAuth();
  const { logged, user } = authState;

  const profileClass = logged ? styles.headerv2__profile : styles.headerv2__profile__hidden;
  const headerClass = !logged ? styles.headerv2__centered : null;

  const handleOptionSelect = (option: string) => {
    setIsModalVisible(false);
    if (option === 'settings') {
      navigate(`/panel/${user?.role}/settings`);
    } else if (option === 'logout') {
      onLogout();
      navigate('/auth/login', {
        replace: true,
      });
      fetchApi('/api/v1/logout');
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsModalVisible(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className={styles.headerv2}>
        <div className={`${styles.headerv2__container} ${headerClass} wrapper`}>
          {/* <LogoV2 className={styles.headerv2__logo} /> */}
          <Logo className={styles.headerv2__logo} />

          <ThemeSwitcher />

          <div className={profileClass} onClick={toggleModal} aria-expanded={isModalVisible} ref={profileRef}>
            <UserIconV2 className={styles.headerv2__icon} />

            {isModalVisible && (
              <div className={styles.headerv2__modal} ref={modalRef}>
                <div className={styles.headerv2__option} onClick={() => handleOptionSelect('settings')}>
                  {/* <NavLink to={'/panel/user/settings'}>Settings</NavLink> */}
                  <SettingsIcon className={styles.headerv2__option__icon} />
                  <span>Settings</span>
                </div>
                <div
                  className={`${styles.headerv2__option} ${styles.headerv2__logout}`}
                  onClick={() => handleOptionSelect('logout')}
                >
                  {/* <LogOutIcon
                    className={`${styles.headerv2__option__icon} ${styles.headerv2__option__icon__down}`}
                  /> */}
                  <LogOutIcon className={styles.headerv2__option__icon} />
                  <span>Log Out</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
});

Header.displayName = 'Header';

export default Header;
