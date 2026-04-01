import { type KeyboardEvent, useEffect, useState } from 'react';
import { useWardrobeStore } from '../store';
import { CATEGORY_LABELS, type Category, type WardrobeItem, type Season } from '../types';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { PageIntro } from '@/shared/ui/PageIntro';
import { SurfaceMessage } from '@/shared/ui/SurfaceMessage';
import { WardrobeGrid } from '../components/WardrobeGrid';
import { CategoryFilter } from '../components/CategoryFilter';
import { SeasonFilter } from '../components/SeasonFilter';
import { ColorFilter } from '../components/ColorFilter';
import { UploadModal } from '../components/UploadModal';
import { EditItemModal } from '../components/EditItemModal';

function WardrobeMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[var(--border)] bg-[var(--bg-elevated)] p-5">
      <p className="eyebrow text-[var(--text-muted)]">{label}</p>
      <p className="mt-4 text-4xl font-semibold uppercase leading-none tracking-[0.08em] text-[var(--text-primary)]">
        {value}
      </p>
    </div>
  );
}

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
    const normalizedQuery = searchQuery.trim();
    setFilters({ ...filters, search: normalizedQuery || undefined });
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
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
  const activeFilterCount = [
    filters.search ? 1 : 0,
    filters.colors?.length ? 1 : 0,
    filters.seasons?.length ? 1 : 0,
    filters.category ? 1 : 0,
  ].reduce((sum, count) => sum + count, 0);

  return (
    <div className="page-enter min-h-screen bg-[var(--bg)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <PageIntro
            className="flex-1"
            description="Refine your wardrobe with clean filters, sharp metadata, and a stricter monochrome wardrobe presentation."
            eyebrow="Wardrobe"
            title="My Wardrobe"
          />
          <Button
            className="self-start xl:mb-6"
            onClick={() => setIsUploadModalOpen(true)}
            size="lg"
          >
            Add Item
          </Button>
        </div>

        {error && (
          <div
            className="flex flex-col gap-3 border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-4 text-sm text-[var(--text-primary)] sm:flex-row sm:items-center sm:justify-between"
            role="alert"
          >
            <p>{error}</p>
            <Button
              className="self-start sm:self-auto"
              onClick={clearError}
              size="sm"
              variant="secondary"
            >
              Dismiss
            </Button>
          </div>
        )}

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,0.8fr)]">
          <Card className="border-[var(--border-strong)]" padding="sm">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <Input
                className="border-[var(--border-strong)] bg-[var(--bg)]"
                id="wardrobe-search"
                label="Search wardrobe"
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Name, label, or detail"
                value={searchQuery}
              />
              <Button className="w-full lg:w-auto" onClick={handleSearch} size="md">
                Search
              </Button>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-5">
              <Button
                aria-expanded={showColorFilter}
                onClick={() => setShowColorFilter(!showColorFilter)}
                size="sm"
                variant={showColorFilter ? 'primary' : 'secondary'}
              >
                Colors
              </Button>
              <Button
                aria-expanded={showSeasonFilter}
                onClick={() => setShowSeasonFilter(!showSeasonFilter)}
                size="sm"
                variant={showSeasonFilter ? 'primary' : 'secondary'}
              >
                Seasons
              </Button>
              {hasActiveFilters && (
                <Button onClick={handleClearFilters} size="sm" variant="ghost">
                  Clear all
                </Button>
              )}
              <p className="ml-auto text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {activeFilterCount === 0
                  ? 'No active filters'
                  : `${activeFilterCount} filter${activeFilterCount === 1 ? '' : 's'} active`}
              </p>
            </div>

            {(showColorFilter || showSeasonFilter) && (
              <div className="mt-5 grid gap-4 border-t border-[var(--border)] pt-5 lg:grid-cols-2">
                {showColorFilter && (
                  <div className="space-y-3 border border-[var(--border)] bg-[var(--bg)] p-4">
                    <p className="eyebrow text-[var(--text-muted)]">Color edit</p>
                    <ColorFilter
                      onColorChange={handleColorChange}
                      selectedColors={filters.colors || []}
                    />
                  </div>
                )}
                {showSeasonFilter && (
                  <div className="space-y-3 border border-[var(--border)] bg-[var(--bg)] p-4">
                    <p className="eyebrow text-[var(--text-muted)]">Season edit</p>
                    <SeasonFilter
                      onSeasonChange={handleSeasonChange}
                      selectedSeasons={filters.seasons || []}
                    />
                  </div>
                )}
              </div>
            )}
          </Card>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <WardrobeMetric label="Visible items" value={String(items.length).padStart(2, '0')} />
            <WardrobeMetric
              label="Current focus"
              value={filters.category ? CATEGORY_LABELS[filters.category] : 'All'}
            />
          </div>
        </div>

        <section className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow text-[var(--text-muted)]">Category index</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                Move between wardrobe groups without leaving the wardrobe.
              </p>
            </div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
              {filters.search ? `Search: ${filters.search}` : 'Showing full collection'}
            </p>
          </div>

          <CategoryFilter
            selectedCategory={filters.category}
            onCategoryChange={handleCategoryChange}
          />
        </section>

        {isLoading ? (
          <SurfaceMessage
            description="Pulling your wardrobe records into the wardrobe."
            kicker="Loading"
            title="Preparing inventory"
          />
        ) : items.length === 0 ? (
          <SurfaceMessage
            description={
              hasActiveFilters
                ? 'No items match the current filter set. Clear a filter or widen the search.'
                : filters.category
                  ? `No ${CATEGORY_LABELS[filters.category].toLowerCase()} are stored in this category yet.`
                  : 'Your wardrobe is empty. Start the collection with a first upload.'
            }
            kicker={hasActiveFilters ? 'No match' : 'Empty wardrobe'}
            title={hasActiveFilters ? 'Adjust the edit' : 'Add your first item'}
          />
        ) : (
          <WardrobeGrid items={items} onItemClick={setEditingItem} />
        )}
      </div>

      <UploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
      <EditItemModal
        isOpen={!!editingItem}
        item={editingItem}
        onClose={() => setEditingItem(null)}
      />
    </div>
  );
}
