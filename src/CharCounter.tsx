import { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ResultsSection from './components/ResultsSection';
import SearchSection from './components/SearchSection';
import TextInputSection from './components/TextInputSection';
import {
  computeStats,
  countSearchTerm,
  formatReadingTime,
} from './utils/computeStas';

export const MAX_LIMIT_HISTORY = 50;

export interface TextResults {
  charCount: number;
  byteCount: number;
  readingTime: number;
  lbCount: number;
  paragraphCount: number;
  wordCount: number;
}

interface History {
  history: string[];
  currentIndex: number;
}

export interface TermResults {
  term: string;
  termCount: number;
}

export default function CharCounter() {
  const [text, setText] = useState<string>('');
  const [isOverlapEnabled, setIsOverlapEnabled] = useState<boolean>(false);
  const [textHistory, setTextHistory] = useState<History>({
    history: [],
    currentIndex: -1,
  });
  const timeoutRef = useRef<number | null>(null);
  const [textResults, setTextResults] = useState<TextResults>({
    charCount: 0,
    byteCount: 0,
    readingTime: 0,
    lbCount: 0,
    paragraphCount: 0,
    wordCount: 0,
  });
  const [term, setTerm] = useState<string>('');
  const [termResult, setTermResult] = useState<number>(0);

  const addHistory = (text: string) => {
    setTextHistory(prev => {
      const newHistory = [...prev.history];

      // Undo後に新規テキスト入力
      if (prev.currentIndex < newHistory.length - 1) {
        newHistory.splice(prev.currentIndex + 1);
      }
      // 履歴上限超えている場合、最古の履歴を削除
      if (newHistory.length >= MAX_LIMIT_HISTORY) {
        newHistory.shift();
      }

      newHistory.push(text);

      return {
        history: newHistory,
        currentIndex: newHistory.length - 1,
      };
    });
  };

  const handleUndo = () => {
    // 現在参照しているインデックスが最初ではない時
    if (textHistory.currentIndex > 0) {
      const newCurrentIndex = textHistory.currentIndex - 1;
      setText(() => textHistory.history[newCurrentIndex]);
      setTextHistory(prev => ({
        ...prev,
        currentIndex: newCurrentIndex,
      }));
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleRedo = () => {
    // 現在参照しているインデックスが最後ではない時
    if (textHistory.currentIndex < textHistory.history.length - 1) {
      const newCurrentIndex = textHistory.currentIndex + 1;
      setText(() => textHistory.history[newCurrentIndex]);
      setTextHistory(prev => ({
        ...prev,
        currentIndex: newCurrentIndex,
      }));
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const canUndo = textHistory.currentIndex > 0;
  const canRedo = textHistory.currentIndex < textHistory.history.length - 1;
  console.log(canUndo);
  console.log(canRedo);

  // 入力されたテキストを保持
  const handleAddText = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const text = e.target.value;
    setText(() => text);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      addHistory(text);
    }, 1000);
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

  useEffect(() => {
    const stats = computeStats(text);
    setTextResults(() => ({
      ...stats,
    }));
  }, [text]);

  const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value;
    setTerm(() => term);
  };

  const handleIsOverlapEnabled = () => {
    setIsOverlapEnabled(prev => !prev);
  };

  useEffect(() => {
    const termCount = countSearchTerm(isOverlapEnabled, text, term);
    setTermResult(() => termCount);
  }, [isOverlapEnabled, text, term]);

  return (
    <div className="min-h-screen bg-[var(--bg-color)] font-sans text-[var(--text-primary)] transition-colors duration-300 ease-in-out">
      <Header />
      <main className="mx-auto my-0 max-w-7xl p-4 md:p-8">
        <HeroSection />
        <TextInputSection
          text={text}
          onChangeText={handleAddText}
          onClearText={handleClear}
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={canUndo}
          canRedo={canRedo}
        />
        <SearchSection
          term={term}
          termResult={termResult}
          isOverlapEnabled={isOverlapEnabled}
          onChangeSearchTerm={handleSearchTerm}
          onChangeIsOverlapEnabled={handleIsOverlapEnabled}
        />
        <ResultsSection
          textResults={textResults}
          formatReadingTime={formatReadingTime}
        />
      </main>
    </div>
  );
}
