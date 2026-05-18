"use client";
import { useEffect } from 'react';
import { useLanguage, type Language } from '@/lib/language-context';

export function ForceLanguage({ lang }: { lang: Language }) {
  const { setLanguage } = useLanguage();
  useEffect(() => {
    setLanguage(lang);
  }, [lang, setLanguage]);
  return null;
}
