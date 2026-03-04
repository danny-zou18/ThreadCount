import { useEffect, useState } from 'react';
import { useOutfitBuilderStore } from '../store';
import { useWardrobeStore } from '@/features/wardrobe/store';
import { OutfitCanvas } from '../components/OutfitCanvas';
import { WardrobePanel } from '../components/WardrobePanel';
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
      <div className="max-w-7xl mx-auto h-[calc(100vh-6rem)]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Outfit Builder</h1>
            <p className="text-[var(--text-secondary)] mt-1">
              Click on the canvas to add items from your wardrobe
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                {itemCount > 0 ? `${itemCount} item${itemCount !== 1 ? 's' : ''} selected` : 'Click to add items'}
              </h2>
            </div>
            <OutfitCanvas />
          </div>

          <div className="lg:col-span-1 flex flex-col gap-4">
            <div className="flex-1 min-h-0">
              <WardrobePanel />
            </div>
            
            <div className="flex-shrink-0">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">Saved Outfits</h3>
                <span className="text-xs text-[var(--text-tertiary)]">
                  {outfits.length}
                </span>
              </div>

              {outfits.length === 0 ? (
                <div className="p-4 text-center rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)]">
                  <p className="text-sm text-[var(--text-tertiary)]">No saved outfits</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                  {outfits.slice(0, 4).map((outfit) => (
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
        </div>

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
