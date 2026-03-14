import { type ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface CanvasActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  compact?: boolean;
}

export function CanvasActionButton({
  className,
  compact = false,
  type = 'button',
  ...props
}: CanvasActionButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        'inline-flex items-center justify-center border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--text-primary)] transition-colors',
        'hover:bg-[var(--surface-inverse)] hover:text-[var(--text-inverse)]',
        'focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]',
        'disabled:cursor-not-allowed disabled:opacity-40',
        compact ? 'h-8 w-8' : 'h-10 w-10',
        className,
      )}
      {...props}
    />
  );
}
