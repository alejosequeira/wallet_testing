"use client";
import React from 'react';
import style from './linksDapps.module.css';


const storeLinks = [
    { label: 'AtomicHub', link: 'https://atomichub.store/' },
    { label: 'JumperExchange', link: 'https://jumperexchange.shop/' }, 
    { label: 'OpenSea', link: 'https://opensea.io/' },
    { label: 'UniSwap', link: 'https://uniswap.org/' }, 
];

const AtomichubStore = () => {
    const navigateToLink = (link) => {
        window.open(link, '_blank');
    };

    return (
        <div className={style.container}>
            {storeLinks.map(({ label, link }, index) => (
                <div className={style.formu} key={index}>
                    {label && <label className={style.label}>{label}</label>}
                    <button className={style.bouton} onClick={() => navigateToLink(link)}>{link}</button>
                </div>
            ))}
        </div>
    );
};

export default AtomichubStore;
