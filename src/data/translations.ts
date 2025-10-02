import type { TranslationData } from '../types/translations';

export const translations: TranslationData = {
  ja: {
    header: {
      appTitle: 'CharCounter',
      languageTooltip: '言語切り替え',
      themeTooltip: 'ダークモード切り替え',
    },
    hero: {
      title: '文字数カウンター',
      subtitle: 'テキストの文字数、単語数、バイト数をリアルタイムで計測',
    },
    textInput: {
      label: 'テキストを入力してください',
      placeholder:
        'ここにテキストを入力すると、リアルタイムで文字数が表示されます...',
      undoButton: 'Undo',
      undoTooltip: '元に戻す',
      undoTooltipDisabled: '元に戻す（利用できません）',
      redoButton: 'Redo',
      redoTooltip: 'やり直し',
      redoTooltipDisabled: 'やり直し（利用できません）',
      clearButton: 'クリア',
      copyButton: 'コピー',
      copySuccess: '✅ コピーしました！',
      copyError: '❌ 失敗',
    },
    search: {
      label: '検索',
      placeholder: '検索したい文字や単語を入力',
      resultText: '見つかった数: {count}個',
      overlapToggleLabel: '重複検索',
      overlapAriaLabel: '重複検索モードの切り替え',
      helpTooltip: '重複検索の説明',
      helpContent:
        '重複検索モード\n文字列の重複する位置も含めて検索\n\n例：「aaaa」から「aa」を検索\n・重複なし: 2個\n・重複あり: 3個',
    },
    replace: {
      label: '置換',
      placeholder: '置換後の文字や単語を入力',
      button: '置換',
      buttonAriaLabel: '検索文字列をすべて置換',
      resultText: '置換される数: {count}個',
    },
    results: {
      charCount: {
        title: '文字数',
        subtitle: '改行含む',
      },
      byteCount: {
        title: 'バイト数',
        subtitle: 'UTF-8エンコード',
      },
      readingTime: {
        title: '読み上げ時間',
        subtitle: '(推定)',
      },
      lineBreakCount: {
        title: '改行数',
        subtitle: '改行文字数',
      },
      paragraphCount: {
        title: '段落数',
        subtitle: '空行区切り',
      },
      wordCount: {
        title: '単語数',
        subtitle: '(英語のみ対応)',
      },
      toggleDetails: {
        show: '+ 詳細を表示',
        hide: '- 詳細を非表示',
      },
    },
    time: {
      seconds: '秒',
      minutes: '分',
      hours: '時間',
    },
  },
  en: {
    header: {
      appTitle: 'CharCounter',
      languageTooltip: 'Switch Language',
      themeTooltip: 'Toggle Dark Mode',
    },
    hero: {
      title: 'Character Counter',
      subtitle: 'Real-time counting of characters, words, and bytes in text',
    },
    textInput: {
      label: 'Please enter your text',
      placeholder:
        'Enter text here and see the character count update in real-time...',
      undoButton: 'Undo',
      undoTooltip: 'Undo',
      undoTooltipDisabled: 'Undo (not available)',
      redoButton: 'Redo',
      redoTooltip: 'Redo',
      redoTooltipDisabled: 'Redo (not available)',
      clearButton: 'Clear',
      copyButton: 'Copy',
      copySuccess: '✅ Copied!',
      copyError: '❌ Failed',
    },
    search: {
      label: 'Search',
      placeholder: 'Enter characters or words to search',
      resultText: 'Found: {count} matches',
      overlapToggleLabel: 'Overlap Search',
      overlapAriaLabel: 'Toggle overlap search mode',
      helpTooltip: 'Overlap search explanation',
      helpContent:
        "Overlap Search Mode\nSearch including overlapping positions\n\nExample: Search 'aa' in 'aaaa'\n・Non-overlap: 2 matches\n・Overlap: 3 matches",
    },
    replace: {
      label: 'Replace',
      placeholder: 'Enter replacement text or word',
      button: 'Replace',
      buttonAriaLabel: 'Replace all search matches',
      resultText: 'Will replace: {count} matches',
    },
    results: {
      charCount: {
        title: 'Characters',
        subtitle: 'including line breaks',
      },
      byteCount: {
        title: 'Bytes',
        subtitle: 'UTF-8 encoding',
      },
      readingTime: {
        title: 'Reading Time',
        subtitle: '(estimated)',
      },
      lineBreakCount: {
        title: 'Line Breaks',
        subtitle: 'newline characters',
      },
      paragraphCount: {
        title: 'Paragraphs',
        subtitle: 'empty line separated',
      },
      wordCount: {
        title: 'Words',
        subtitle: '(English only)',
      },
      toggleDetails: {
        show: '+ Show Details',
        hide: '- Hide Details',
      },
    },
    time: {
      seconds: 'sec',
      minutes: 'min',
      hours: 'hr',
    },
  },
};
