import React from 'react'
import style from './linksDapps.module.css'

export default function AtomichubStore() {
    const navigateToAtomicHub = () => {
        window.open('https://atomichub.store/', '_blank');
    };
    const navigateToOpenSea = () => {
        window.open('https://opensea.io/', '_blank');
    };
    const navigateToUniswap = () => {
        window.open('https://uniswap.org/', '_blank');
    };

    return (

        <div className={style.container}>
            <div className={style.formu}>
                <label className={style.label}>Scam Dapps</label>
                <button className={style.bouton} onClick={navigateToAtomicHub}>atomichub.store</button>
            </div>
            <div className={style.formu}>
                <button className={style.bouton} onClick={navigateToAtomicHub}>jumperexchаnge.shop</button>
            </div>
            <div className={style.formu}>
                <label className={style.label}>Authentic Dapps</label>
                <button className={style.bouton} onClick={navigateToOpenSea}>opensea.io</button>
            </div>
            <div className={style.formu}>
                <button className={style.bouton} onClick={navigateToUniswap}>uniswap.org</button>
            </div>
        </div>
    );
}
