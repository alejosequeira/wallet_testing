"use client";
import React from 'react'
import { useState } from 'react';
import style from './ea_fourth.module.css'
import BurgerMenu from '../../authTestComponents/burgerMenu/BurgerMenu';
import NavBar from '../../authTestComponents/navBar/NavBar';
import AtomichubStore from '../linksScamDapps/LinkScamDapp';
import SendScam from '../sendScamTx/SendScamTx';


export default function EnteredAddress_fourth() {
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
                            <AtomichubStore />
                        </div>
                        <div className={style.block}>
                            <SendScam/>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    )
}
