import styles from './header.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import Logo from '../icons/Logo';
import UserIcon from '../icons/UserIcon';
import SettingsIcon from '../icons/SettingsIcon';
import LogOutIcon from '../icons/LogOutIcon';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hook/useAuth';
import { fetchApi } from '../../utils/fetchApi';

export const Header = React.forwardRef(() => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { authState, onLogout } = useAuth();
  const { logged } = authState;

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
    <header className={styles.header}>
      <section className={styles.header__bg}>
        <div className={`${styles.header__container}`}>
          <div className={`${styles.header__logo} ${logged == false && styles.noLogged}`}>
            <Logo width="15" />
          </div>

          {logged && (
            <div
              className={`${styles.header__profile} ${isHover ? styles.hovered : ''}`}
              onClick={toggleModal}
              aria-expanded={isModalVisible}
              ref={profileRef}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <UserIcon width="2.25" color="rgb(146, 146, 146)" />
            </div>
          )}

          {isModalVisible && (
            <div className={styles.header__profile__modal} ref={modalRef}>
              <div className={styles.header__profile__option} onClick={() => handleOptionSelect('settings')}>
                <SettingsIcon width="1.5" color="rgb(146, 146, 146)" />
                <span>Settings</span>
              </div>
              <div
                className={`${styles.header__profile__option} ${styles.logout}`}
                onClick={() => handleOptionSelect('logout')}
              >
                <LogOutIcon width="1.5" color="rgb(146, 146, 146)" />
                <span>Log Out</span>
              </div>
            </div>
          )}
        </div>
      </section>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
