import { createContext, useContext } from 'react';
import type { Language, TranslationSet } from '../types/translations';

export interface LanguageContextType {
  currentLanguage: Language;
  toggleLanguage: () => void;
  t: TranslationSet;
}

export const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);

  if (context === null) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
};
