'use client';
import { TextField } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import style from './ea_third.module.css'
import BurgerMenu from '../../components/burguer/BurguerMenu';
import NavBar from '../../components/navBar/NavBar';
import Send_thirdd from '../send_transaction_third/Send_thirdd';
import Juan2pepito from '../juan_pepito/Juan2pepito';




export default function EnteredAddress_third() {
    const [address, setAddress] = useState('');
    const [challenge, setChallenge] = useState('Example `personal_sign` message');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };
    const handleChallengeTextChange = (event) => {
        setChallenge(event.target.value);
    };
    return (
        <div>
            <NavBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className={style.pageContainer}>

                <BurgerMenu isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

                <div className={`${style.content} ${sidebarOpen ? style.contentShift : ''}`}>

                    <div className={style.form_test}>
                        <div className={style.block}>

                            <Send_thirdd address={address} />
                        </div>
                        <div className={style.block}>

                            <Juan2pepito />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

