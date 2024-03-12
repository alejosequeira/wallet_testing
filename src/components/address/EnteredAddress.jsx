'use client';
import { TextField } from '@mui/material';
import React from 'react'
import { useState, useEffect } from 'react';
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
import NavBar from '../navBar/NavBar';
import Web3 from 'web3';

export default function EthAccountsComponent() {
    const [address, setAddress] = useState('');
    const [chiper, setChiper] = useState('0x7b2276657273696f6e223a227832353531392d7873616c736132302d706f6c7931333035222c226e6f6e6365223a223458364f4d307a77763834665255437857495a6c786c3157644f4c5974577875222c22657068656d5075626c69634b6579223a22584136633541705051374e5332565a426a4950586a627a346b523057732f496f4242454f6f7673365853303d222c2263697068657274657874223a22566e4a554d6c73624e4d50767353652b6641364c6c6b514944457476227d');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const handleGetEthAccounts = async () => {
            try {
                const provider = window.ethereum;
                if (!provider) {
                    setAddress('Wallet not Found');
                    return;
                }
                const _accounts = await provider.request({
                    method: 'eth_accounts',
                });
                console.log(_accounts)
                if (_accounts && _accounts.length > 0) {
                    const checksumAddress = Web3.utils.toChecksumAddress(_accounts[0]);
                    setAddress(checksumAddress);
                    
                }
            } catch (err) {
                console.error("Error executing eth_accounts FAILED: " + err);
                setAddress("Error eth_accounts FAILED")
            }
        };

        handleGetEthAccounts();
        
    }, []);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };
    const handleChiperTextChange = (event) => {
        setChiper(event.target.value);
    };
    return (
        <div>
            <NavBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className={style.pageContainer}>

                <BurgerMenu isOpen={sidebarOpen} />

                <div className={`${style.content} ${sidebarOpen ? style.contentShift : ''}`}>
                    <div className={style.header_gral}>
                        <h1 className={style.title_params}>Test Params: </h1>
                        <div className={style.header_one}>
                            <h4 className={style.card_title}>Address </h4>
                            <h4 className={style.card_title}>Ciphertext </h4>
                        </div>
                        <div className={style.header_two}>
                            <TextField
                                type="text"
                                id="addressInput_eht"
                                value={address}
                                onChange={handleAddressChange}
                                InputProps={{
                                    sx: {
                                        color: 'white',
                                        backgroundColor: '#434343',
                                        fontSize: "0.65rem",
                                        border: '1px solid rgb(222, 222, 222)',
                                        borderRadius: '5px',
                                        height: '1rem',
                                        width: '17rem',
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
                                

                                InputProps={{
                                    sx: {
                                        color: 'white',
                                        backgroundColor: '#434343',
                                        fontSize: "0.65rem",
                                        border: '1px solid rgb(222, 222, 222)',
                                        borderRadius: '5px',
                                        height: '1rem',
                                        width: '17rem',
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
                </div>
            </div>
        </div>
    )
}
