import { useEffect, useState } from 'react';
import { useOutfitBuilderStore } from '../store';
import { useWardrobeStore } from '@/features/wardrobe/store';
import { OutfitCanvas } from '../components/OutfitCanvas';
import { WardrobeSelector } from '../components/WardrobeSelector';
import { OutfitCard } from '../components/OutfitCard';
import { Button } from '@/shared/ui/Button';

export function OutfitBuilderPage() {
  const { fetchOutfits, outfits, loadOutfit, deleteOutfit, saveOutfit, clearCanvas, canvas } = useOutfitBuilderStore();
  const { fetchItems } = useWardrobeStore();
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [outfitName, setOutfitName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchItems();
    fetchOutfits();
  }, [fetchItems, fetchOutfits]);

  const hasItems = Object.values(canvas).some((item) => item !== null);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveOutfit(outfitName || 'Untitled Outfit');
      setShowSaveModal(false);
      setOutfitName('');
    } catch {
      // Error handled in store
    } finally {
      setIsSaving(false);
    }
  };

  const handleNewOutfit = () => {
    clearCanvas();
  };

  const handleSelectOutfit = async (outfit: typeof outfits[0]) => {
    await loadOutfit(outfit);
  };

  const itemCount = Object.values(canvas).filter((item) => item !== null).length;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Outfit Builder</h1>
            <p className="text-[var(--text-secondary)] mt-1">
              Create outfits by selecting items from your wardrobe
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={handleNewOutfit}>
              New Outfit
            </Button>
            <Button variant="primary" onClick={() => setShowSaveModal(true)} disabled={!hasItems}>
              Save Outfit
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Canvas</h2>
              <span className="text-sm text-[var(--text-tertiary)]">
                {itemCount} item{itemCount !== 1 ? 's' : ''} selected
              </span>
            </div>
            <OutfitCanvas />
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Saved Outfits</h2>
              <span className="text-sm text-[var(--text-tertiary)]">
                {outfits.length} outfit{outfits.length !== 1 ? 's' : ''}
              </span>
            </div>

            {outfits.length === 0 ? (
              <div className="p-8 text-center rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)]">
                <div className="text-4xl mb-3">👔</div>
                <p className="text-[var(--text-secondary)]">No saved outfits yet</p>
                <p className="text-sm text-[var(--text-tertiary)] mt-1">
                  Create your first outfit by selecting items from the canvas
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {outfits.map((outfit) => (
                  <OutfitCard
                    key={outfit.id}
                    outfit={outfit}
                    onSelect={handleSelectOutfit}
                    onDelete={deleteOutfit}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <WardrobeSelector />

        {showSaveModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md bg-[var(--bg-elevated)] rounded-lg border border-[var(--border)] p-6">
              <h2 className="text-lg font-semibold mb-4">Save Outfit</h2>
              <input
                type="text"
                value={outfitName}
                onChange={(e) => setOutfitName(e.target.value)}
                placeholder="Outfit name (optional)"
                className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] mb-4"
              />
              <div className="flex gap-3">
                <Button variant="ghost" onClick={() => setShowSaveModal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSave} disabled={isSaving} className="flex-1">
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
