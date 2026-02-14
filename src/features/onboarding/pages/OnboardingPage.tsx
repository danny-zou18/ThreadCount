import { useAuthStore } from '@/features/auth/store';
import { Button } from '@/shared/ui/Button';

export function OnboardingPage() {
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <h1
          className="text-4xl text-[var(--text-primary)] mb-3"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Welcome to Seamless
        </h1>
        <p
          className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-8"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Let&apos;s set up your profile
        </p>

        <div className="border-t border-[var(--border-strong)] mb-10" />

        <div className="bg-[var(--bg-elevated)] border border-[var(--border)] p-10 mb-8">
          <p
            className="text-xs uppercase tracking-[0.15em] text-[var(--text-tertiary)] mb-4"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Signed in as
          </p>
          <p
            className="text-sm text-[var(--text-primary)] mb-8"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {user?.email ?? 'unknown'}
          </p>

          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8">
            Upload a full body photo of yourself so we can create your avatar. This will be used to
            generate AI images of you wearing your outfits.
          </p>

          <div className="border border-dashed border-[var(--border)] p-8 mb-8">
            <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider">
              Photo upload coming soon
            </p>
          </div>

          <Button className="w-full" disabled>
            Continue
          </Button>
        </div>

        <Button variant="ghost" size="sm" onClick={logout}>
          Log out
        </Button>
      </div>
    </div>
  );
}
