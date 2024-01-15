'use client';
import { TextField } from '@mui/material';
import React, { useRef } from 'react'
import { useState } from 'react';
import Web3 from 'web3';
import style from './enteredaddress.module.css'
import EthAccount from '../eth_account/EthAccount';
import WatchAsset from '../asset/WatchAsset';
import Encryption from '../encrypt/Encryption';
import SignTypeData from '../typedata/SignTypeData';
import PersonalSign from '../personalsign/PersonalSign';
import SendTransaction from '../sendTransaction/SendTransaction';
import RunBypass from '../bypass/RunBypass';
import Chain from '../chain/Chain';
import BurgerMenu from '../burguer/BurguerMenu';
import Link from 'next/link';
import NavBar from '../navBar/NavBar';

const links = [
    { route: '/', label: 'Home' },
    { route: '/firstMethod', label: 'First Method' },
    { route: '/secondMethod', label: 'Second Method' },
];

export default function EthAccountsComponent() {
    const [address, setAddress] = useState('');
    const [chiper, setChiper] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };
    const handleChiperTextChange = (event) => {
        setChiper(event.target.value);
    };
    return (
        <div>
            <NavBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>
            <div className={style.pageContainer}>
                
                <BurgerMenu isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

                <div className={`${style.content} ${sidebarOpen ? style.contentShift : ''}`}>
                    <div className={style.header_gral}>
                        <div className={style.header_one}>
                            <h4 className={style.card_title}>ENTER AN ETHEREUM ADDRESS: </h4>
                            <h4 className={style.card_title}>ENTER CHIPERTEXT: </h4>
                        </div>
                        <div className={style.header_two}>
                            <TextField
                                type="text"
                                id="addressInput_eht"
                                value={address}
                                onChange={handleAddressChange}
                                placeholder='0x3b539558c6465968ccfde3a731bf63d6d4d8b85d...'

                                InputProps={{
                                    sx: {
                                        color: 'white',
                                        backgroundColor: '#434343',
                                        fontSize: 15,
                                        border: '1px solid #434343',
                                        borderRadius: '0px',
                                        height: '20px',
                                        width: '400px',
                                        boxShadow: '#666666 1px 1px 1px 0px inset, #666666 -1px -1px 1px 0px inset',
                                        textDecoration: 'none',
                                        padding: '0 10px',
                                        '&:focus': {
                                            border: '1px solid #434343',
                                        },
                                    },
                                }}
                                inputProps={{
                                    sx: {
                                        height: '20px',
                                        textAlign: 'center',
                                    },
                                }}
                            />

                            <TextField
                                type="text"
                                id="addressInput_eht"
                                value={chiper}
                                onChange={handleChiperTextChange}
                                placeholder='0x7b2276657273696f6e223a227832353531392d7873616c736132302d706f6c7931333035222c226e6f6e6365223a223458364f4d307a77763834665255437857495a6c786c3157644f4c5974577875222c22657068656d5075626c69634b6579223a22584136633541705051374e5332565a426a4950586a627a346b523057732f496f4242454f6f7673365853303d222c2263697068657274657874223a22566e4a554d6c73624e4d50767353652b6641364c6c6b514944457476227d'

                                InputProps={{
                                    sx: {
                                        color: 'white',
                                        backgroundColor: '#434343',
                                        fontSize: 15,
                                        border: '1px solid #434343',
                                        borderRadius: '0px',
                                        height: '20px',
                                        width: '400px',
                                        boxShadow: '#666666 1px 1px 1px 0px inset, #666666 -1px -1px 1px 0px inset',
                                        textDecoration: 'none',
                                        padding: '0 10px',
                                        '&:focus': {
                                            border: '1px solid #434343',
                                        },
                                    },
                                }}
                                inputProps={{
                                    sx: {
                                        height: '20px',
                                        textAlign: 'center',
                                    },
                                }}
                            />
                        </div>
                    </div>
                    <div className={style.form_test}>
                        <div className={style.block}>
                            <RunBypass address={address} chipherText={chiper} />
                        </div>
                        <div className={style.block}>
                            <EthAccount />
                            <WatchAsset tokenAddress={address} />
                            <Encryption decryptionAddress={address} chipherText={chiper} />
                            <SignTypeData address={address} />
                            <PersonalSign address={address} />
                            <SendTransaction address={address} />
                        </div>
                        <div className={style.block}>
                            <Chain />
                        </div>
                    </div>
                    {/* <Switchess /> */}
                </div>
            </div>
        </div>
    )
}


{/* 
                <div className={style.burgerIcon} onClick={toggleMenu}>
                    <div className={isOpen ? `${style.line} ${style.open}` : style.line}></div>
                    <div className={isOpen ? `${style.line} ${style.open}` : style.line}></div>
                    <div className={isOpen ? `${style.line} ${style.open}` : style.line}></div>
                </div> */}
{/* <div className={isOpen ? `${style.sidebar} ${style.open}` : style.sidebar}>
                   
                    {links.map(({ label, route }) => (
                        <li key={route}>
                            <Link href={route}>{label}</Link>
                        </li>
                    ))}
                </div> */}

{/* {isOpen && (
                    <div className={style.menu} ref={menuRef}>
                        {links.map(({ label, route }) => (
                            <li className={style.menuItem} key={route}>
                                <Link href={route}>{label}</Link>
                            </li>
                        ))}
                    </div>
                )}          */}

{/* <div className={style.mainContent}> */ }