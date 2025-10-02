export const LANGUAGES = ['ja', 'en'] as const;

export type Language = (typeof LANGUAGES)[number];

// 一つの言語分のデータ構造
export interface TranslationSet {
  header: {
    appTitle: string;
    languageTooltip: string;
    themeTooltip: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  textInput: {
    label: string;
    placeholder: string;
    undoButton: string;
    undoTooltip: string;
    undoTooltipDisabled: string;
    redoButton: string;
    redoTooltip: string;
    redoTooltipDisabled: string;
    clearButton: string;
    copyButton: string;
    copySuccess: string;
    copyError: string;
  };
  search: {
    label: string;
    placeholder: string;
    resultText: string; // "{count}"をプレースホルダーとして使用
    overlapToggleLabel: string;
    overlapAriaLabel: string;
    helpTooltip: string;
    helpContent: string;
  };
  replace: {
    label: string;
    placeholder: string;
    button: string;
    buttonAriaLabel: string;
    resultText: string;
  };
  results: {
    charCount: {
      title: string;
      subtitle: string;
    };
    byteCount: {
      title: string;
      subtitle: string;
    };
    readingTime: {
      title: string;
      subtitle: string;
    };
    lineBreakCount: {
      title: string;
      subtitle: string;
    };
    paragraphCount: {
      title: string;
      subtitle: string;
    };
    wordCount: {
      title: string;
      subtitle: string;
    };
    toggleDetails: {
      show: string;
      hide: string;
    };
  };
  time: {
    seconds: string;
    minutes: string;
    hours: string;
  };
}

// 全言語のデータを格納する構造
export type TranslationData = Record<Language, TranslationSet>;
