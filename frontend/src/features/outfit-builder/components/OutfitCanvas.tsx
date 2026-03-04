import { useOutfitBuilderStore } from '../store';
import { SLOT_ORDER, SLOT_LABELS, type OutfitSlot } from '../types';
import { getItemImageUrl } from '../api';

export function OutfitCanvas() {
  const { canvas, setSelectedSlot, selectedSlot, setCanvasItem } = useOutfitBuilderStore();

  const handleSlotClick = (slot: OutfitSlot) => {
    setSelectedSlot(slot);
  };

  const handleRemoveItem = (slot: OutfitSlot, e: React.MouseEvent) => {
    e.stopPropagation();
    setCanvasItem(slot, null);
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-[var(--bg-elevated)] rounded-lg border border-[var(--border)]">
      {SLOT_ORDER.map((slot) => {
        const item = canvas[slot];
        const isSelected = selectedSlot === slot;
        const imageUrl = item ? getItemImageUrl(item.image_path) : null;

        return (
          <div
            key={slot}
            onClick={() => handleSlotClick(slot)}
            className={`
              relative flex items-center justify-center min-h-[100px] p-4 
              rounded-lg border-2 border-dashed cursor-pointer
              transition-all duration-200
              ${isSelected 
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10' 
                : 'border-[var(--border)] hover:border-[var(--color-primary)]/50'
              }
            `}
          >
            {imageUrl ? (
              <div className="relative w-full flex items-center justify-center">
                <img
                  src={imageUrl}
                  alt={item?.name || ''}
                  className="max-h-32 object-contain"
                />
                <button
                  onClick={(e) => handleRemoveItem(slot, e)}
                  className="absolute top-0 right-0 p-1 rounded-full bg-[var(--color-danger)] text-white hover:bg-[var(--color-danger)]/80 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-[var(--text-tertiary)] text-sm font-medium">
                  {SLOT_LABELS[slot]}
                </p>
                <p className="text-[var(--text-tertiary)] text-xs mt-1">
                  Click to add
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
