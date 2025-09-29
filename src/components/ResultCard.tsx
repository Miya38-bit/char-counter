export interface ResultCardProps {
  icon: string;
  title: string;
  resultValue: number | string;
  subtitle: string;
  color: 'blue' | 'green' | 'yellow';
}

export default function ResultCard({
  icon,
  title,
  resultValue,
  subtitle,
}: ResultCardProps) {
  return (
    <div className="rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] p-6 shadow-[var(--shadow)] duration-300 hover:translate-y-[-2px]">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-[20px] w-[20px] items-center justify-center text-[var(--accent-blue)]">
          {icon}
        </div>
        <span className="text-sm font-medium text-[var(--text-secondary)]">
          {title}
        </span>
      </div>
      <div
        className="mb-1 text-[2rem] font-bold text-[var(--text-primary)]"
        id="charCount"
      >
        {resultValue}
      </div>
      <div className="text-xs text-[var(--text-secondary)]">{subtitle}</div>
    </div>
  );
}
