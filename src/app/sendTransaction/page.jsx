import React from 'react'
import style from './menu.module.css'
import MainLayout from '@/components/mainLayout/MainLayout'
import Allowance from '@/components/methodButton/permitAllowance/Allowance'
import UnknownAdDetection from '@/components/methodButton/sendTransaction/SendTransaction'
import DeployContract from '@/components/methodButton/deployContract/DeployContract'


export default function sendTransaction({ sidebarOpen, toggleSidebar }) {
  return (
    <>
      <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
        <div className={style.form_test}>
          <div className={style.block}>
            <UnknownAdDetection
              viewForm={true}
              viewScamButton={false}
            />
          </div>
          <div className={style.block}>
            <DeployContract/>
            <Allowance />
          </div>
        </div>
      </MainLayout>
    </>
  )
}
