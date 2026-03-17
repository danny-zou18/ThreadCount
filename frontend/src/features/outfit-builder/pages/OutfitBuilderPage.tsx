import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, Plus, RefreshCcw, Save } from 'lucide-react';
import { useOutfitBuilderStore } from '../store';
import { useWardrobeStore } from '@/features/wardrobe/store';
import { OutfitCanvas } from '../components/OutfitCanvas';
import { WardrobePanel } from '../components/WardrobePanel';
import { SaveOutfitModal } from '../components/builder/SaveOutfitModal';
import { Button } from '@/shared/ui/Button';
import { SurfaceMessage } from '@/shared/ui/SurfaceMessage';

export function OutfitBuilderPage() {
  const {
    clearCanvas,
    clearError,
    currentOutfit,
    error,
    fetchOutfits,
    isLoading,
    loadOutfit,
    outfits,
    saveOutfit,
  } = useOutfitBuilderStore();
  const { fetchItems, items: wardrobeItems, isLoading: isWardrobeLoading } = useWardrobeStore();
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [outfitName, setOutfitName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveState, setSaveState] = useState<'idle' | 'saved'>('idle');

  useEffect(() => {
    void fetchItems();
    void fetchOutfits();
  }, [fetchItems, fetchOutfits]);

  useEffect(() => {
    if (!saveState || saveState !== 'saved') {
      return;
    }

    const timer = window.setTimeout(() => setSaveState('idle'), 2400);
    return () => window.clearTimeout(timer);
  }, [saveState]);

  const canvas = useOutfitBuilderStore((state) => state.canvas);
  const hasItems = useMemo(
    () =>
      canvas.top.length > 0 ||
      canvas.bottom !== null ||
      canvas.shoes !== null ||
      canvas.accessoriesLeft.length > 0 ||
      canvas.accessoriesRight.length > 0,
    [canvas],
  );

  const isBootstrapping =
    (isLoading && outfits.length === 0) || (isWardrobeLoading && wardrobeItems.length === 0);
  const isRefreshDisabled = isLoading || isWardrobeLoading;

  const handleSave = async () => {
    setIsSaving(true);
    setSaveState('idle');

    try {
      await saveOutfit(outfitName.trim() || 'Untitled Outfit');
      setShowSaveModal(false);
      setOutfitName('');
      setSaveState('saved');
    } catch {
      // store handles error state
    } finally {
      setIsSaving(false);
    }
  };

  const handleNewOutfit = () => {
    clearCanvas();
    setSaveState('idle');
    setOutfitName('');
  };

  const handleReload = () => {
    clearError();
    void fetchItems();
    void fetchOutfits();
  };

  return (
    <div className="builder-shell page-enter bg-[var(--bg)]">
      <section className="builder-canvas-row px-[var(--page-px)] pt-5 pb-5">
        <div className="grid h-full min-h-0 grid-cols-[minmax(0,1.58fr)_minmax(280px,0.92fr)] gap-6 overflow-hidden">
          <section className="flex min-h-0 flex-col overflow-hidden bg-transparent">
            <div className="flex flex-none items-start justify-between gap-4 px-1 pb-2">
              <div className="min-w-0">
                <p className="eyebrow text-[var(--text-muted)]">Outfit atelier</p>
              </div>
              {currentOutfit ? (
                <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {currentOutfit.name || 'Untitled look'}
                </p>
              ) : null}
            </div>

            {error ? (
              <div
                className="mb-3 flex flex-none items-center justify-between gap-4 bg-[color:rgba(251,251,248,0.74)] px-4 py-3 text-sm text-[var(--text-primary)]"
                role="alert"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>{error}</p>
                </div>
                <div className="flex gap-3">
                  <Button onClick={clearError} size="sm" variant="ghost">
                    Dismiss
                  </Button>
                  <Button onClick={handleReload} size="sm" variant="secondary">
                    <RefreshCcw className="h-4 w-4" />
                    Retry
                  </Button>
                </div>
              </div>
            ) : null}

            <div className="canvas-area min-h-0 flex-1 overflow-hidden">
              {isBootstrapping ? (
                <SurfaceMessage
                  className="flex h-full min-h-0 items-center justify-center"
                  description="Loading wardrobe pieces and saved looks into the builder studio."
                  kicker="Loading"
                  title="Preparing atelier"
                />
              ) : (
                <OutfitCanvas />
              )}
            </div>
          </section>

          <div className="min-h-0 overflow-hidden bg-transparent">
            <WardrobePanel
              isBootstrapping={isBootstrapping}
              isRefreshDisabled={isRefreshDisabled}
              onDeleteSavedLook={(outfitId) =>
                void useOutfitBuilderStore.getState().deleteOutfit(outfitId)
              }
              onLoadSavedLook={(selectedOutfit) => void loadOutfit(selectedOutfit)}
              onRefreshSavedLooks={handleReload}
              outfits={outfits}
              saveState={saveState}
            />
          </div>
        </div>
      </section>

      <div className="builder-controls flex items-center justify-between gap-6 px-[var(--page-px)]">
        <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
          {currentOutfit ? 'Editing look' : 'New look'}
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={handleNewOutfit} size="sm" variant="secondary">
            <Plus className="h-4 w-4" />
            New look
          </Button>
          <Button disabled={!hasItems || isSaving} onClick={() => setShowSaveModal(true)} size="sm">
            <Save className="h-4 w-4" />
            Save look
          </Button>
        </div>
      </div>

      {showSaveModal ? (
        <SaveOutfitModal
          isSaving={isSaving}
          name={outfitName}
          onChange={setOutfitName}
          onClose={() => setShowSaveModal(false)}
          onSave={handleSave}
        />
      ) : null}
    </div>
  );
}
