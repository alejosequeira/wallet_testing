"use client"
import React from 'react'
import style from './ea_seven.module.css'
import { useState } from 'react'
import NavBar from '@/components/authTestComponents/navBar/NavBar';
import BurgerMenu from '@/components/authTestComponents/burgerMenu/BurgerMenu';
import SignInWithEthereum from '../siweEip4361/SignInWithEthereum';

export default function EnteredAddress_seven() {
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
                            <SignInWithEthereum />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
