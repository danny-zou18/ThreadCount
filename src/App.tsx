import React, { useState } from 'react';
import { ToastProvider } from './components/ui/Toast';
import { AppLayout } from './components/layout/AppLayout';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Wardrobe } from './pages/Wardrobe';
import { OutfitBuilder } from './pages/OutfitBuilder';
import { TryOn } from './pages/TryOn';
import { SavedOutfits } from './pages/SavedOutfits';
import { Inspiration } from './pages/Inspiration';

type Page = 'landing' | 'dashboard' | 'wardrobe' | 'outfit-builder' | 'try-on' | 'saved-outfits' | 'inspiration' | 'settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleGetStarted = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    // Auto-hide sidebar when navigating to outfit builder
    if (page === 'outfit-builder') {
      setSidebarVisible(false);
    } else {
      setSidebarVisible(true);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <Landing onGetStarted={handleGetStarted} />;
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'wardrobe':
        return <Wardrobe />;
      case 'outfit-builder':
        return <OutfitBuilder />;
      case 'try-on':
        return <TryOn />;
      case 'saved-outfits':
        return <SavedOutfits onNavigate={handleNavigate} />;
      case 'inspiration':
        return <Inspiration />;
      case 'settings':
        return (
          <div>
            <h1 className="mb-4">Settings</h1>
            <p className="text-[var(--secondary)]">Settings page coming soon...</p>
          </div>
        );
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <ToastProvider>
      {!isAuthenticated || currentPage === 'landing' ? (
        renderPage()
      ) : (
        <AppLayout 
          currentPage={currentPage} 
          onNavigate={handleNavigate}
          sidebarVisible={sidebarVisible}
          setSidebarVisible={setSidebarVisible}
        >
          {renderPage()}
        </AppLayout>
      )}
    </ToastProvider>
  );
}
