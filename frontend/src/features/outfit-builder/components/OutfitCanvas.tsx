import { useOutfitBuilderStore } from '../store';
import { SLOT_ORDER, type OutfitSlot } from '../types';
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

  const getPosition = (slot: OutfitSlot) => {
    const positions: Record<OutfitSlot, { top: string; left: string }> = {
      base: { top: '15%', left: '35%' },
      outer: { top: '10%', left: '35%' },
      bottom: { top: '45%', left: '35%' },
      shoes: { top: '75%', left: '35%' },
      accessory: { top: '30%', left: '70%' },
    };
    return positions[slot];
  };

  return (
    <div className="relative w-full aspect-[3/4] bg-white rounded-lg overflow-hidden shadow-md">
      {SLOT_ORDER.map((slot) => {
        const item = canvas[slot];
        const isSelected = selectedSlot === slot;
        const imageUrl = item ? getItemImageUrl(item.image_path) : null;
        const position = getPosition(slot);

        return (
          <div
            key={slot}
            onClick={() => handleSlotClick(slot)}
            className={`
              absolute flex items-center justify-center
              transition-all duration-200 cursor-pointer
              ${isSelected ? 'ring-2 ring-[var(--color-primary)] ring-offset-2' : ''}
            `}
            style={{
              top: position.top,
              left: position.left,
              transform: 'translate(-50%, -50%)',
              width: slot === 'accessory' ? '80px' : '120px',
              height: slot === 'accessory' ? '80px' : '120px',
            }}
          >
            {imageUrl ? (
              <div className="relative w-full h-full">
                <img
                  src={imageUrl}
                  alt={item?.name || ''}
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={(e) => handleRemoveItem(slot, e)}
                  className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className={`
                w-full h-full flex flex-col items-center justify-center
                border-2 border-dashed rounded-lg
                ${isSelected 
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10' 
                  : 'border-gray-300 bg-gray-50'
                }
              `}>
                <span className="text-2xl">
                  {slot === 'base' && '👕'}
                  {slot === 'outer' && '🧥'}
                  {slot === 'bottom' && '👖'}
                  {slot === 'shoes' && '👟'}
                  {slot === 'accessory' && '👜'}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
