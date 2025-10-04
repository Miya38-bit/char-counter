import { useCallback, useMemo, useState } from 'react';
import { countSearchTerm } from '../utils/computeStas';

export const useSearchReplace = (text: string) => {
  const [isOverlapEnabled, setIsOverlapEnabled] = useState<boolean>(false);
  const [searchTerm, setsearchTerm] = useState<string>('');
  const [replaceTerm, setReplaceTerm] = useState<string>('');

  const searchResult = useMemo(() => {
    return countSearchTerm(isOverlapEnabled, text, searchTerm);
  }, [isOverlapEnabled, text, searchTerm]);

  const replaceResult = useMemo(() => {
    return countSearchTerm(false, text, searchTerm);
  }, [text, searchTerm]);

  const handleIsOverlapEnabled = () => setIsOverlapEnabled(prev => !prev);

  const executeReplace = useCallback(() => {
    if (!searchTerm) return text;

    const regex = new RegExp(
      searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
      `g`
    );
    return text.replace(regex, replaceTerm);
  }, [searchTerm, replaceTerm, text]);

  return {
    isOverlapEnabled,
    searchTerm,
    replaceTerm,
    searchResult,
    replaceResult,
    setsearchTerm,
    setReplaceTerm,
    handleIsOverlapEnabled,
    executeReplace,
  };
};
