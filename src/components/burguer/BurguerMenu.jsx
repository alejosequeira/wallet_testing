'use client'
import React, { useState, useEffect, useRef } from 'react';
import style from './burguer.module.css';
import Link from 'next/link';
import { Button } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';

const links = [
    { route: '/', label: 'Home' },
    { route: '/firstMethod', label: 'First Method' },
    { route: '/secondMethod', label: 'Second Method' },
];

const BurgerMenu = ({ isOpen, toggleSidebar }) => {
    // const [isOpen, setIsOpen] = useState(false);
    // const menuRef = useRef(null);
    // const toggleMenu = () => {
    //     setIsOpen(!isOpen);
    // };

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

// useEffect(() => {
//     const closeMenu = (event) => {
//         if (isOpen && menuRef.current && !menuRef.current.contains(event.target)) {
//             setIsOpen(false);
//         }
//     };
//     document.addEventListener('click', closeMenu);
//     return () => {
//         document.removeEventListener('click', closeMenu);
//     };
// }, [isOpen]);

// return (
//     <>
//         <div className={style.container}>
// <div className={style.burgerIconButton} onClick={toggleMenu}>
//     <div className={isOpen ? `${style.line} ${style.open}` : style.line}></div>
//     <div className={isOpen ? `${style.line} ${style.open}` : style.line}></div>
//     <div className={isOpen ? `${style.line} ${style.open}` : style.line}></div>
// </div>
//             {isOpen && (
//                 <div className={style.menu} ref={menuRef}>
// {links.map(({ label, route }) => (
//     <li className={style.menuItem} key={route}>
//         <Link href={route}>{label}</Link>
//     </li>
// ))}
//                 </div>
//             )}
//         </div>
//     </>
// );


export default BurgerMenu;
