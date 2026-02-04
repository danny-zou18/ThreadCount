import React from 'react';
import { Modal } from '../ui/Modal';
import { WardrobeItem } from '../../data/mockData';
import { Button } from '../ui/Button';

interface ReplaceFootwearModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentFootwear: WardrobeItem[];
  onSelectReplace: (index: number) => void;
}

export const ReplaceFootwearModal: React.FC<ReplaceFootwearModalProps> = ({
  isOpen,
  onClose,
  currentFootwear,
  onSelectReplace,
}) => {
  const handleSelect = (index: number) => {
    onSelectReplace(index);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Replace Which Item?">
      <div className="space-y-4">
        <p className="text-sm text-[var(--secondary)]">
          You already have {currentFootwear.length} footwear items selected. Choose which one to replace:
        </p>

        <div className="grid grid-cols-2 gap-4">
          {currentFootwear.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleSelect(index)}
              className="group border-2 border-[var(--border)] rounded-lg p-4 hover:border-[var(--accent)] hover:shadow-md transition-all"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-32 object-contain mb-3"
                style={{ maxHeight: '8rem' }}
              />
              <p className="text-sm font-medium text-center mb-1 group-hover:text-[var(--accent)]">
                {item.name}
              </p>
              <p className="text-xs text-[var(--secondary)] text-center">
                Position {index + 1}
              </p>
            </button>
          ))}
        </div>

        <Button variant="ghost" onClick={onClose} className="w-full">
          Cancel
        </Button>
      </div>
    </Modal>
  );
};
