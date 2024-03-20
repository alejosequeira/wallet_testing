import React from 'react'
import SignInWithEthereum from '@/components/methodButton/siwe/SignInWithEthereum'
import MainLayout from '@/components/mainLayout/MainLayout'
import style from './menu.module.css'

export default function signInWithEthereum({ sidebarOpen, toggleSidebar }) {
  return (
    <>
      <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
        <div className={style.form_test}>
          <div className={style.block}>
            <SignInWithEthereum />
          </div>
        </div>
      </MainLayout>
    </>
  )
}
