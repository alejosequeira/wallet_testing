import React from 'react';
import style from './burguer.module.css';
import Link from 'next/link';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';

const links = [
    { route: '/auth', label: 'Auth Test' },
    { route: '/signing', label: 'Signing' },
    { route: '/sending', label: 'Send Transaction' },
    { route: '/scamTesting', label: 'Scam Testing' },
    { route: '/checkSum', label: 'Address Checksum Validation' },
    { route: '/unknown', label: 'Unknown Address Detection' },
    { route: '/siwe', label: 'EIP-4361 (SIWE)' },
    { route: '/phishing', label: 'Phishing Sites' },
];

const BurgerMenu = ({ isOpen }) => {
    const externalLink = 'https://metamask.github.io/eth-phishing-detect/';

    return (
        <div className={isOpen ? `${style.sidebar} ${style.open}` : style.sidebar}>
            <div className={style.menu}>
                {links.map(({ label, route }) => {                    
                    if (route === '/phishing') {
                        return (
                            <li className={style.sidebarList} key={route}>
                                <PlayArrowOutlinedIcon sx={{ fontSize: 20 }} className={style.icon} />
                                <a href={externalLink} target="_blank" rel="noopener noreferrer">{label}</a>
                            </li>
                        );
                    } else {
                        return (
                            <li className={style.sidebarList} key={route}>
                                <PlayArrowOutlinedIcon sx={{ fontSize: 20 }} className={style.icon} />
                                <Link href={route}>{label}</Link>
                            </li>
                        );
                    }
                })}
            </div>
        </div>
    )
}

export default BurgerMenu;
