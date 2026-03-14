interface BuilderMetricProps {
  label: string;
  value: string;
}

export function BuilderMetric({ label, value }: BuilderMetricProps) {
  return (
    <div className="min-w-0 flex-1 border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-4">
      <p className="eyebrow text-[var(--text-muted)]">{label}</p>
      <p className="mt-3 text-[clamp(1.5rem,1.7vw,2.5rem)] font-semibold uppercase leading-none tracking-[0.08em] text-[var(--text-primary)]">
        {value}
      </p>
    </div>
  );
}
