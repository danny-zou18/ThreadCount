import { useAuthStore } from '@/features/auth/store';
import { Button } from '@/shared/ui/Button';

export function DashboardPage() {
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-[var(--bg)] p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header with rule */}
        <div className="flex items-end justify-between mb-4">
          <h1
            className="text-4xl text-[var(--text-primary)]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Dashboard
          </h1>
          <Button variant="ghost" size="sm" onClick={logout}>
            Log out
          </Button>
        </div>
        <div className="border-t border-[var(--border-strong)] mb-12" />

        {/* Welcome */}
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
          Welcome back
          {user?.email ? (
            <>
              ,{' '}
              <span
                className="text-[var(--text-primary)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {user.email}
              </span>
            </>
          ) : (
            ''
          )}
          . Your wardrobe awaits.
        </p>
      </div>
    </div>
  );
}
