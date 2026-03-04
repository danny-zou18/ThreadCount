import { useState } from 'react';
import { useOutfitBuilderStore } from '../store';
import { useWardrobeStore } from '@/features/wardrobe/store';
import { 
  MAIN_CATEGORIES, 
  MAIN_CATEGORY_ORDER, 
  type MainCategory,
  type SubCategory,
  type OutfitItem,
  categoryToSlot,
} from '../types';
import { type Category } from '@/features/wardrobe/types';
import { supabase } from '@/shared/api/supabase';
import { Button } from '@/shared/ui/Button';

function getItemImageUrl(path: string | null): string | null {
  if (!path) return null;
  const { data } = supabase.storage.from('wardrobe').getPublicUrl(path);
  return data.publicUrl;
}

export function WardrobePanel() {
  const { addToSlot, removeFromSlot, canvas } = useOutfitBuilderStore();
  const { items: wardrobeItems } = useWardrobeStore();
  const [selectedMain, setSelectedMain] = useState<MainCategory | null>(null);
  const [selectedSub, setSelectedSub] = useState<SubCategory | null>(null);
  const [pendingItem, setPendingItem] = useState<OutfitItem | null>(null);

  const handleSelectMain = (main: MainCategory) => {
    setSelectedMain(main);
    setSelectedSub(null);
  };

  const handleSelectSub = (sub: SubCategory) => {
    setSelectedSub(sub);
  };

  const handleBack = () => {
    if (selectedSub) {
      setSelectedSub(null);
    } else if (selectedMain) {
      setSelectedMain(null);
    }
  };

  const handleSelectItem = (item: { id: string; name: string; category: Category; image_path: string | null }) => {
    const outfitItem: OutfitItem = {
      id: item.id,
      name: item.name,
      category: item.category,
      image_path: item.image_path,
    };

    const slot = categoryToSlot(item.category);

    if (slot === 'top') {
      addToSlot('top', outfitItem);
    } else if (slot === 'bottom') {
      if (canvas.bottom) {
        setPendingItem(outfitItem);
      } else {
        addToSlot('bottom', outfitItem);
      }
    } else if (slot === 'shoes') {
      if (canvas.shoes) {
        setPendingItem(outfitItem);
      } else {
        addToSlot('shoes', outfitItem);
      }
    }
  };

  const handleConfirmReplace = () => {
    if (!pendingItem) return;
    const slot = categoryToSlot(pendingItem.category);
    if (slot === 'bottom') {
      removeFromSlot('bottom');
    } else if (slot === 'shoes') {
      removeFromSlot('shoes');
    }
    addToSlot(slot, pendingItem);
    setPendingItem(null);
  };

  const isItemInCanvas = (itemId: string) => {
    const inTop = canvas.top.some((item) => item.id === itemId);
    const inBottom = canvas.bottom?.id === itemId;
    const inShoes = canvas.shoes?.id === itemId;
    return inTop || inBottom || inShoes;
  };

  const getFilteredItems = () => {
    if (!selectedSub) return [];
    return wardrobeItems.filter((item) => selectedSub.categories.includes(item.category));
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="flex flex-col h-full bg-[var(--bg-elevated)] rounded-lg border border-[var(--border)]">
      <div className="p-3 border-b border-[var(--border)] flex items-center gap-2">
        {selectedMain && (
          <button
            onClick={handleBack}
            className="p-1 rounded hover:bg-[var(--bg-hover)] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
        <h2 className="text-base font-semibold text-[var(--text-primary)]">
          {selectedSub ? selectedSub.label : selectedMain ? MAIN_CATEGORIES[selectedMain].label : 'Wardrobe'}
        </h2>
      </div>

      {!selectedMain && (
        <div className="flex-1 p-4 flex flex-col gap-3">
          {MAIN_CATEGORY_ORDER.map((main) => (
            <button
              key={main}
              onClick={() => handleSelectMain(main)}
              className="p-4 rounded-lg border border-[var(--border)] hover:border-[var(--color-primary)] hover:bg-[var(--bg-hover)] transition-all text-left"
            >
              <span className="font-medium">{MAIN_CATEGORIES[main].label}</span>
            </button>
          ))}
        </div>
      )}

      {selectedMain && !selectedSub && (
        <div className="flex-1 p-4 flex flex-col gap-3">
          {MAIN_CATEGORIES[selectedMain].subCategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => handleSelectSub(sub)}
              className="p-3 rounded-lg border border-[var(--border)] hover:border-[var(--color-primary)] hover:bg-[var(--bg-hover)] transition-all text-left"
            >
              <span>{sub.label}</span>
            </button>
          ))}
        </div>
      )}

      {selectedSub && (
        <div className="flex-1 overflow-y-auto p-3">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8 text-[var(--text-tertiary)]">
              <p>No items in this category</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {filteredItems.map((item) => {
                const imageUrl = getItemImageUrl(item.image_path);
                const inCanvas = isItemInCanvas(item.id);

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectItem(item)}
                    className={`
                      flex flex-col items-center p-2 rounded-lg border transition-all
                      ${inCanvas
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                        : 'border-[var(--border)] hover:border-[var(--color-primary)] hover:bg-[var(--bg-hover)]'
                      }
                    `}
                  >
                    <div className="w-14 h-14 flex items-center justify-center mb-1">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={item.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-[var(--bg-secondary)] rounded flex items-center justify-center">
                          <span className="text-lg">👕</span>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-[var(--text-secondary)] text-center truncate w-full">
                      {item.name}
                    </span>
                    {inCanvas && (
                      <span className="text-[10px] text-[var(--color-primary)]">Added</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {pendingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-xs bg-[var(--bg-elevated)] rounded-lg border border-[var(--border)] p-4">
            <h3 className="font-semibold mb-2">Replace item?</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              This slot already has an item. Replace it with {pendingItem.name}?
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setPendingItem(null)} className="flex-1">
                Cancel
              </Button>
              <Button variant="primary" onClick={handleConfirmReplace} className="flex-1">
                Replace
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
