import MainLayout from '@/components/mainLayout/MainLayout'
import AtomichubStore from '@/components/methodButton/linksDapps/LinkScamDapp'
import SendTransaction from '@/components/methodButton/sendTransaction/SendTransaction'
import React from 'react'
import style from './ea_fourth.module.css'

export default function scamTesting({ sidebarOpen, toggleSidebar }) {
  return (
    <>
      <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
        <div className={style.form_test}>
          <div className={style.block}>
            <AtomichubStore />
          </div>
          <div className={style.block}>
            <SendTransaction
              viewForm={true}
              viewScamButton={true}
            />
          </div>
        </div>
      </MainLayout>
    </>
  )
}
