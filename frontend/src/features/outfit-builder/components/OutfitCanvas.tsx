import { useOutfitBuilderStore } from '../store';
import { type OutfitSlot } from '../types';
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

  const renderSlot = (slot: OutfitSlot) => {
    const item = canvas[slot];
    const isSelected = selectedSlot === slot;
    const imageUrl = item ? getItemImageUrl(item.image_path) : null;

    const placeholders: Record<OutfitSlot, string> = {
      top1: '👕',
      top2: '+',
      bottom: '👖',
      shoes: '👟',
    };

    return (
      <div
        key={slot}
        onClick={() => handleSlotClick(slot)}
        className={`
          relative flex items-center justify-center
          transition-all duration-200 cursor-pointer
          ${isSelected ? 'ring-2 ring-[var(--color-primary)]' : ''}
        `}
      >
        {imageUrl ? (
          <div className="relative w-full h-full p-1">
            <img
              src={imageUrl}
              alt={item?.name || ''}
              className="w-full h-full object-contain"
            />
            <button
              onClick={(e) => handleRemoveItem(slot, e)}
              className="absolute top-1 right-1 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 opacity-0 hover:opacity-100 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${isSelected ? 'bg-[var(--color-primary)]/10' : ''}`}>
            <span className="text-2xl opacity-20">{placeholders[slot]}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="flex h-[35%]">
        <div className="w-1/2 h-full">
          {renderSlot('top1')}
        </div>
        <div className="w-1/2 h-full">
          {renderSlot('top2')}
        </div>
      </div>
      <div className="h-[45%]">
        {renderSlot('bottom')}
      </div>
      <div className="h-[20%]">
        {renderSlot('shoes')}
      </div>
    </div>
  );
}
