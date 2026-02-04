import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface AppLayoutProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  children: React.ReactNode;
  sidebarVisible: boolean;
  setSidebarVisible: (visible: boolean) => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ 
  currentPage, 
  onNavigate, 
  children, 
  sidebarVisible,
  setSidebarVisible 
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {sidebarVisible && (
        <Sidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          currentPage={currentPage}
          onNavigate={onNavigate}
        />
      )}
      <Header 
        sidebarCollapsed={sidebarCollapsed} 
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
      />
      <main
        className="pt-16 h-screen transition-all overflow-hidden"
        style={{ marginLeft: sidebarVisible ? (sidebarCollapsed ? 64 : 240) : 0 }}
      >
        <div className="max-w-7xl mx-auto p-6 h-full flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
};
