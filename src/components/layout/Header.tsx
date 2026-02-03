import React from 'react';
import { Search, Bell, User, Menu, X } from 'lucide-react';

interface HeaderProps {
  sidebarCollapsed: boolean;
  sidebarVisible: boolean;
  setSidebarVisible: (visible: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ sidebarCollapsed, sidebarVisible, setSidebarVisible }) => {
  return (
    <header
      className="h-16 bg-white border-b border-[var(--border)] fixed top-0 right-0 z-20 flex items-center justify-between px-6 transition-all"
      style={{ left: sidebarVisible ? (sidebarCollapsed ? 64 : 240) : 0 }}
    >
      {/* Left Section - Toggle Button */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setSidebarVisible(!sidebarVisible)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
        >
          {sidebarVisible ? (
            <X size={20} className="text-[var(--secondary)]" />
          ) : (
            <Menu size={20} className="text-[var(--secondary)]" />
          )}
        </button>
        
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--secondary)]" size={18} />
            <input
              type="text"
              placeholder="Search wardrobe, outfits..."
              className="w-full pl-10 pr-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
          <Bell size={20} className="text-[var(--secondary)]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--accent)] rounded-full"></span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-[var(--border)]">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium">Sarah Chen</p>
            <p className="text-xs text-[var(--secondary)]">Premium</p>
          </div>
          <div className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center text-white font-medium">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};
