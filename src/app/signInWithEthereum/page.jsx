import React from 'react'
import SignInWithEthereum from '@/components/methodButton/SignInWithEthereum'
import MainLayout from '@/components/mainLayout/MainLayout'

export default function signInWithEthereum({ sidebarOpen, toggleSidebar }) {
  return (
    <>
      <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
      <div className="form_test">
        <div className="block">
            <SignInWithEthereum />
          </div>
        </div>
      </MainLayout>
    </>
  )
}
