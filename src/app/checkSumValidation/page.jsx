import React from 'react'
import CheckSum from '../../components/methodButton/checkSum/CheckSum';
import MainLayout from '@/components/mainLayout/MainLayout';

export default function checkSumValidation({ sidebarOpen, toggleSidebar }) {
  return (
    <>
      <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
        <div className="form_test">
        <div className="block">
            <CheckSum />
          </div>
        </div>
      </MainLayout>
    </>
  )
}
