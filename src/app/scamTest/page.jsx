import MainLayout from '@/components/mainLayout/MainLayout'
import AtomichubStore from '@/components/methodButton/linksDapps/LinkScamDapp'
import SendTransaction from '@/components/methodButton/sendTransaction/SendTransaction'
import React from 'react'

export default function scamTesting({ sidebarOpen, toggleSidebar }) {
  return (
    <>
      <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
        <div className="form_test">
          <div className="block">
            <AtomichubStore />
          </div>
          <div className="block">
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
