import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hook/useAuth';
import { fetchApi } from '../../utils/fetchApi';
import LogOutIcon from '../icons/LogOutIcon';
import { LogoV2 } from '../icons/LogoV2';
import SettingsIcon from '../icons/SettingsIcon';
import { UserIconV2 } from '../icons/UserIconV2';
import styles from './header.module.scss';

export const Header = React.forwardRef(() => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { authState, onLogout } = useAuth();
  const { logged } = authState;

  const profileClass = logged ? styles.headerv2__profile : styles.headerv2__profile__hidden;

  const handleOptionSelect = (option: string) => {
    setIsModalVisible(false);
    if (option === 'settings') {
      navigate('/user/settings');
    } else if (option === 'logout') {
      onLogout();
      navigate('/auth/login', {
        replace: true,
      });
      const resp = fetchApi('/api/v1/logout');
      console.log(resp);
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
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className={styles.headerv2}>
        <div className={`${styles.headerv2__container} wrapper`}>
          <LogoV2 className={styles.headerv2__logo} />

          <div
            className={profileClass}
            onClick={toggleModal}
            aria-expanded={isModalVisible}
            ref={profileRef}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <UserIconV2 className={styles.headerv2__icon} />

            {isModalVisible && (
              <div className={styles.headerv2__modal} ref={modalRef}>
                <div className={styles.headerv2__option} onClick={() => handleOptionSelect('settings')}>
                  <SettingsIcon className={styles.headerv2__option__icon} />
                  <span>Settings</span>
                </div>
                <div
                  className={`${styles.headerv2__option} ${styles.headerv2__logout}`}
                  onClick={() => handleOptionSelect('logout')}
                >
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
