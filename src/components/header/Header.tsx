import React, { useState } from 'react';
import Logo from '../icons/Logo';
import UserIcon from '../icons/UserIcon';
import { Modal } from '../modal/Modal';
import styles from './header.module.scss';
import SettingsIcon from '../icons/SettingsIcon';
import LogOutIcon from '../icons/LogOutIcon';

export const Header = React.forwardRef(() => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  return (
    <header className={styles.header}>
      <section className={styles.header__bg}>
        <div className={styles.header__container}>
          <div className={styles.header__logo}>
            <Logo width="15" />
          </div>
          <div className={styles.header__profile} onClick={() => setIsModalVisible(true)}>
            <UserIcon width="2.25" color="rgb(146, 146, 146)" />
          </div>
          {isModalVisible && (
            <Modal setIsModalVisible={setIsModalVisible}>
              <div className={styles.header__profile__option} onClick={() => console.log('Navigate to Settings Page')}>
                <SettingsIcon width="1.5" color="rgb(146, 146, 146)" />
                <span>Settings</span>
              </div>
              <div className={`${styles.header__profile__option} ${styles.logout}`} onClick={() => console.log('Log Out')}>
                <LogOutIcon width="1.5" color="rgb(146, 146, 146)" />
                <span>Log Out</span>
              </div>
            </Modal>
          )}
        </div>
      </section>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
