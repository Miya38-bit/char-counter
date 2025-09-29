import { useEffect, useState, type ReactNode } from 'react';
import { LANGUAGES, type Language } from '../types/translations';
import { translations } from '../data/translations';
import { LanguageContext, type LanguageContextType } from './LanguageContext';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const isValidLanguage = (lang: string | null): lang is Language => {
    return LANGUAGES.includes(lang as Language);
  };
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('lang');

    if (savedLang && isValidLanguage(savedLang)) {
      return savedLang;
    }

    const browserLang = navigator.language.substring(0, 2);
    if (isValidLanguage(browserLang)) {
      return browserLang;
    }

    return 'ja';
  });
  const t = translations[currentLanguage];

  const toggleLanguage = () => {
    setCurrentLanguage(prev => {
      const currentIndex = LANGUAGES.indexOf(prev);
      const nextIndex = (currentIndex + 1) % LANGUAGES.length;
      return LANGUAGES[nextIndex];
    });
  };

  useEffect(() => {
    localStorage.setItem('lang', currentLanguage);
  }, [currentLanguage]);

  const contextValue: LanguageContextType = {
    currentLanguage,
    toggleLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};
