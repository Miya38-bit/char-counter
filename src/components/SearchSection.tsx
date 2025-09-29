import { useLanguage } from "../context/LanguageContext";

interface SearchSectionProps {
  term: string;
  termResult: number;
  isOverlapEnabled: boolean;
  onChangeSearchTerm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeIsOverlapEnabled: () => void;
}

export default function SearchSection({
  term,
  termResult,
  isOverlapEnabled,
  onChangeSearchTerm,
  onChangeIsOverlapEnabled,
}: SearchSectionProps) {
  const {t} = useLanguage();
  return (
    <section className="my-6 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] p-4 shadow-[var(--shadow)] transition-colors duration-300">
      <div className="mb-2 flex flex-col items-stretch gap-4 md:flex-row md:items-center">
        <label
          htmlFor="searchInput"
          className="text-base font-normal text-[var(--text-secondary)]"
        >
          {t.search.label}
        </label>
        <input
          type="text"
          id="searchInput"
          className="flex-1 rounded-sm border border-[var(--border-color)] bg-[var(--bg-color)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-blue)] focus:shadow-[0_0_0_3px_rgb(59,130,246,0.1)] focus:outline-none transition-colors duration-300"
          placeholder={t.search.placeholder}
          onChange={onChangeSearchTerm}
          value={term}
        />
      </div>
      <div className="text-sm text-[var(--text-secondary)]" id="searchResult">
        {t.search.resultText.replace('{termResult}', termResult.toString())}
      </div>
      <div className="mt-2 flex items-center gap-3">
        <span className="text-sm font-medium text-[var(--text-secondary)]">
          {t.search.overlapToggleLabel}
        </span>
        <div className="toggle-switch">
          <input
            type="checkbox"
            id="overlapToggle"
            className="hidden"
            aria-label={t.search.overlapAriaLabel}
            checked={isOverlapEnabled}
            onChange={onChangeIsOverlapEnabled}
          />
          <label
            htmlFor="overlapToggle"
            className={`relative block h-5 w-9 cursor-pointer rounded-[10px] transition-colors duration-300 ${
              isOverlapEnabled
                ? 'bg-[var(--accent-blue)]'
                : 'bg-[var(--border-color)]'
            }`}
          >
            <span
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all duration-300 ease-in-out ${
                isOverlapEnabled ? 'left-[18px]' : 'left-0.5'
              }`}
            ></span>
          </label>
        </div>
        <div className="relative inline-block">
          <button
            className="peer flex h-5 w-5 items-center justify-center rounded-full border border-[var(--border-color)] text-xs text-[var(--text-secondary)] transition-colors duration-300 hover:bg-[var(--border-color)] hover:text-[var(--text-primary)]"
            aria-label={t.search.helpTooltip}
          >
            ?
          </button>

          <div className="invisible absolute bottom-full left-1/2 z-10 mb-2 w-58 -translate-x-1/2 transform rounded-lg bg-gray-900 px-3 py-2 text-sm whitespace-pre-line text-white shadow-lg peer-hover:visible">
            {t.search.helpContent}
          </div>
        </div>
      </div>
    </section>
  );
}
