import { useCallback, useEffect, useRef, useState } from 'react';

interface History<T> {
  history: T[];
  currentIndex: number;
}
export const MAX_LIMIT_HISTORY = 50;

export const useTextHistory = <T>(initialValue: T) => {
  const [text, setText] = useState<T>(initialValue);
  const [textHistory, setTextHistory] = useState<History<T>>({
    history: [initialValue],
    currentIndex: 0,
  });
  const timeoutRef = useRef<number | null>(null);
  const isUndoRedoRef = useRef<boolean>(false);
  const isFirstMount = useRef<boolean>(true);

  const addHistory = useCallback((text: T) => {
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

      console.log(newHistory.length);
      return {
        history: newHistory,
        currentIndex: newHistory.length - 1,
      };
    });
  }, []);

  const handleUndo = () => {
    // 現在参照しているインデックスが最初ではない時
    if (textHistory.currentIndex > 0) {
      const newCurrentIndex = textHistory.currentIndex - 1;
      isUndoRedoRef.current = true;

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
      isUndoRedoRef.current = true;

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

  useEffect(() => {
    // 初回マウント時はスキップ
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (isUndoRedoRef.current) {
      isUndoRedoRef.current = false;
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    console.log(text);
    timeoutRef.current = setTimeout(() => {
      addHistory(text);
    }, 1000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, addHistory]);

  return {
    text,
    setText,
    undo: handleUndo,
    redo: handleRedo,
    canUndo: textHistory.currentIndex > 0,
    canRedo: textHistory.currentIndex < textHistory.history.length - 1,
  };
};
