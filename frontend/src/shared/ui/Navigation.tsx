import { useState, useRef, useEffect, type ReactNode } from 'react';
import { clsx } from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon } from 'lucide-react';

type NavItem = {
  label: string;
  href: string;
  icon?: ReactNode;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Wardrobe', href: '/wardrobe' },
  { label: 'Outfits', href: '/outfits' },
];

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={clsx('fixed top-6 left-6 z-50', className)}>
      <div className="flex gap-2">
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={clsx(
              'flex items-center gap-3 px-4 py-2.5 text-sm font-medium uppercase tracking-wider transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]',
              'bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-strong)] hover:border-[var(--text-primary)]',
            )}
          >
            Seamless
            <MenuIcon className="h-4 w-4" />
          </button>

          {isOpen && (
            <div
              className={clsx(
                'absolute right-0 top-full mt-1 min-w-[160px]',
                'bg-[var(--bg-elevated)] border border-[var(--border-strong)]',
                'shadow-lg z-10',
              )}
            >
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={clsx(
                      'block px-4 py-2.5 text-sm font-medium uppercase tracking-wider transition-all duration-200',
                      'focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]',
                      isActive
                        ? 'text-[var(--text-primary)] bg-[var(--bg)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg)]',
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className={clsx(
              'flex items-center justify-center px-4 py-2.5 text-sm font-medium uppercase tracking-wider transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]',
              'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-strong)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]',
            )}
          >
            User
          </button>

          {isUserMenuOpen && (
            <div
              className={clsx(
                'absolute right-0 top-full mt-1 min-w-[180px]',
                'bg-[var(--bg-elevated)] border border-[var(--border-strong)]',
                'shadow-lg z-10',
              )}
            >
              <Link
                to="/profile"
                onClick={() => setIsUserMenuOpen(false)}
                className={clsx(
                  'block px-4 py-2.5 text-sm font-medium uppercase tracking-wider transition-all duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]',
                  'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg)]',
                )}
              >
                Profile
              </Link>
              <Link
                to="/settings"
                onClick={() => setIsUserMenuOpen(false)}
                className={clsx(
                  'block px-4 py-2.5 text-sm font-medium uppercase tracking-wider transition-all duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]',
                  'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg)]',
                )}
              >
                Settings
              </Link>
              <Link
                to="/login"
                onClick={() => setIsUserMenuOpen(false)}
                className={clsx(
                  'block px-4 py-2.5 text-sm font-medium uppercase tracking-wider transition-all duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]',
                  'text-[var(--text-secondary)] hover:text-[var(--error)] hover:bg-[var(--bg)]',
                )}
              >
                Sign Out
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
