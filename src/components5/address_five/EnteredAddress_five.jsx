"use client"
import React from 'react'
import style from './ea_five.module.css'
import { useState } from 'react'
import NavBar from '@/components/navBar/NavBar'
import BurgerMenu from '@/components/burguer/BurguerMenu'
import SendScam from '@/components4_fourth/send_scam/SendScam'
import CheckSum from '../send_tx_checksum/CheckSum'



export default function EnteredAddress_five() {
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
                        <div className={style.block}>
                            <SendScam/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
