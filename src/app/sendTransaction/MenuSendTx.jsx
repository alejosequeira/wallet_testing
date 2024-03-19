'use client';
import React from 'react'
import { useState } from 'react';
import style from './menu.module.css'
import BurgerMenu from '../../components/mainLayout/layoutBar/burgerMenu/BurgerMenu';
import NavBar from '../../components/mainLayout/layoutBar/navBar/NavBar';
import UnknownAdDetection from '../../components/methodButton/addressDetection/SendTransaction';
import Allowance from '../../components/methodButton/permitAllowance/Allowance';

export default function MenuSendTx() {
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
                            <UnknownAdDetection
                                viewForm={true}
                                viewScamButton={false}
                            />
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
