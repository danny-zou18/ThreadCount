import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '@/features/auth/store';
import { Button } from '@/shared/ui/Button';
import { Navigation } from '@/shared/ui/Navigation';
import { getAvatar, processAvatar } from '@/features/profile/api';
import { supabase } from '@/shared/api/supabase';

export function DashboardPage() {
  const { user } = useAuthStore();
  const [avatar, setAvatar] = useState<{
    original_photo_path?: string | null;
    model_canvas_path?: string | null;
    model_status?: string | null;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAvatar = useCallback(async () => {
    if (!user) return;
    const data = await getAvatar(user.id);
    setAvatar(data);
  }, [user]);

  useEffect(() => {
    loadAvatar();
  }, [loadAvatar]);

  const handleRegenerate = async () => {
    if (!user) return;
    setIsGenerating(true);
    setError(null);

    try {
      await processAvatar(user.id);
      await loadAvatar();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate avatar');
    } finally {
      setIsGenerating(false);
    }
  };

  const getAvatarUrl = (path: string) => {
    const { data } = supabase.storage.from('avatars').getPublicUrl(path);
    return data.publicUrl;
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[var(--bg)] p-8 pt-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex items-end justify-between">
            <h1
              className="text-4xl text-[var(--text-primary)]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Dashboard
            </h1>
          </div>
          <div className="mb-12 border-t border-[var(--border-strong)]" />

          <p className="mb-8 text-sm leading-relaxed text-[var(--text-secondary)]">
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
            ) : null}
            . Your wardrobe awaits.
          </p>

          <div className="mb-6 border border-[var(--border)] bg-[var(--bg-elevated)] p-6">
            <h2
              className="mb-4 text-xl text-[var(--text-primary)]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Your Avatar
            </h2>

            {error && (
              <div className="mb-4 rounded border border-[var(--error)] bg-[var(--error)] bg-opacity-10 p-3 text-sm text-[var(--error)]">
                {error}
              </div>
            )}

            {avatar ? (
              <div className="space-y-4">
                <div className="flex gap-4">
                  {avatar.original_photo_path && (
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-wider text-[var(--text-tertiary)]">
                        Original
                      </p>
                      <div className="h-40 w-32 overflow-hidden rounded-lg bg-[var(--bg)]">
                        <img
                          src={getAvatarUrl(avatar.original_photo_path)}
                          alt="Original"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="mb-2 text-xs uppercase tracking-wider text-[var(--text-tertiary)]">
                      Model Canvas
                    </p>
                    {avatar.model_canvas_path ? (
                      <div className="h-40 w-32 overflow-hidden rounded-lg bg-[var(--bg)]">
                        <img
                          src={getAvatarUrl(avatar.model_canvas_path)}
                          alt="Model Canvas"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-40 w-32 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--border)]">
                        <span className="text-xs text-[var(--text-tertiary)]">
                          {avatar.model_status === 'processing' ? 'Generating...' : 'Not generated'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="text-xs text-[var(--text-tertiary)]">
                      Status: <span className="uppercase">{avatar.model_status || 'pending'}</span>
                    </p>
                    <Button size="sm" onClick={handleRegenerate} disabled={isGenerating}>
                      {isGenerating ? 'Generating...' : 'Regenerate Avatar'}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="mb-4 text-sm text-[var(--text-secondary)]">
                  You haven't uploaded an avatar yet.
                </p>
                <Button onClick={() => (window.location.href = '/onboarding')}>
                  Set Up Avatar
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
