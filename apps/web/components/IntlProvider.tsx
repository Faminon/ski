"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { dictionaries, type Lang } from "@/lib/i18n";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: string) => string;
};

const I18nContext = createContext<Ctx>({
  lang: "fr",
  setLang: () => {},
  t: (k) => k,
});

export const IntlProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const saved = (localStorage.getItem("lang") as Lang | null) || null;
    const browser = (navigator.language || "fr").slice(0, 2) as Lang;
    const initial = saved && dictionaries[saved] ? saved : dictionaries[browser] ? browser : "fr";
    setLang(initial);
    document.documentElement.lang = initial;
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (k: string) => dictionaries[lang]?.[k] ?? k;

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
};

export const useI18n = () => useContext(I18nContext);
export type { Lang };
