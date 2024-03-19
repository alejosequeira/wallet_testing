import React from 'react';
import style from './burger.module.css';
import Link from 'next/link';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';

const links = [
    { route: '/authTest', label: 'Auth Test' },
    { route: '/sign', label: 'Sign' },
    { route: '/sendTransaction', label: 'Send Transaction' },
    { route: '/scamTest', label: 'Scam Test' },
    { route: '/checkSumValidation', label: 'Address Checksum Validation' },
    { route: '/addressDetection', label: 'Unknown Address Detection' },
    { route: '/signInWithEthereum', label: 'EIP-4361 (SIWE)' },
    { route: '/phishingSites', label: 'Phishing Sites' },
];

const BurgerMenu = ({ isOpen }) => {
    const externalLink = 'https://github.com/MetaMask/eth-phishing-detect/blob/main/src/config.json';

    return (
        <div className={isOpen ? `${style.sidebar} ${style.open}` : style.sidebar}>
            <div className={style.menu}>
                {links.map(({ label, route }) => {                    
                    if (route === '/phishingSites') {
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
