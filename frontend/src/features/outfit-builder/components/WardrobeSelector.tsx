import { useEffect, useState } from 'react';
import { useOutfitBuilderStore } from '../store';
import { useWardrobeStore } from '@/features/wardrobe/store';
import { SLOT_CATEGORIES, SLOT_LABELS, type OutfitItem } from '../types';
import { CATEGORY_LABELS, type Category } from '@/features/wardrobe/types';
import { supabase } from '@/shared/api/supabase';
import { Button } from '@/shared/ui/Button';

function getItemImageUrl(path: string | null): string | null {
  if (!path) return null;
  const { data } = supabase.storage.from('wardrobe').getPublicUrl(path);
  return data.publicUrl;
}

export function WardrobeSelector() {
  const { selectedSlot, setCanvasItem, setSelectedSlot } = useOutfitBuilderStore();
  const { items: wardrobeItems } = useWardrobeStore();
  const [activeCategory, setActiveCategory] = useState<Category>('tops');

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (selectedSlot) {
      const categories = SLOT_CATEGORIES[selectedSlot];
      const firstCategory = categories[0];
      if (firstCategory) {
        setActiveCategory(firstCategory);
      }
    }
  }, [selectedSlot]);
  /* eslint-enable react-hooks/set-state-in-effect */

  if (!selectedSlot) return null;

  const categories = SLOT_CATEGORIES[selectedSlot];
  const filteredItems = wardrobeItems.filter((item) => categories.includes(item.category));

  const handleSelectItem = (item: { id: string; name: string; category: Category; image_path: string | null }) => {
    const outfitItem: OutfitItem = {
      id: item.id,
      name: item.name,
      category: item.category,
      image_path: item.image_path,
    };
    setCanvasItem(selectedSlot, outfitItem);
  };

  const handleClose = () => {
    setSelectedSlot(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl max-h-[80vh] bg-[var(--bg-elevated)] rounded-lg border border-[var(--border)] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <h2 className="text-lg font-semibold">Select {SLOT_LABELS[selectedSlot]}</h2>
          <button
            onClick={handleClose}
            className="p-1 rounded hover:bg-[var(--bg-hover)] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {categories.length > 1 && (
          <div className="flex gap-2 p-4 border-b border-[var(--border)]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8 text-[var(--text-tertiary)]">
              <p>No items in this category.</p>
              <p className="text-sm mt-2">Add items to your wardrobe first.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {filteredItems.map((item) => {
                const imageUrl = getItemImageUrl(item.image_path);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectItem(item)}
                    className="flex flex-col items-center p-3 rounded-lg border border-[var(--border)] hover:border-[var(--color-primary)] hover:bg-[var(--bg-hover)] transition-all"
                  >
                    <div className="w-20 h-20 flex items-center justify-center mb-2">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={item.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-[var(--bg-secondary)] rounded flex items-center justify-center">
                          <span className="text-2xl">👕</span>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-[var(--text-secondary)] text-center truncate w-full">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-[var(--border)]">
          <Button variant="ghost" onClick={handleClose} className="w-full">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
