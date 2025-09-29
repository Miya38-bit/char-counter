import { useState } from 'react';
import type { TextResults } from '../CharCounter';
import ResultCard from './ResultCard';
import ResultGrid from './ResultGrid';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  textResults: TextResults;
  formatReadingTime: (
    readingTime: number,
    timeLabels: { minutes: string; seconds: string; hours?: string }
  ) => string;
}

export default function ResultsSection({
  textResults,
  formatReadingTime,
}: Props) {
  const [showDetails, setShowDetails] = useState(false);
  const { t } = useLanguage();

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };
  return (
    <section className="my-8">
      <ResultGrid>
        <ResultCard
          icon="📄"
          title={t.results.charCount.title}
          resultValue={textResults.charCount}
          subtitle={t.results.charCount.subtitle}
          color="blue"
        />
        <ResultCard
          icon="💾"
          title={t.results.byteCount.title}
          resultValue={textResults.byteCount}
          subtitle={t.results.byteCount.subtitle}
          color="green"
        />
        <ResultCard
          icon="🕒"
          title={t.results.readingTime.title}
          resultValue={
            textResults.readingTime >= 60
              ? formatReadingTime(textResults.readingTime, t.time)
              : `${textResults.readingTime}${t.time.seconds}`
          }
          subtitle={t.results.readingTime.subtitle}
          color="yellow"
        />
      </ResultGrid>

      <div className="my-4 text-center">
        <button
          className="cursor-pointer rounded-sm border-none bg-none px-4 py-2 text-sm text-[var(--accent-blue)] transition-colors duration-300 hover:bg-[rgb(59_130_246/0.1)]"
          id="toggleDetailsBtn"
          onClick={handleShowDetails}
        >
          {showDetails
            ? t.results.toggleDetails.hide
            : t.results.toggleDetails.show}
        </button>
      </div>

      {showDetails ? (
        <div>
          {/* classNameはTSでhiddenにおきかえ */}
          <ResultGrid>
            <ResultCard
              icon="↵"
              title={t.results.lineBreakCount.title}
              resultValue={textResults.lbCount}
              subtitle={t.results.lineBreakCount.subtitle}
              color="blue"
            />
            <ResultCard
              icon="¶"
              title={t.results.paragraphCount.title}
              resultValue={textResults.paragraphCount}
              subtitle={t.results.paragraphCount.subtitle}
              color="green"
            />
            <ResultCard
              icon="#"
              title={t.results.wordCount.title}
              resultValue={textResults.wordCount}
              subtitle={t.results.wordCount.subtitle}
              color="yellow"
            />
          </ResultGrid>

          {/* <div className="mt-4 flex flex-wrap justify-center gap-3">
            <button
              className="flex cursor-pointer items-center gap-2 border border-[var(--border-color)] bg-[var(--card-bg)] px-4 py-2 text-sm text-[var(--text-primary)] transition duration-300 hover:bg-[var(--border-color)]"
              id="clipboardToggle"
            >
              {t.results.clipboardButton}
            </button>
            <button
              className="flex cursor-pointer items-center gap-2 border border-[var(--border-color)] bg-[var(--card-bg)] px-4 py-2 text-sm text-[var(--text-primary)] transition duration-300 hover:bg-[var(--border-color)]"
              id="shareBtn"
            >
              {t.results.shareButton}
            </button>
            <button
              className="flex cursor-pointer items-center gap-2 border border-[var(--border-color)] bg-[var(--card-bg)] px-4 py-2 text-sm text-[var(--text-primary)] transition duration-300 hover:bg-[var(--border-color)]"
              id="historyBtn"
            >
              {t.results.historyButton}
            </button>
          </div> */}
        </div>
      ) : null}
    </section>
  );
}
