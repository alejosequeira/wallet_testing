"use client"
import React from 'react'
import style from './ea_five.module.css'
import { useState } from 'react'
import NavBar from '@/components/authTestComponents/navBar/NavBar'
import BurgerMenu from '@/components/authTestComponents/burgerMenu/BurgerMenu'
import CheckSum from '../sendTxCheckSum/SendTxCheckSum'

export default function MenuCheckSum() {
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
                            <CheckSum />
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    )
}
