import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Search, X } from 'lucide-react';
import { WardrobeItem } from '../../data/mockData';

interface WardrobePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: WardrobeItem[];
  category: string;
  onSelect: (item: WardrobeItem) => void;
}

export const WardrobePickerModal: React.FC<WardrobePickerModalProps> = ({
  isOpen,
  onClose,
  items,
  category,
  onSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (item: WardrobeItem) => {
    onSelect(item);
    setSearchQuery('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Select ${category}`}>
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--secondary)]" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items..."
            className="w-full pl-9 pr-3 py-2 border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-3 gap-3 max-h-96 overflow-y-auto">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item)}
              className="group border border-[var(--border)] rounded-lg p-3 hover:border-[var(--accent)] hover:shadow-md transition-all"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-32 object-contain mb-2"
              />
              <p className="text-xs text-center line-clamp-2 group-hover:text-[var(--accent)]">
                {item.name}
              </p>
            </button>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-8 text-[var(--secondary)]">
            <p>No items found</p>
          </div>
        )}
      </div>
    </Modal>
  );
};
