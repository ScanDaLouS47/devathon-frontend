import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hook/useAuth';
import { fetchApi } from '../../utils/fetchApi';
import LogOutIcon from '../icons/LogOutIcon';
import SettingsIcon from '../icons/SettingsIcon';
import { UserIconV2 } from '../icons/UserIconV2';
import styles from './header.module.scss';
import Logo from '../icons/Logo';
import { ThemeSwitcher } from '../themeSwitcher/ThemeSwitcher';
import { IRespLogout } from '../../interfaces/respLogout.interface';
import { toast } from 'react-toastify';
import { ApiError } from '../../utils/apiError';

export const Header = React.forwardRef(() => {
  // GET a /api/v1/logout
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { authState, onLogout } = useAuth();
  const { logged, user } = authState;

  const profileClass = logged ? styles.headerv2__profile : styles.headerv2__profile__hidden;
  const headerClass = !logged ? styles.headerv2__centered : null;

  const handleOptionSelect = async (option: string) => {
    setIsModalVisible(false);
    if (option === 'settings') {
      navigate(`/panel/${user?.role}/settings`);
    } else if (option === 'logout') {
      try {
        const logoutResp = await fetchApi<IRespLogout>('/api/v1/logout', 'GET', '', null, true, true);
        if (!logoutResp.ok) {
          throw new ApiError(logoutResp.msg);
        }
        toast.update(toast.loading('Loading...'), {
          render: logoutResp.msg,
          type: 'info',
          isLoading: false,
          autoClose: 1500,
        });
      } catch (error) {
        if (error instanceof ApiError) {
          toast.error(error.message, { autoClose: 3000 });
          console.error('Logout error:', error.message);
        }
      }
      onLogout();
      navigate('/auth/login', {
        replace: true,
      });
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
          <Logo className={styles.headerv2__logo} />

          <ThemeSwitcher />

          <div className={profileClass} onClick={toggleModal} aria-expanded={isModalVisible} ref={profileRef}>
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
