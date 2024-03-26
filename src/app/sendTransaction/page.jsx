import React from 'react'
import MainLayout from '@/components/mainLayout/MainLayout'
import SendTransaction from '@/components/methodButton/SendTransaction'
import DeployContract from '@/components/methodButton/DeployContract'


export default function sendTransaction({ sidebarOpen, toggleSidebar }) {
  return (
    <>
      <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
        <div className="form_test">
          <div className="block">
            <DeployContract />
          </div>
          <div className="block">
            <SendTransaction
              viewForm={true}
              viewScamButton={false}
            />
          </div>

        </div>
      </MainLayout>
    </>
  )
}
