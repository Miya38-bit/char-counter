import { useCallback, useEffect, useRef, useState } from 'react';
import type { ButtonStatus } from '../types/editText';

export const useButtonStatus = () => {
  const [status, setStatus] = useState<ButtonStatus>('idle');
  const timeoutRef = useRef<number | null>(null);

  const executeWithStatus = useCallback(
    async (action: () => Promise<void> | void) => {
      try {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        await action();
        setStatus('success');
      } catch (error) {
        setStatus('error');
        console.error('Failed :', error);
      } finally {
        timeoutRef.current = setTimeout(() => {
          setStatus('idle');
        }, 1000);
      }
    },
    []
  );
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    status,
    executeWithStatus,
  };
};
