import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Plus, Edit, Eye, Trash2, Calendar } from 'lucide-react';
import { mockOutfits, mockWardrobeItems, Outfit } from '../data/mockData';

interface SavedOutfitsProps {
  onNavigate: (page: string) => void;
}

export const SavedOutfits: React.FC<SavedOutfitsProps> = ({ onNavigate }) => {
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);

  const handleClose = () => setSelectedOutfit(null);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1>Saved Outfits</h1>
        <Button onClick={() => onNavigate('outfit-builder')}>
          <Plus size={18} />
          Create New
        </Button>
      </div>

      {/* Filter/Sort Bar */}
      <div className="bg-white rounded-xl border border-[var(--border)] p-4 mb-6">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">Sort by:</label>
          <select className="px-3 py-1 border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]">
            <option>Newest First</option>
            <option>Oldest First</option>
            <option>Most Items</option>
            <option>Name A-Z</option>
          </select>
          <div className="flex-1" />
          <label className="text-sm font-medium">Season:</label>
          <div className="flex gap-2">
            {['Spring', 'Summer', 'Fall', 'Winter'].map((season) => (
              <button
                key={season}
                className="px-3 py-1 text-xs bg-gray-100 rounded hover:bg-[var(--accent)]/10 transition-colors"
              >
                {season}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockOutfits.map((outfit) => (
          <Card
            key={outfit.id}
            hover
            className="overflow-hidden group cursor-pointer"
            onClick={() => setSelectedOutfit(outfit)}
          >
            <div className="relative aspect-[3/4]">
              <img
                src={outfit.previewUrl}
                alt={outfit.name}
                className="w-full h-full object-cover"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('outfit-builder');
                  }}
                  className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                  title="Edit"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('try-on');
                  }}
                  className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                  title="Try On"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} className="text-[var(--error)]" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="mb-1">{outfit.name}</h3>
              <div className="flex items-center justify-between text-sm text-[var(--secondary)]">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(outfit.createdAt).toLocaleDateString()}
                </span>
                <span>{outfit.itemIds.length} items</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Outfit Detail Modal */}
      {selectedOutfit && (
        <Modal
          isOpen={!!selectedOutfit}
          onClose={handleClose}
          title={selectedOutfit.name}
          size="lg"
        >
          <div className="p-6">
            {/* Large Preview */}
            <div className="mb-6">
              <img
                src={selectedOutfit.previewUrl}
                alt={selectedOutfit.name}
                className="w-full aspect-[3/4] object-cover rounded-lg"
              />
            </div>

            {/* Item List */}
            <div className="mb-6">
              <h3 className="mb-3">Items in this outfit</h3>
              <div className="space-y-2">
                {selectedOutfit.itemIds.map((itemId) => {
                  const item = mockWardrobeItems.find(i => i.id === itemId);
                  return item ? (
                    <div
                      key={itemId}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-[var(--secondary)]">{item.category}</p>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button onClick={() => onNavigate('outfit-builder')} className="flex-1">
                <Edit size={18} />
                Edit Outfit
              </Button>
              <Button onClick={() => onNavigate('try-on')} variant="secondary" className="flex-1">
                <Eye size={18} />
                Try This On
              </Button>
              <Button variant="danger">
                <Trash2 size={18} />
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
