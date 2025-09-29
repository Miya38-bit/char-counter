import type { TextResults } from '../CharCounter';

// テキストの全計算結果を返す
export const computeStats = (text: string): TextResults => ({
  charCount: calculateCharCount(text),
  byteCount: calculateByteCount(text),
  readingTime: calculateReadingTime(text),
  lbCount: calculateLineBreaks(text),
  paragraphCount: calculateParagraph(text),
  wordCount: calculateWords(text),
});

// 文字数計算
export const calculateCharCount = (text: string): number => text.length;

// バイト数計算
export const calculateByteCount = (text: string): number =>
  new TextEncoder().encode(text).length;

// 読み上げ時間計算（秒）
export const calculateReadingTime = (text: string): number =>
  Math.round((text.length / 300) * 60);

// 改行数計算
export const calculateLineBreaks = (text: string): number =>
  text.match(/\r\n|\r|\n/g)?.length || 0;

// 段落数計算
export const calculateParagraph = (text: string): number => {
  const splitTextArry = text.replace(/\r\n|\r/g, '\n').split('\n\n');
  return splitTextArry.filter(text => text.trim() !== '').length;
};

// 単語数計算
export const calculateWords = (text: string): number =>
  text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

// 読み上げ時間分秒表記返却
export const formatReadingTime = (
  readingTime: number,
  timeLabels: { minutes: string; seconds: string; hours?: string }
): string => {
  const minutes = Math.floor(readingTime / 60);
  const seconds = readingTime % 60;
  return `${minutes}${timeLabels.minutes}${seconds}${timeLabels.seconds}`;
};

// 検索文字列の計算
export const countSearchTerm = (
  isOverlapEnabled: boolean,
  text: string,
  term: string
): number => {
  if (!text || !term) return 0;

  const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (isOverlapEnabled) {
    const regex = new RegExp(`(?=${escapedTerm})`, `g`);
    return (text.match(regex) || []).length;
  } else {
    const regex = new RegExp(escapedTerm, `g`);
    return (text.match(regex) || []).length;
  }
};
