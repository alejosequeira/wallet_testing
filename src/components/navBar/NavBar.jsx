'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ConnectMetaMaskButton from '../connect/ConnectMetaMaskButton';
import style from './navbar.module.css';
import BurgerMenu from '../burguer/BurguerMenu';

const links = [
  { route: '/', label: 'Home' },
  { route: '/firstMethod', label: 'First Method' },
  { route: '/secondMethod', label: 'Second Method' },
];

export default function NavBar() {
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
            <BurgerMenu />
            <h3 className={style.portadatitle}>WALLET TESTING</h3>
          </div>
          <ConnectMetaMaskButton />
        </div>
      </nav>
    </div>
  );
}

{/* <nav className={style.nav_bar}>

        {links.map(({ label, route }) => (
          <li className={style.lista} key={route}>
            <Link href={route}>{label}</Link>
          </li>
        ))}

      </nav> */}