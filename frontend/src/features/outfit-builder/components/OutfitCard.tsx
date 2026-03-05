import type { Outfit } from '../types';
import { supabase } from '@/shared/api/supabase';

interface OutfitCardProps {
  outfit: Outfit;
  onSelect: (outfit: Outfit) => void;
  onDelete: (outfitId: string) => void;
}

function getItemImageUrl(path: string | null): string | undefined {
  if (!path) return undefined;
  const { data } = supabase.storage.from('wardrobe').getPublicUrl(path);
  return data.publicUrl;
}

export function OutfitCard({ outfit, onSelect, onDelete }: OutfitCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this outfit?')) {
      onDelete(outfit.id);
    }
  };

  return (
    <div
      onClick={() => onSelect(outfit)}
      className="group relative flex flex-col p-4 rounded-lg border border-[var(--border)] hover:border-[var(--color-primary)] hover:shadow-lg transition-all cursor-pointer bg-[var(--bg-elevated)]"
    >
      <div className="aspect-square mb-3 flex items-center justify-center bg-[var(--bg-secondary)] rounded-md overflow-hidden">
        {outfit.thumbnail_path ? (
          <img
            src={getItemImageUrl(outfit.thumbnail_path)}
            alt={outfit.name || 'Outfit'}
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <div className="text-4xl">👔</div>
        )}
      </div>

      <h3 className="font-medium text-[var(--text-primary)] truncate">
        {outfit.name || 'Untitled Outfit'}
      </h3>

      <p className="text-xs text-[var(--text-tertiary)] mt-1">{outfit.item_ids.length} items</p>

      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 p-1.5 rounded-full bg-[var(--color-danger)] text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[var(--color-danger)]/80"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
