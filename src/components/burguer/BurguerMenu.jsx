
import React from 'react';
import style from './burguer.module.css';
import Link from 'next/link';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';

const links = [
    { route: '/auth', label: 'Auth Test' },
    { route: '/signing', label: 'Signing' },
    { route: '/sending', label: 'Send Transaction' },
    { route: '/scamTesting', label: 'Scam Testing' },
    { route: '/checkSum', label: 'CheckSum' },
];

const BurgerMenu = ({ isOpen }) => {

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
