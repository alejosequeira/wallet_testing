'use client';
import React from 'react'
import { useState } from 'react';
import style from './ea_third.module.css'
import BurgerMenu from '../../authTestComponents/burgerMenu/BurgerMenu';
import NavBar from '../../authTestComponents/navBar/NavBar';
import Send_thirdd from '../sendTx/SendTx';
import Allowance from '../permitAllowance/Allowance';

export default function EnteredAddress_third() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div>
            <NavBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className={style.pageContainer}>
                <BurgerMenu isOpen={sidebarOpen} />
                <div className={`${style.content} ${sidebarOpen ? style.contentShift : ''}`}>
                    <div className={style.form_test}>
                        <div className={style.block}>
                            <Send_thirdd />
                        </div>
                        <div className={style.block}>
                            <Allowance />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

