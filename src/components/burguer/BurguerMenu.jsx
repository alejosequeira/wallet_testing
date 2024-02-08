'use client'
import React, { useState, useEffect, useRef } from 'react';
import style from './burguer.module.css';
import Link from 'next/link';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';

const links = [
    // { route: '/', label: 'Home' },
    { route: '/auth', label: 'Auth Test' },
    { route: '/signing', label: 'Signing' },
    { route: '/sending', label: 'Send Transaction' },
    { route: '/fourMethod', label: 'ADD testing method' },
];

const BurgerMenu = ({ isOpen, toggleSidebar }) => {

    return (


        <div className={isOpen ? `${style.sidebar} ${style.open}` : style.sidebar}>            
            <div className={style.menu}>
                {links.map(({ label, route }) => (
                    <li className={style.sidebarList} key={route}>
                        <PlayArrowOutlinedIcon sx={{ fontSize: 20 }} className={style.icon} />
                        <Link href={route}>{label}</Link>
                    </li>
                ))}
            </div>
        </div>
    );
}

export default BurgerMenu;
