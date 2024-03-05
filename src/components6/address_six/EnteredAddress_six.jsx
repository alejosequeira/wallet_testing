"use client";
import React from 'react'
import ZeroScan from '../zero_value/ZeroScan';
import style from './ea_six.module.css'
import { useState } from 'react'
import NavBar from '../../components/navBar/NavBar'
import BurgerMenu from '../../components/burguer/BurguerMenu'


export default function EnteredAddress_six() {
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
 