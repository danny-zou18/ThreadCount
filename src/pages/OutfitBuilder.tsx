import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ChevronLeft, ChevronRight, Sparkles, Save, Shuffle, Shirt, X, Search } from 'lucide-react';
import { mockWardrobeItems, WardrobeItem } from '../data/mockData';
import { useToast } from '../components/ui/Toast';
import { motion, AnimatePresence } from 'motion/react';
import { ReplaceTopModal } from '../components/outfit/ReplaceTopModal';
import { ReplaceFootwearModal } from '../components/outfit/ReplaceFootwearModal';

interface OutfitState {
  hat: WardrobeItem | null;
  tops: WardrobeItem[]; // Can include tops, outerwear, scarfs, and bags (max 2)
  bottoms: WardrobeItem | null;
  footwear: WardrobeItem[]; // Can have shoes + socks (max 2)
}

interface SlotIndices {
  tops: number;
  bottoms: number;
  shoes: number;
  accessories: number;
}

export const OutfitBuilder: React.FC = () => {
  const [outfit, setOutfit] = useState<OutfitState>({
    hat: null,
    tops: [],
    bottoms: null,
    footwear: [],
  });
  const [currentIndices, setCurrentIndices] = useState<SlotIndices>({
    tops: 0,
    bottoms: 0,
    shoes: 0,
    accessories: 0,
  });
  const [outfitName, setOutfitName] = useState('');
  const [replaceTopModal, setReplaceTopModal] = useState<{ isOpen: boolean; newItem: WardrobeItem | null }>({
    isOpen: false,
    newItem: null,
  });
  const [replaceFootwearModal, setReplaceFootwearModal] = useState<{ isOpen: boolean; newItem: WardrobeItem | null }>({
    isOpen: false,
    newItem: null,
  });
  const [selectedWardrobeCategory, setSelectedWardrobeCategory] = useState<'tops' | 'bottoms' | 'shoes' | 'accessories'>('tops');
  const [searchQuery, setSearchQuery] = useState('');
  const { showToast } = useToast();

  // Group items by category
  const itemsByCategory = {
    tops: mockWardrobeItems.filter(item => item.category === 'tops' || item.category === 'outerwear'),
    bottoms: mockWardrobeItems.filter(item => item.category === 'bottoms'),
    shoes: mockWardrobeItems.filter(item => item.category === 'shoes'),
    accessories: mockWardrobeItems.filter(item => item.category === 'accessories'),
  };

  // Get current item for cycling (for arrows)
  const getCurrentItem = (category: 'tops' | 'bottoms' | 'shoes' | 'accessories'): WardrobeItem | null => {
    const items = itemsByCategory[category];
    if (items.length === 0) return null;
    return items[currentIndices[category]] || null;
  };

  // Navigate to previous/next item in a category (for arrows)
  const navigateItem = (category: 'tops' | 'bottoms' | 'shoes' | 'accessories', direction: 'prev' | 'next') => {
    const items = itemsByCategory[category];
    if (items.length === 0) return;

    const currentIndex = currentIndices[category];
    let newIndex: number;

    if (direction === 'next') {
      newIndex = (currentIndex + 1) % items.length;
    } else {
      newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    }

    setCurrentIndices({ ...currentIndices, [category]: newIndex });

    // Auto-apply the item to the outfit
    const newItem = items[newIndex];
    if (category === 'tops') {
      if (outfit.tops.length === 0) {
        setOutfit({ ...outfit, tops: [newItem] });
      } else {
        // Replace first top
        setOutfit({ ...outfit, tops: [newItem, ...outfit.tops.slice(1)] });
      }
    } else if (category === 'shoes') {
      if (outfit.footwear.length === 0) {
        setOutfit({ ...outfit, footwear: [newItem] });
      } else {
        // Replace first footwear item
        setOutfit({ ...outfit, footwear: [newItem, ...outfit.footwear.slice(1)] });
      }
    } else if (category === 'bottoms') {
      setOutfit({ ...outfit, bottoms: newItem });
    }
  };

  // Helper function to determine accessory type
  const getAccessoryType = (item: WardrobeItem): 'hat' | 'bag' | 'scarf' | 'sock' | null => {
    if (item.tags.includes('hat')) return 'hat';
    if (item.tags.includes('bag')) return 'bag';
    if (item.tags.includes('scarf')) return 'scarf';
    if (item.tags.includes('socks')) return 'sock';
    return null;
  };

  // Handle item selection from wardrobe panel
  const handleItemSelect = (item: WardrobeItem) => {
    if (item.category === 'tops' || item.category === 'outerwear') {
      // If already have 2 tops, ask which to replace
      if (outfit.tops.length >= 2) {
        setReplaceTopModal({ isOpen: true, newItem: item });
        return;
      }
      // Otherwise add the top
      setOutfit({ ...outfit, tops: [...outfit.tops, item] });
      showToast(`${item.name} added to outfit!`, 'success');
    } else if (item.category === 'shoes') {
      if (outfit.footwear.length >= 2) {
        setReplaceFootwearModal({ isOpen: true, newItem: item });
        return;
      }
      setOutfit({ ...outfit, footwear: [...outfit.footwear, item] });
      showToast(`${item.name} added to outfit!`, 'success');
    } else if (item.category === 'accessories') {
      const accessoryType = getAccessoryType(item);
      
      if (accessoryType === 'hat') {
        setOutfit({ ...outfit, hat: item });
        showToast(`${item.name} added to outfit!`, 'success');
      } else if (accessoryType === 'bag' || accessoryType === 'scarf') {
        // Bags and scarfs go into the tops array, subject to 2-item limit
        if (outfit.tops.length >= 2) {
          setReplaceTopModal({ isOpen: true, newItem: item });
          return;
        }
        setOutfit({ ...outfit, tops: [...outfit.tops, item] });
        showToast(`${item.name} added to outfit!`, 'success');
      } else if (accessoryType === 'sock') {
        if (outfit.footwear.length >= 2) {
          setReplaceFootwearModal({ isOpen: true, newItem: item });
          return;
        }
        setOutfit({ ...outfit, footwear: [...outfit.footwear, item] });
        showToast(`${item.name} added to outfit!`, 'success');
      }
    } else if (item.category === 'bottoms') {
      setOutfit({ ...outfit, bottoms: item });
      showToast(`${item.name} added to outfit!`, 'success');
    }
  };

  // Replace a specific top
  const handleReplaceTop = (index: number) => {
    if (replaceTopModal.newItem) {
      const newTops = [...outfit.tops];
      newTops[index] = replaceTopModal.newItem;
      setOutfit({ ...outfit, tops: newTops });
      setReplaceTopModal({ isOpen: false, newItem: null });
      showToast(`Item replaced!`, 'success');
    }
  };

  // Replace a specific footwear item
  const handleReplaceFootwear = (index: number) => {
    if (replaceFootwearModal.newItem) {
      const newFootwear = [...outfit.footwear];
      newFootwear[index] = replaceFootwearModal.newItem;
      setOutfit({ ...outfit, footwear: newFootwear });
      setReplaceFootwearModal({ isOpen: false, newItem: null });
      showToast(`Item replaced!`, 'success');
    }
  };

  // Remove an item
  const removeItem = (slot: 'hat' | 'tops' | 'bottoms' | 'footwear', index?: number) => {
    if ((slot === 'tops' || slot === 'footwear') && index !== undefined) {
      if (slot === 'tops') {
        const newTops = outfit.tops.filter((_, i) => i !== index);
        setOutfit({ ...outfit, tops: newTops });
      } else {
        const newFootwear = outfit.footwear.filter((_, i) => i !== index);
        setOutfit({ ...outfit, footwear: newFootwear });
      }
    } else {
      setOutfit({ ...outfit, [slot]: null });
    }
  };

  // Shuffle all slots
  const shuffleAll = () => {
    const randomTop1 = itemsByCategory.tops[Math.floor(Math.random() * itemsByCategory.tops.length)];
    const randomBottom = itemsByCategory.bottoms[Math.floor(Math.random() * itemsByCategory.bottoms.length)];
    const randomShoes = itemsByCategory.shoes[Math.floor(Math.random() * itemsByCategory.shoes.length)];
    const hats = itemsByCategory.accessories.filter(item => item.tags.includes('hat'));
    const bags = itemsByCategory.accessories.filter(item => item.tags.includes('bag'));
    const scarfs = itemsByCategory.accessories.filter(item => item.tags.includes('scarf'));
    const socks = itemsByCategory.accessories.filter(item => item.tags.includes('socks'));
    
    const randomHat = hats.length > 0 ? hats[Math.floor(Math.random() * hats.length)] : null;
    const randomBag = bags.length > 0 ? bags[Math.floor(Math.random() * bags.length)] : null;
    const randomScarf = scarfs.length > 0 ? scarfs[Math.floor(Math.random() * scarfs.length)] : null;
    const randomSock = socks.length > 0 ? socks[Math.floor(Math.random() * socks.length)] : null;

    // Randomly decide what to add to tops section (can be top+scarf, top+bag, or just top)
    const upperBodyAccessories = [randomScarf, randomBag].filter(Boolean);
    const randomAccessory = upperBodyAccessories.length > 0 
      ? upperBodyAccessories[Math.floor(Math.random() * upperBodyAccessories.length)]
      : null;
    
    const shouldAddAccessory = Math.random() > 0.5 && randomAccessory;
    const topsArray = shouldAddAccessory ? [randomTop1, randomAccessory] : [randomTop1];

    setOutfit({
      hat: randomHat,
      tops: topsArray.filter(Boolean) as WardrobeItem[],
      bottoms: randomBottom || null,
      footwear: randomShoes && randomSock ? [randomShoes, randomSock] : randomShoes ? [randomShoes] : [],
    });
    showToast('Outfit shuffled!', 'success');
  };

  const handleSaveOutfit = () => {
    const hasAnyItem = outfit.hat || outfit.tops.length > 0 || outfit.bottoms || outfit.footwear.length > 0;
    
    if (!hasAnyItem) {
      showToast('Please add items to your outfit first', 'error');
      return;
    }
    showToast(`Outfit "${outfitName || 'Untitled'}" saved!`, 'success');
    setOutfitName('');
  };

  // Filter wardrobe items for the panel
  const filteredWardrobeItems = itemsByCategory[selectedWardrobeCategory].filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Single item slot component
  const SingleItemSlot: React.FC<{
    item: WardrobeItem | null;
    label: string;
    onRemove: () => void;
    size: { width: number; height: number };
  }> = ({ item, label, onRemove, size }) => {
    return (
      <div className="flex flex-col items-center gap-2">
        <AnimatePresence mode="wait">
          {item ? (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative group"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="object-contain drop-shadow-xl"
                style={{ width: `${size.width}px`, height: `${size.height}px` }}
              />
              <button
                onClick={onRemove}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                title="Remove item"
              >
                <X size={14} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center bg-gray-100 rounded-lg border-2 border-dashed border-gray-300"
              style={{ width: `${size.width}px`, height: `${size.height}px` }}
            >
              <Shirt size={32} className="text-gray-300 mb-1" />
              <p className="text-xs text-gray-400">{label}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Slot component for canvas with arrows
  const OutfitSlot: React.FC<{
    category: 'tops' | 'bottoms' | 'shoes';
    label: string;
    size: { width: number; height: number };
  }> = ({ category, label, size }) => {
    const items = itemsByCategory[category];
    const hasMultipleItems = items.length > 1;

    // For tops, show all tops side by side (includes scarfs and bags)
    if (category === 'tops' && outfit.tops.length > 0) {
      return (
        <div className="flex items-center gap-4">
          {/* Left Arrow */}
          <button
            onClick={() => navigateItem(category, 'prev')}
            disabled={!hasMultipleItems}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              hasMultipleItems
                ? 'bg-white border border-[var(--border)] hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] shadow-sm'
                : 'bg-gray-100 text-gray-300 cursor-not-allowed'
            }`}
            title="Previous item"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Tops Display */}
          <div className="flex items-center gap-6">
            {outfit.tops.map((top, index) => (
              <motion.div
                key={`${top.id}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative group"
              >
                <img
                  src={top.imageUrl}
                  alt={top.name}
                  className="object-contain drop-shadow-xl"
                  style={{ width: `${size.width}px`, height: `${size.height}px` }}
                />
                <button
                  onClick={() => removeItem('tops', index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                  title="Remove item"
                >
                  <X size={14} />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => navigateItem(category, 'next')}
            disabled={!hasMultipleItems}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              hasMultipleItems
                ? 'bg-white border border-[var(--border)] hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] shadow-sm'
                : 'bg-gray-100 text-gray-300 cursor-not-allowed'
            }`}
            title="Next item"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      );
    }

    // For shoes, show all footwear items side by side
    if (category === 'shoes' && outfit.footwear.length > 0) {
      return (
        <div className="flex items-center gap-4">
          {/* Left Arrow */}
          <button
            onClick={() => navigateItem(category, 'prev')}
            disabled={!hasMultipleItems}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              hasMultipleItems
                ? 'bg-white border border-[var(--border)] hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] shadow-sm'
                : 'bg-gray-100 text-gray-300 cursor-not-allowed'
            }`}
            title="Previous item"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Footwear Display */}
          <div className="flex items-center gap-6">
            {outfit.footwear.map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative group"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="object-contain drop-shadow-xl"
                  style={{ width: `${size.width}px`, height: `${size.height}px` }}
                />
                <button
                  onClick={() => removeItem('footwear', index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                  title="Remove item"
                >
                  <X size={14} />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => navigateItem(category, 'next')}
            disabled={!hasMultipleItems}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              hasMultipleItems
                ? 'bg-white border border-[var(--border)] hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] shadow-sm'
                : 'bg-gray-100 text-gray-300 cursor-not-allowed'
            }`}
            title="Next item"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      );
    }

    // For bottoms (single items with arrows)
    const displayItem = outfit.bottoms;

    return (
      <div className="flex items-center gap-4">
        {/* Left Arrow */}
        <button
          onClick={() => navigateItem(category, 'prev')}
          disabled={!hasMultipleItems}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            hasMultipleItems
              ? 'bg-white border border-[var(--border)] hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] shadow-sm'
              : 'bg-gray-100 text-gray-300 cursor-not-allowed'
          }`}
          title="Previous item"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Item Slot */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {displayItem ? (
              <motion.div
                key={displayItem.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="relative group"
              >
                <img
                  src={displayItem.imageUrl}
                  alt={displayItem.name}
                  className="object-contain drop-shadow-xl"
                  style={{ width: `${size.width}px`, height: `${size.height}px` }}
                />
                <button
                  onClick={() => removeItem(category)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                  title="Remove item"
                >
                  <X size={14} />
                </button>
                {items.length > 0 && (
                  <p className="text-xs text-[var(--secondary)] mt-2 text-center">
                    {currentIndices[category] + 1} of {items.length}
                  </p>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center bg-gray-100 rounded-lg border-2 border-dashed border-gray-300"
                style={{ width: `${size.width}px`, height: `${size.height}px` }}
              >
                <Shirt size={40} className="text-gray-300 mb-2" />
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-xs text-gray-400 mt-1">{items.length} items</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => navigateItem(category, 'next')}
          disabled={!hasMultipleItems}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            hasMultipleItems
              ? 'bg-white border border-[var(--border)] hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] shadow-sm'
              : 'bg-gray-100 text-gray-300 cursor-not-allowed'
          }`}
          title="Next item"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };

  return (
    <div>
      {/* Main Layout: Canvas (left) + Wardrobe Panel (right) */}
      <div className="grid grid-cols-12 gap-6">
        {/* Canvas - Left Side */}
        <div className="col-span-7">
          <Card className="p-8 relative">
            {/* Shuffle Button - Bottom Left */}
            <button
              onClick={shuffleAll}
              className="absolute bottom-6 left-6 z-10 w-12 h-12 rounded-full bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90 shadow-lg flex items-center justify-center transition-all hover:scale-105"
              title="Shuffle outfit"
            >
              <Shuffle size={20} />
            </button>

            <div className="bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg p-8 min-h-[700px] flex items-center justify-center">
              <div className="flex flex-col items-center gap-6 w-full">
                {/* Hat Slot */}
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs font-medium text-[var(--secondary)]">Hats & Glasses</p>
                  <SingleItemSlot
                    item={outfit.hat}
                    label="Hat"
                    onRemove={() => removeItem('hat')}
                    size={{ width: 120, height: 100 }}
                  />
                </div>

                {/* Tops Slot (includes scarfs and bags) */}
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs font-medium text-[var(--secondary)]">Tops / Outerwear / Scarfs / Bags</p>
                  {outfit.tops.length === 0 ? (
                    <div className="flex items-center gap-4">
                      <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-300 cursor-not-allowed flex items-center justify-center">
                        <ChevronLeft size={20} />
                      </button>
                      <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg border-2 border-dashed border-gray-300"
                        style={{ width: '200px', height: '200px' }}>
                        <Shirt size={40} className="text-gray-300 mb-2" />
                        <p className="text-xs text-gray-400">No items</p>
                      </div>
                      <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-300 cursor-not-allowed flex items-center justify-center">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  ) : (
                    <OutfitSlot category="tops" label="Upper Body" size={{ width: 200, height: 200 }} />
                  )}
                </div>

                {/* Bottoms Slot */}
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs font-medium text-[var(--secondary)]">Bottoms & Belts</p>
                  <OutfitSlot category="bottoms" label="Bottoms" size={{ width: 200, height: 160 }} />
                </div>

                {/* Shoes + Socks Slot */}
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs font-medium text-[var(--secondary)]">Shoes & Socks</p>
                  {outfit.footwear.length === 0 ? (
                    <div className="flex items-center gap-4">
                      <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-300 cursor-not-allowed flex items-center justify-center">
                        <ChevronLeft size={20} />
                      </button>
                      <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg border-2 border-dashed border-gray-300"
                        style={{ width: '140px', height: '110px' }}>
                        <Shirt size={40} className="text-gray-300 mb-2" />
                        <p className="text-xs text-gray-400">No footwear</p>
                      </div>
                      <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-300 cursor-not-allowed flex items-center justify-center">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  ) : (
                    <OutfitSlot category="shoes" label="Shoes & Socks" size={{ width: 140, height: 110 }} />
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Bottom Action Bar */}
          <div className="mt-4 bg-white rounded-xl border border-[var(--border)] p-4">
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={outfitName}
                onChange={(e) => setOutfitName(e.target.value)}
                placeholder="Outfit Name (optional)"
                className="flex-1 px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
              <Button onClick={handleSaveOutfit}>
                <Save size={18} />
                Save
              </Button>
              <Button variant="secondary">
                <Sparkles size={18} />
                Try On
              </Button>
            </div>
          </div>
        </div>

        {/* Wardrobe Panel - Right Side */}
        <div className="col-span-5">
          <Card className="p-6 h-full">
            <h3 className="mb-4">My Wardrobe</h3>

            {/* Category Tabs */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {(['tops', 'bottoms', 'shoes', 'accessories'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedWardrobeCategory(cat)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
                    selectedWardrobeCategory === cat
                      ? 'bg-[var(--accent)] text-white'
                      : 'bg-gray-100 text-[var(--secondary)] hover:bg-gray-200'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative mb-4">
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
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 340px)' }}>
              {filteredWardrobeItems.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {filteredWardrobeItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleItemSelect(item)}
                      className="group border border-[var(--border)] rounded-lg p-3 hover:border-[var(--accent)] hover:shadow-md transition-all text-left"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-28 object-contain mb-2"
                      />
                      <p className="text-xs line-clamp-2 group-hover:text-[var(--accent)]">
                        {item.name}
                      </p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-[var(--secondary)]">
                  <Shirt size={40} className="mx-auto mb-3 text-gray-300" />
                  <p className="text-sm">No items found</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Help Text */}
      <div className="mt-4 text-center">
        <p className="text-sm text-[var(--secondary)]">
          Flatlay layout: Hats → Upper body (max 2) → Bottoms → Footwear (max 2) • Use arrows to cycle • Click to add from wardrobe
        </p>
      </div>

      {/* Replace Top Modal */}
      <ReplaceTopModal
        isOpen={replaceTopModal.isOpen}
        onClose={() => setReplaceTopModal({ isOpen: false, newItem: null })}
        currentTops={outfit.tops}
        onSelectReplace={handleReplaceTop}
      />

      {/* Replace Footwear Modal */}
      <ReplaceFootwearModal
        isOpen={replaceFootwearModal.isOpen}
        onClose={() => setReplaceFootwearModal({ isOpen: false, newItem: null })}
        currentFootwear={outfit.footwear}
        onSelectReplace={handleReplaceFootwear}
      />
    </div>
  );
};
