import { useEffect, useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ResultsSection from './components/ResultsSection';
import SearchSection from './components/SearchSection';
import TextInputSection from './components/TextInputSection';
import { computeStats, formatReadingTime } from './utils/computeStas';
import { useTextHistory } from './hooks/useTextHistory';
import { useButtonStatus } from './hooks/useButtonStatus';
import { useSearchReplace } from './hooks/useSearchReplace';

export interface TextResults {
  charCount: number;
  byteCount: number;
  readingTime: number;
  lbCount: number;
  paragraphCount: number;
  wordCount: number;
}

export interface TermResults {
  term: string;
  termCount: number;
}

export default function CharCounter() {
  const { text, setText, undo, redo, canUndo, canRedo } =
    useTextHistory<string>('');
  const search = useSearchReplace(text);
  const [textResults, setTextResults] = useState<TextResults>({
    charCount: 0,
    byteCount: 0,
    readingTime: 0,
    lbCount: 0,
    paragraphCount: 0,
    wordCount: 0,
  });
  const copyButton = useButtonStatus();
  const replaceButton = useButtonStatus();

  useEffect(() => {
    const stats = computeStats(text);
    setTextResults(() => ({
      ...stats,
    }));
  }, [text]);

  // 入力されたテキストを保持
  const handleAddText = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setText(() => e.target.value);
  };

  // テキストエリアをクリア
  const handleClear = (): void => {
    setText('');
    setTextResults({
      charCount: 0,
      readingTime: 0,
      byteCount: 0,
      lbCount: 0,
      paragraphCount: 0,
      wordCount: 0,
    });
  };

  const handleReplaceText = (): void => {
    replaceButton.executeWithStatus(() => {
      setText(search.executeReplace());
    });
  };

  const handleCopyText = async () => {
    copyButton.executeWithStatus(async () => {
      await navigator.clipboard.writeText(text);
    });
  };

  return (
    <div className="min-h-screen bg-[var(--bg-color)] font-sans text-[var(--text-primary)] transition-colors duration-300 ease-in-out">
      <Header />
      <main className="mx-auto my-0 max-w-7xl p-4 md:p-6">
        <HeroSection />
        <TextInputSection
          text={text}
          onChangeText={handleAddText}
          onClearText={handleClear}
          onUndo={undo}
          onRedo={redo}
          onTextCopy={handleCopyText}
          copyStatus={copyButton.status}
          canUndo={canUndo}
          canRedo={canRedo}
        />
        <SearchSection
          searchTerm={search.searchTerm}
          replaceTerm={search.replaceTerm}
          searchResult={search.searchResult}
          replaceResult={search.replaceResult}
          isOverlapEnabled={search.isOverlapEnabled}
          replaceStatus={replaceButton.status}
          onChangeSearchTerm={e => search.setsearchTerm(e.target.value)}
          onChangeIsOverlapEnabled={search.handleIsOverlapEnabled}
          onChangeReplaceTerm={e => search.setReplaceTerm(e.target.value)}
          onClickReaplceTerm={handleReplaceText}
        />
        <ResultsSection
          textResults={textResults}
          formatReadingTime={formatReadingTime}
        />
      </main>
    </div>
  );
}
