import { Trash2 } from 'lucide-react';
import type { KeyboardEvent, MouseEvent } from 'react';
import type { Outfit } from '../types';
import { getItemImageUrl } from '../api';

interface OutfitCardProps {
  outfit: Outfit;
  onDelete: (outfitId: string) => void;
  onSelect: (outfit: Outfit) => void;
}

export function OutfitCard({ outfit, onDelete, onSelect }: OutfitCardProps) {
  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this outfit?')) {
      onDelete(outfit.id);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(outfit);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(outfit)}
      onKeyDown={handleKeyDown}
      className="group relative flex w-full flex-col border border-[var(--border)] bg-[var(--bg-elevated)] p-4 text-left transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--bg)] focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
    >
      <div className="absolute left-0 top-0 border-r border-b border-[var(--border)] bg-[var(--bg)] px-3 py-2">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--text-muted)]">
          Saved look
        </p>
      </div>

      <button
        type="button"
        onClick={handleDelete}
        className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-primary)] opacity-0 transition-all group-hover:opacity-100 hover:border-[var(--border-strong)] hover:bg-[var(--surface-inverse)] hover:text-[var(--text-inverse)] focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
        aria-label={`Delete ${outfit.name || 'untitled outfit'}`}
      >
        <Trash2 className="h-4 w-4" />
      </button>

      <div className="mt-8 flex aspect-square items-center justify-center border border-[var(--border)] bg-[color:rgba(244,244,239,0.72)] p-5">
        {outfit.thumbnail_path ? (
          <img
            src={getItemImageUrl(outfit.thumbnail_path) || ''}
            alt={outfit.name || 'Outfit'}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <span className="text-[11px] uppercase tracking-[0.24em] text-[var(--text-muted)]">
            No preview
          </span>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <h3 className="truncate text-base font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)]">
          {outfit.name || 'Untitled outfit'}
        </h3>
        <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
          <span>{outfit.item_ids.length} items</span>
          <span>{new Date(outfit.updated_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
