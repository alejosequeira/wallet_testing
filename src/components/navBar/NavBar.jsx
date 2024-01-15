'use client'

import React, { useState, useEffect } from 'react';
import ConnectMetaMaskButton from '../connect/ConnectMetaMaskButton';
import style from './navbar.module.css';

export default function NavBar({ isOpen, toggleSidebar }) {
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 30) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (   

    <div className={style.navContainer}>
      <nav className={style.stickyNav}>
        <div className={style.nava}>
          <div className={style.nava2}>
          <div className={style.burgerIcon} onClick={toggleSidebar}>
                    <div className={isOpen ? `${style.line} ${style.open}` : style.line}></div>
                    <div className={isOpen ? `${style.line} ${style.open}` : style.line}></div>
                    <div className={isOpen ? `${style.line} ${style.open}` : style.line}></div>
                </div>          
            <h3 className={style.portadatitle}>WALLET TESTING</h3>
          </div>
          <ConnectMetaMaskButton />
        </div>
      </nav>
    </div>
  );
}
