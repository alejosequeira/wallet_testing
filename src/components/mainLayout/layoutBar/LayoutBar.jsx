import React from 'react';
import styles from './pageLayout.module.css';
import NavBar from './navBar/NavBar';
import BurgerMenu from './burgerMenu/BurgerMenu';

const PageLayout = ({ sidebarOpen, toggleSidebar, children }) => {
  return (
    <div>
      <NavBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={styles.pageContainer}>
        <BurgerMenu isOpen={sidebarOpen} />
        <div className={`${styles.content} ${sidebarOpen ? styles.contentShift : ''}`}>
            {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;