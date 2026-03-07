import { useEffect, useState, type KeyboardEvent } from 'react';
import { useWardrobeStore } from '../store';
import { CATEGORY_LABELS, type Category, type WardrobeItem, type Season } from '../types';
import { Button } from '@/shared/ui/Button';
import { Navigation } from '@/shared/ui/Navigation';
import { WardrobeGrid } from '../components/WardrobeGrid';
import { CategoryFilter } from '../components/CategoryFilter';
import { SeasonFilter } from '../components/SeasonFilter';
import { ColorFilter } from '../components/ColorFilter';
import { UploadModal } from '../components/UploadModal';
import { EditItemModal } from '../components/EditItemModal';

export function WardrobePage() {
  const { items, isLoading, error, filters, fetchItems, setFilters, clearError } =
    useWardrobeStore();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<WardrobeItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showColorFilter, setShowColorFilter] = useState(false);
  const [showSeasonFilter, setShowSeasonFilter] = useState(false);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleCategoryChange = (category: Category | undefined) => {
    setFilters({ ...filters, category });
  };

  const handleSearch = () => {
    setFilters({ ...filters, search: searchQuery || undefined });
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSeasonChange = (seasons: Season[]) => {
    setFilters({ ...filters, seasons: seasons.length > 0 ? seasons : undefined });
  };

  const handleColorChange = (colors: string[]) => {
    setFilters({ ...filters, colors: colors.length > 0 ? colors : undefined });
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setFilters({});
    setShowColorFilter(false);
    setShowSeasonFilter(false);
  };

  const hasActiveFilters =
    filters.search || filters.colors?.length || filters.seasons?.length || filters.category;

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[var(--bg)] p-8 pt-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex items-end justify-between">
            <h1
              className="text-4xl text-[var(--text-primary)]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              My Wardrobe
            </h1>
            <Button onClick={() => setIsUploadModalOpen(true)}>+ Add Item</Button>
          </div>
          <div className="mb-8 border-t border-[var(--border-strong)]" />

          {error && (
            <div className="mb-4 rounded border border-[var(--error)] bg-[var(--error)] bg-opacity-10 p-3 text-sm text-[var(--error)]">
              {error}
              <button onClick={clearError} className="ml-2 underline">
                Dismiss
              </button>
            </div>
          )}

          <div className="mb-4 flex gap-3">
            <div className="flex flex-1 gap-2">
              <input
                type="text"
                placeholder="Search by name or tags..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 rounded border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none"
              />
              <Button onClick={handleSearch}>Search</Button>
            </div>
            <Button
              variant={showColorFilter ? 'primary' : 'ghost'}
              onClick={() => setShowColorFilter((value) => !value)}
            >
              Colors
            </Button>
            <Button
              variant={showSeasonFilter ? 'primary' : 'ghost'}
              onClick={() => setShowSeasonFilter((value) => !value)}
            >
              Seasons
            </Button>
            {hasActiveFilters && (
              <Button variant="ghost" onClick={handleClearFilters}>
                Clear All
              </Button>
            )}
          </div>

          {showColorFilter && (
            <div className="mb-4 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
              <p className="mb-2 text-xs uppercase tracking-wider text-[var(--text-tertiary)]">
                Filter by colors
              </p>
              <ColorFilter
                selectedColors={filters.colors || []}
                onColorChange={handleColorChange}
              />
            </div>
          )}

          {showSeasonFilter && (
            <div className="mb-4 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
              <p className="mb-2 text-xs uppercase tracking-wider text-[var(--text-tertiary)]">
                Filter by seasons
              </p>
              <SeasonFilter
                selectedSeasons={filters.seasons || []}
                onSeasonChange={handleSeasonChange}
              />
            </div>
          )}

          <CategoryFilter
            selectedCategory={filters.category}
            onCategoryChange={handleCategoryChange}
          />

          {isLoading ? (
            <div className="py-12 text-center">
              <p className="text-sm text-[var(--text-secondary)]">Loading your wardrobe...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="py-12 text-center">
              <p className="mb-4 text-sm text-[var(--text-secondary)]">
                {hasActiveFilters
                  ? 'No items match your filters'
                  : filters.category
                    ? `No ${CATEGORY_LABELS[filters.category].toLowerCase()} in your wardrobe yet.`
                    : 'Your wardrobe is empty. Start by adding some items!'}
              </p>
              <Button onClick={() => setIsUploadModalOpen(true)}>Add Your First Item</Button>
            </div>
          ) : (
            <WardrobeGrid items={items} onItemClick={setEditingItem} />
          )}
        </div>
      </div>

      <UploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
      <EditItemModal
        item={editingItem}
        isOpen={editingItem !== null}
        onClose={() => setEditingItem(null)}
      />
    </>
  );
}
