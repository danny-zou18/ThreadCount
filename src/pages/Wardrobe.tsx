import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Plus, Search, Filter, Shirt } from 'lucide-react';
import { ClothingCard } from '../components/wardrobe/ClothingCard';
import { AddItemModal } from '../components/wardrobe/AddItemModal';
import { mockWardrobeItems, WardrobeItem } from '../data/mockData';
import { useToast } from '../components/ui/Toast';

export const Wardrobe: React.FC = () => {
  const [items, setItems] = useState<WardrobeItem[]>(mockWardrobeItems);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { showToast } = useToast();

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'tops', label: 'Tops' },
    { id: 'bottoms', label: 'Bottoms' },
    { id: 'dresses', label: 'Dresses' },
    { id: 'outerwear', label: 'Outerwear' },
    { id: 'shoes', label: 'Shoes' },
    { id: 'accessories', label: 'Accessories' },
  ];

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleAddItem = (newItem: WardrobeItem) => {
    setItems([newItem, ...items]);
    showToast('Item added to wardrobe!', 'success');
  };

  const handleQuickAdd = (item: WardrobeItem) => {
    showToast(`${item.name} added to outfit builder!`, 'success');
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1>My Wardrobe</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus size={18} />
          Add Item
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl border border-[var(--border)] p-4 mb-6">
        <div className="grid md:grid-cols-4 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Color Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Color</label>
            <div className="flex items-center gap-1 border border-[var(--border)] rounded-lg px-3 py-2">
              {['#000000', '#FFFFFF', '#6B7280', '#EF4444', '#3B82F6', '#C9A87C'].map((color) => (
                <button
                  key={color}
                  className="w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Season Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Season</label>
            <div className="flex items-center gap-1">
              {['Spring', 'Summer', 'Fall', 'Winter'].map((season) => (
                <button
                  key={season}
                  className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-[var(--accent)]/10 transition-colors"
                >
                  {season}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div>
            <label className="block text-sm font-medium mb-2">Search</label>
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
          </div>
        </div>
      </div>

      {/* Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <ClothingCard key={item.id} item={item} onQuickAdd={handleQuickAdd} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-[var(--accent)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shirt size={48} className="text-[var(--accent)]" />
          </div>
          <h2 className="mb-2">Your wardrobe is empty</h2>
          <p className="text-[var(--secondary)] mb-6">
            {searchQuery ? 'No items match your search' : 'Start by adding your first clothing item'}
          </p>
          {!searchQuery && (
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus size={18} />
              Add Your First Item
            </Button>
          )}
        </div>
      )}

      {/* Add Item Modal */}
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddItem}
      />
    </div>
  );
};
