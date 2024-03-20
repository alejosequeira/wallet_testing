import React from 'react'
import CheckSum from '../../components/methodButton/checkSum/CheckSum';
import style from './menu.module.css'
import MainLayout from '@/components/mainLayout/MainLayout';

export default function checkSumValidation({ sidebarOpen, toggleSidebar }) {
  return (
    <>
      <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
        <div className={style.form_test}>
          <div className={style.block}>
            <CheckSum />
          </div>
        </div>
      </MainLayout>
    </>
  )
}
