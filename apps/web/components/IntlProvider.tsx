"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ALL_LANGS, Lang, defaultLang, dictionaries } from "@/lib/i18n";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<Ctx | null>(null);

export function IntlProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(defaultLang);

  // init from localStorage / navigator
  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem("lang") as Lang | null)) || null;
    if (saved && ALL_LANGS.includes(saved)) {
      setLangState(saved);
      document.documentElement.lang = saved;
    } else {
      const fromNav = (navigator.language || defaultLang).slice(0, 2) as Lang;
      const fallback: Lang = (ALL_LANGS.includes(fromNav) ? fromNav : defaultLang);
      setLangState(fallback);
      document.documentElement.lang = fallback;
    }
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    document.documentElement.lang = l;
    try { localStorage.setItem("lang", l); } catch {}
  }

  const t = useMemo(() => {
    const dict = dictionaries[lang] || dictionaries[defaultLang];
    return (key: string) => dict[key] ?? key;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <IntlProvider>");
  return ctx;
}
