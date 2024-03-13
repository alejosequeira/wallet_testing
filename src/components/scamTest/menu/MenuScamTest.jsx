"use client";
import React from 'react'
import { useState } from 'react';
import style from './ea_fourth.module.css'
import BurgerMenu from '../../authTest/burgerMenu/BurgerMenu';
import NavBar from '../../authTest/navBar/NavBar';
import AtomichubStore from '../linksDapps/LinkScamDapp';
import SendScam from '../SendScamTx';


export default function MenuScamTest() {
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
