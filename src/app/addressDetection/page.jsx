import React from 'react'
import SendTransaction from '../../components/methodButton/addressDetection/SendTransaction';
import style from './addressDetection.module.css'
import MainLayout from '@/components/mainLayout/MainLayout';

export default function addressDetection({ sidebarOpen, toggleSidebar }) {

  return (
    <>
      <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
        <div className={style.block}>
          <SendTransaction 
            viewForm={true}
            viewScamButton={true}
          />
        </div>
      </MainLayout>
    </>
  )
}
