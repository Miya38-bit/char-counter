import { Check, CircleAlert, RefreshCcw, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { ButtonStatus } from '../types/editText';
import { useEffect, useRef, useState } from 'react';

interface SearchSectionProps {
  searchTerm: string;
  replaceTerm: string;
  searchResult: number;
  replaceResult: number;
  isOverlapEnabled: boolean;
  replaceStatus: ButtonStatus;
  onChangeSearchTerm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeIsOverlapEnabled: () => void;
  onChangeReplaceTerm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickReaplceTerm: () => void;
}

export default function SearchSection({
  searchTerm,
  replaceTerm,
  searchResult,
  replaceResult,
  isOverlapEnabled,
  replaceStatus,
  onChangeSearchTerm,
  onChangeIsOverlapEnabled,
  onChangeReplaceTerm,
  onClickReaplceTerm,
}: SearchSectionProps) {
  const [isToolTipVisible, setIsToolTipVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isToolTipVisible) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        tooltipRef.current?.contains(target) ||
        buttonRef.current?.contains(target)
      )
        return;

      setIsToolTipVisible(false);
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isToolTipVisible]);

  const handleClickIsToolTipVisible = () => {
    setIsToolTipVisible(prev => !prev);
  };
  const { t } = useLanguage();
  return (
    <section className="mt-5 grid grid-cols-1 gap-5 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] px-6 py-4 shadow-[var(--shadow)] transition-colors duration-300 md:grid-cols-2 md:gap-10">
      <div>
        <div className="mb-2 flex flex-col items-stretch gap-2">
          <label
            htmlFor="searchInput"
            className="flex items-center gap-2 text-base font-normal text-[var(--text-secondary)]"
          >
            <Search size={20} color="#3b82f6" />
            {t.search.label}
          </label>
          <input
            type="text"
            id="searchInput"
            className="flex-1 rounded-sm border border-[var(--border-color)] bg-[var(--bg-color)] px-3 py-2 text-sm text-[var(--text-primary)] transition-colors duration-300 placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-blue)] focus:shadow-[0_0_0_3px_rgb(59,130,246,0.1)] focus:outline-none"
            placeholder={t.search.placeholder}
            onChange={onChangeSearchTerm}
            value={searchTerm}
          />
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
              onClick={handleClickIsToolTipVisible}
              ref={buttonRef}
            >
              ?
            </button>
            <div
              className={`${isToolTipVisible ? 'visible' : 'invisible peer-hover:visible'} absolute bottom-full left-1/2 z-10 mb-2 w-58 -translate-x-1/2 transform rounded-lg bg-gray-900 px-3 py-2 text-sm whitespace-pre-line text-white shadow-lg`}
              ref={tooltipRef}
            >
              {t.search.helpContent}
            </div>
          </div>
          <div
            className="text-sm text-[var(--text-secondary)]"
            id="searchResult"
          >
            {t.search.resultText.replace('{count}', searchResult.toString())}
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="mb-2 flex flex-col items-stretch gap-2">
            <label
              htmlFor="searchInput"
              className="flex items-center gap-2 text-base font-normal text-[var(--text-secondary)]"
            >
              <RefreshCcw size={20} color="#b77cf8" />
              {t.replace.label}
            </label>
            <form
              className="flex items-stretch"
              onSubmit={e => {
                e.preventDefault();
                onClickReaplceTerm();
              }}
            >
              <input
                type="text"
                id="replaceInput"
                className="flex-1 rounded-l-sm border border-[var(--border-color)] bg-[var(--bg-color)] px-3 py-2 text-sm text-[var(--text-primary)] transition-colors duration-300 placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-blue)] focus:shadow-[0_0_0_3px_rgb(59,130,246,0.1)] focus:outline-none"
                placeholder={t.replace.placeholder}
                onChange={onChangeReplaceTerm}
                value={replaceTerm}
              />
              <button
                className={`w-[70px] cursor-pointer items-center rounded-r-sm border px-4 py-1 text-sm text-[var(--text-primary)] transition duration-300 ${
                  replaceStatus === 'idle'
                    ? 'over:shadow-[0_0_0_3px_rgb(59,130,246,0.1)] border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[var(--accent-blue)] hover:outline-none'
                    : replaceStatus === 'success'
                      ? 'border-green-500 bg-green-400'
                      : 'border-red-500 bg-red-400'
                }`}
                type="submit"
                id="replaceBtn"
                aria-label={t.replace.buttonAriaLabel}
              >
                <span className="flex items-center justify-center gap-2">
                  {replaceStatus === 'idle' ? (
                    <span>{t.replace.button}</span>
                  ) : replaceStatus === 'success' ? (
                    <Check size={18} color="white" />
                  ) : (
                    <CircleAlert size={18} />
                  )}
                </span>
              </button>
            </form>
            <div
              className="text-sm text-[var(--text-secondary)]"
              id="replaceResult"
            >
              {t.replace.resultText.replace(
                '{count}',
                replaceResult.toString()
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
