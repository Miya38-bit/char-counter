import { Languages, Moon, Sun} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { toggleLanguage, t } = useLanguage();

  return (
    <header className="flex items-center justify-between border-b border-[var(--border-color)] bg-[var(--header-color)] p-4 shadow-[var(--shadow)] transition-colors duration-300 md:px-8 md:py-4 sticky top-0">
      <div className="flex items-center gap-2 text-xl font-semibold text-[var(--text-primary)]">
        <img
          src="/favicon-32x32.png"
          alt="CharCounter Icon"
          className="h-8 w-8"
        />
        <span>{t.header.appTitle}</span>
      </div>
      <div className="flex gap-2">
        <button
          className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center border-none bg-transparent text-[var(--text-secondary)] duration-300 hover:bg-[var(--border-color)] hover:text-[var(--text-primary)]"
          id="languageToggle"
          title={t.header.languageTooltip}
          onClick={toggleLanguage}
        >
          <Languages size={20} color="#94a3b8" />
        </button>
        <button
          className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center border-none bg-transparent text-[var(--text-secondary)] duration-300 hover:bg-[var(--border-color)] hover:text-[var(--text-primary)]"
          id="themeToggle"
          title={t.header.themeTooltip}
          onClick={toggleTheme}
        >
          {isDarkMode ? (
            <Sun size={20} color="#94a3b8" />
          ) : (
            <Moon size={20} color="#94a3b8" />
          )}
        </button>
      </div>
    </header>
  );
}
