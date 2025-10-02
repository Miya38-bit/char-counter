import type { TextResults } from '../CharCounter';
import ResultCard from './ResultCard';
import ResultGrid from './ResultGrid';
import { useLanguage } from '../context/LanguageContext';
import { CornerDownLeft, Database, FileType, TextAlignJustify, Timer, WholeWord } from 'lucide-react';

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
  const { t } = useLanguage();

  return (
    <section className="mt-4">
      <ResultGrid>
        <ResultCard
          icon={<FileType size={18}/>}
          title={t.results.charCount.title}
          resultValue={textResults.charCount}
          subtitle={t.results.charCount.subtitle}
          color="blue"
        />
        <ResultCard
          icon={<Database size={18}/>}
          title={t.results.byteCount.title}
          resultValue={textResults.byteCount}
          subtitle={t.results.byteCount.subtitle}
          color="green"
        />
        <ResultCard
          icon={<Timer size={18}/>}
          title={t.results.readingTime.title}
          resultValue={
            textResults.readingTime >= 60
              ? formatReadingTime(textResults.readingTime, t.time)
              : `${textResults.readingTime}${t.time.seconds}`
          }
          subtitle={t.results.readingTime.subtitle}
          color="yellow"
        />
        <ResultCard
          icon={<CornerDownLeft size={18}/>}
          title={t.results.lineBreakCount.title}
          resultValue={textResults.lbCount}
          subtitle={t.results.lineBreakCount.subtitle}
          color="blue"
        />
        <ResultCard
          icon={<TextAlignJustify size={18}/>}
          title={t.results.paragraphCount.title}
          resultValue={textResults.paragraphCount}
          subtitle={t.results.paragraphCount.subtitle}
          color="green"
        />
        <ResultCard
          icon={<WholeWord size={18}/>}
          title={t.results.wordCount.title}
          resultValue={textResults.wordCount}
          subtitle={t.results.wordCount.subtitle}
          color="yellow"
        />
      </ResultGrid>
    </section>
  );
}
