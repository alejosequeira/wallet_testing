"use client";
import React from 'react'
import { useState } from 'react';
import style from './ea_fourth.module.css'
import BurgerMenu from '../../components/burguer/BurguerMenu';
import NavBar from '../../components/navBar/NavBar';
import AtomichubStore from '../links_dapps/AtomichubStore';
import SendScam from '../send_scam/SendScam';


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
