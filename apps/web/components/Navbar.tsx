"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/IntlProvider";
import type { Lang } from "@/lib/i18n";

/* ---- Drapeaux inline ---- */
function Flag({ code, size = 14 }: { code: Lang; size?: number }) {
  const h = Math.round((size / 3) * 2);
  const common = { width: size, height: h, style: { display: "block", borderRadius: 2 } } as any;
  switch (code) {
    case "fr":
      return (<svg {...common} viewBox="0 0 3 2"><rect width="3" height="2" fill="#ED2939"/><rect width="2" height="2" fill="#fff"/><rect width="1" height="2" fill="#002395"/></svg>);
    case "en":
      return (<svg {...common} viewBox="0 0 60 30"><clipPath id="c"><path d="M0,0 v30 h60 v-30 z"/></clipPath><path d="M0,0 v30 h60 v-30 z" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#c)"/><path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/></svg>);
    case "de":
      return (<svg {...common} viewBox="0 0 3 2"><rect width="3" height="2" fill="#FFCE00"/><rect width="3" height="1.333" fill="#DD0000"/><rect width="3" height="0.666" fill="#000"/></svg>);
    case "it":
      return (<svg {...common} viewBox="0 0 3 2"><rect width="3" height="2" fill="#CE2B37"/><rect width="2" height="2" fill="#fff"/><rect width="1" height="2" fill="#009246"/></svg>);
  }
}

const LANGS: { code: Lang; label: string }[] = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
  { code: "it", label: "IT" },
];

export default function Navbar() {
  const { lang, setLang, t } = useI18n();

  // (Optionnel) mock user
  const [user] = useState<{ name: string; avatar?: string } | null>(null);

  const [openLang, setOpenLang] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!langRef.current) return;
      if (!langRef.current.contains(e.target as Node)) setOpenLang(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(15,22,34,.85)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--border)" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, paddingBottom: 12 }}>
        <Link href="/" style={{ fontSize: 20, fontWeight: 900, color: "#eaf2ff", textDecoration: "none" }}>
          {t("brand")}
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Sélecteur de langue */}
          <div ref={langRef} style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setOpenLang((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={openLang}
              style={{ display: "flex", alignItems: "center", gap: 6, width: 60, padding: "5px 8px", borderRadius: 999, border: "1px solid var(--border)", background: "#0f1622", color: "#eaf2ff", cursor: "pointer", fontWeight: 700, fontSize: 13, height: 34 }}
              title="Language"
            >
              <Flag code={lang} size={14} />
              <span>{lang.toUpperCase()}</span>
              <span style={{ opacity: 0.7, fontSize: 10 }}>▼</span>
            </button>

            {openLang && (
              <ul role="listbox" style={{ position: "absolute", right: 0, top: "calc(100% + 6px)", minWidth: 110, background: "#0f1622", border: "1px solid var(--border)", borderRadius: 10, listStyle: "none", padding: 4, margin: 0, boxShadow: "0 8px 20px rgba(0,0,0,.4)", zIndex: 60 }}>
                {LANGS.map((l) => {
                  const active = l.code === lang;
                  return (
                    <li key={l.code}>
                      <button
                        type="button"
                        onClick={() => { setLang(l.code); setOpenLang(false); }}
                        role="option"
                        aria-selected={active}
                        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "6px 0", background: active ? "#142033" : "transparent", border: 0, color: "#eaf2ff", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 700 }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#142033")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = active ? "#142033" : "transparent")}
                      >
                        <Flag code={l.code} size={14} />
                        <span>{l.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Bouton login (traduit) */}
          {user ? (
            <button title={user.name} style={{ width: 38, height: 38, borderRadius: "50%", overflow: "hidden", border: "2px solid var(--border)", background: "#142033", color: "#eaf2ff", fontWeight: 800, display: "grid", placeItems: "center", cursor: "pointer" }}>
              {user?.name?.[0]?.toUpperCase()}
            </button>
          ) : (
            <Link href="/login" className="btn" style={{ borderRadius: 999, padding: "8px 14px", fontWeight: 800, height: 34, display: "inline-grid", placeItems: "center" }}>
              {t("nav_login")}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
