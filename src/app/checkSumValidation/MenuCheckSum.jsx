"use client"
import React from 'react'
import style from './menu.module.css'
import { useState } from 'react'
import NavBar from '@/components/mainLayout/layoutBar/navBar/NavBar'
import BurgerMenu from '@/components/mainLayout/layoutBar/burgerMenu/BurgerMenu'
import CheckSum from '../../components/methodButton/checkSum/CheckSum'

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
