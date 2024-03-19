"use client"
import React, { useState } from 'react';
import LayoutBar from './layoutBar/LayoutBar';

const MainLayout = ({children}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <LayoutBar
      sidebarOpen={sidebarOpen}
      toggleSidebar={toggleSidebar}
    >
      {children}
    </LayoutBar>
  );
};

export default MainLayout;