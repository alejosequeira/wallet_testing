import React from 'react'
import MainLayout from '@/components/mainLayout/MainLayout'
import UnknownAdDetection from '@/components/methodButton/sendTransaction/SendTransaction'
import DeployContract from '@/components/methodButton/deployContract/DeployContract'


export default function sendTransaction({ sidebarOpen, toggleSidebar }) {
  return (
    <>
      <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
      <div className="form_test">
      <div className="block">
            <DeployContract/>
          </div>
          <div className="block">
            <UnknownAdDetection
              viewForm={true}
              viewScamButton={false}
            />
          </div>
          
        </div>
      </MainLayout>
    </>
  )
}
