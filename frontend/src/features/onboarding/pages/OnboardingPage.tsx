import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store';
import { Navigation } from '@/shared/ui/Navigation';
import { PhotoUpload } from '../components/PhotoUpload';
import {
  uploadAvatarPhoto,
  createAvatar,
  updateProfile,
  processAvatar,
} from '@/features/profile/api';

export function OnboardingPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [step, setStep] = useState<'upload' | 'processing' | 'success'>('upload');
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handlePhotoSelected = (_file: File) => {
    setUploadError(null);
  };

  const handleUpload = async (file: File) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { path } = await uploadAvatarPhoto(user.id, file);
    await createAvatar(user.id, path);
  };

  const handleContinue = async () => {
    if (!user) return;

    setStep('processing');
    setUploadError(null);

    try {
      await processAvatar(user.id);
      await updateProfile(user.id, { onboarding_completed: true });
      setStep('success');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Failed to create avatar');
      setStep('upload');
    }
  };

  const handleSkip = async () => {
    if (user) {
      await updateProfile(user.id, { onboarding_completed: true });
    }
    navigate('/dashboard');
  };

  return (
    <>
      <Navigation />
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-4 pt-16">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1
              className="mb-3 text-4xl text-[var(--text-primary)]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Welcome to Seamless
            </h1>
            <p
              className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Let&apos;s set up your profile
            </p>
          </div>

          <div className="mb-8 border-t border-[var(--border-strong)]" />

          {step === 'upload' && (
            <>
              <div className="mb-6 border border-[var(--border)] bg-[var(--bg-elevated)] p-6">
                <p
                  className="mb-4 text-xs uppercase tracking-[0.15em] text-[var(--text-tertiary)]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  Signed in as
                </p>
                <p
                  className="mb-6 text-sm text-[var(--text-primary)]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {user?.email ?? 'unknown'}
                </p>
              </div>

              {uploadError && (
                <div className="mb-4 rounded border border-[var(--error)] bg-[var(--error)] bg-opacity-10 p-3 text-sm text-[var(--error)]">
                  {uploadError}
                </div>
              )}

              <PhotoUpload
                onPhotoSelected={handlePhotoSelected}
                onUpload={handleUpload}
                onContinue={handleContinue}
                onSkip={handleSkip}
              />
            </>
          )}

          {step === 'processing' && (
            <div className="border border-[var(--border)] bg-[var(--bg-elevated)] p-6 text-center">
              <p
                className="mb-3 text-xs uppercase tracking-[0.15em] text-[var(--text-tertiary)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Building your avatar
              </p>
              <p className="text-sm text-[var(--text-secondary)]">
                We&apos;re generating your model canvas now.
              </p>
            </div>
          )}

          {step === 'success' && (
            <div className="py-8 text-center">
              <p
                className="text-xs uppercase tracking-[0.15em] text-[var(--text-tertiary)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Avatar Ready!
              </p>
              <p className="text-sm text-[var(--text-secondary)]">
                Redirecting you to the dashboard...
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
