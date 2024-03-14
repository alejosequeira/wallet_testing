"use client";
import React from 'react'
import ZeroScan from '../UnknownAdDetection';
import style from './menu.module.css'
import { useState } from 'react'
import NavBar from '../../authTest/navBar/NavBar'
import BurgerMenu from '../../authTest/burgerMenu/BurgerMenu'


export default function MenuAdDetection() {
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
                            <ZeroScan/> 
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    )
}
 