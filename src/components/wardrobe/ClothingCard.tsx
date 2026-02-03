import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { MoreVertical, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WardrobeItem } from '../../data/mockData';

interface ClothingCardProps {
  item: WardrobeItem;
  onQuickAdd?: (item: WardrobeItem) => void;
}

export const ClothingCard: React.FC<ClothingCardProps> = ({ item, onQuickAdd }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <Card
        hover
        className="overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-square relative overflow-hidden bg-gray-100">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
          <AnimatePresence>
            {isHovered && onQuickAdd && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/40 flex items-center justify-center"
              >
                <button
                  onClick={() => onQuickAdd(item)}
                  className="bg-white text-[var(--primary)] px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <Plus size={16} />
                  Quick Add to Outfit
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="p-3">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="font-medium text-sm truncate flex-1">{item.name}</p>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <MoreVertical size={16} className="text-[var(--secondary)]" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block px-2 py-0.5 bg-[var(--accent)]/10 text-[var(--accent)] text-xs rounded">
              {item.category}
            </span>
            <span className="text-xs text-[var(--secondary)]">Used {item.usageCount}x</span>
          </div>
        </div>
      </Card>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute right-3 top-[calc(100%-8rem)] z-20 bg-white rounded-lg shadow-lg border border-[var(--border)] py-2 min-w-[150px]"
          >
            <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors">
              Edit Details
            </button>
            <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors">
              Add to Outfit
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-[var(--error)] hover:bg-gray-50 transition-colors">
              Delete
            </button>
          </motion.div>
        </>
      )}
    </div>
  );
};
