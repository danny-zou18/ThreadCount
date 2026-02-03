import React from 'react';
import { motion } from 'motion/react';
import { Grid, Shirt, Layers, Sparkles, Bookmark, Lightbulb, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Grid },
  { id: 'wardrobe', label: 'My Wardrobe', icon: Shirt },
  { id: 'outfit-builder', label: 'Outfit Builder', icon: Layers },
  { id: 'try-on', label: 'Virtual Try-On', icon: Sparkles },
  { id: 'saved-outfits', label: 'Saved Outfits', icon: Bookmark },
  { id: 'inspiration', label: 'Inspiration', icon: Lightbulb },
];

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed, currentPage, onNavigate }) => {
  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 240 }}
      className="h-screen bg-white border-r border-[var(--border)] flex flex-col fixed left-0 top-0 z-30"
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-[var(--border)]">
        {!collapsed ? (
          <h3 className="text-[var(--accent)]">StyleMirror</h3>
        ) : (
          <div className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center text-white font-bold">
            SM
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                isActive
                  ? 'bg-[var(--accent)]/10 text-[var(--accent)] border-r-2 border-[var(--accent)]'
                  : 'text-[var(--secondary)] hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </button>
          );
        })}

        <div className="my-4 border-t border-[var(--border)]" />

        <button
          onClick={() => onNavigate('settings')}
          className="w-full flex items-center gap-3 px-4 py-3 text-[var(--secondary)] hover:bg-gray-50 transition-colors"
        >
          <Settings size={20} />
          {!collapsed && <span className="text-sm">Settings</span>}
        </button>
      </nav>

      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="h-12 flex items-center justify-center border-t border-[var(--border)] text-[var(--secondary)] hover:bg-gray-50 transition-colors"
      >
        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
    </motion.aside>
  );
};
