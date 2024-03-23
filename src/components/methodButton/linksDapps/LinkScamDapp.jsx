"use client";
import React from 'react';
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
        <div className="formulario_one">
            {storeLinks.map(({ label, link }, index) => (
                <div className="formu" key={index}>
                    {label && <label className="formulario_label">{label}</label>}
                    <button className="button" onClick={() => navigateToLink(link)}>{link}</button>
                </div>
            ))}
        </div>
    );
};

export default AtomichubStore;
