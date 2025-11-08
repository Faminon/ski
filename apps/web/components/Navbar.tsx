"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useI18n, type Lang } from "@/components/IntlProvider";
import { useTheme } from "@/components/ThemeProvider";

/* Drapeaux SVG */
function Flag({ code, size = 14 }: { code: Lang; size?: number }) {
  const h = Math.round((size / 3) * 2);
  const common = { width: size, height: h, style: { display: "block", borderRadius: 2 } } as any;
  switch (code) {
    case "fr": return (<svg {...common} viewBox="0 0 3 2"><rect width="3" height="2" fill="#ED2939"/><rect width="2" height="2" fill="#fff"/><rect width="1" height="2" fill="#002395"/></svg>);
    case "en": return (<svg {...common} viewBox="0 0 60 30"><clipPath id="c"><path d="M0,0 v30 h60 v-30 z"/></clipPath><path d="M0,0 v30 h60 v-30 z" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#c)"/><path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/></svg>);
    case "de": return (<svg {...common} viewBox="0 0 3 2"><rect width="3" height="2" fill="#FFCE00"/><rect width="3" height="1.333" fill="#DD0000"/><rect width="3" height="0.666" fill="#000"/></svg>);
    case "it": return (<svg {...common} viewBox="0 0 3 2"><rect width="3" height="2" fill="#CE2B37"/><rect width="2" height="2" fill="#fff"/><rect width="1" height="2" fill="#009246"/></svg>);
  }
}
const LANGS: { code: Lang; label: string }[] = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
  { code: "it", label: "IT" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { lang, setLang, t } = useI18n();
  const { isLuxe } = useTheme();
  const [user] = useState<{ name: string; avatar?: string } | null>(null);

  // menu langues
  const [openLang, setOpenLang] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => { if (langRef.current && !langRef.current.contains(e.target as Node)) setOpenLang(false); };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // 🎨 Palette selon thème
  const palette = isLuxe
    ? {
        navbarBg: "rgba(0,0,0,0.45)",
        navbarBorder: "rgba(212,175,55,0.35)", // or doux
        textMain: "#f7f4ea",
        textMuted: "#e9dfc2",
        segBorder: "rgba(212,175,55,0.35)",
        langBtnBg: "rgba(0,0,0,0.55)",
        langBtnBorder: "rgba(212,175,55,0.35)",
      }
    : {
        navbarBg: "rgba(255,255,255,0.35)",
        navbarBorder: "rgba(0,0,0,0.1)",
        textMain: "#0f1622",
        textMuted: "#576277",
        segBorder: "rgba(0,0,0,0.1)",
        langBtnBg: "rgba(255,255,255,0.8)",
        langBtnBorder: "rgba(0,0,0,0.12)",
      };

  return (
    <header
      style={{
        position: "fixed",
        inset: "0 0 auto 0",
        zIndex: 50,
        background: palette.navbarBg,
        backdropFilter: "blur(8px)",
        borderBottom: `1px solid ${palette.navbarBorder}`,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "12px 24px",
          width: "100%",
        }}
      >
        {/* Logo (gauche) */}
        <Link
          href="/"
          style={{ fontSize: 20, fontWeight: 900, color: palette.textMain, textDecoration: "none" }}
        >
          SkiBnB
        </Link>

        {/* Segmented control */}
        {/*
        <div style={{ justifySelf: "center" }}>
          <div
            role="tablist"
            aria-label="Type d'hébergement"
            style={{
              display: "inline-flex",
              background: palette.segBg,
              border: `1px solid ${palette.segBorder}`,
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <Link
              href="/"
              role="tab"
              aria-selected={isActive("/")}
              style={{
                padding: "8px 16px",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: 14,
                color: isActive("/") ? palette.tabActiveText : palette.tabInactiveText,
                background: isActive("/") ? palette.tabActiveBg : "transparent",
                borderRight: `1px solid ${palette.segBorder}`,
                transition: "background-color .25s ease, color .25s ease",
              }}
            >
              {t("nav_apartments") ?? "Appartements"}
            </Link>

            <Link
              href="/chalets"
              role="tab"
              aria-selected={isActive("/chalets")}
              style={{
                padding: "8px 16px",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: 14,
                color: isActive("/chalets") ? palette.tabActiveText : palette.tabInactiveText,
                background: isActive("/chalets") ? palette.tabActiveBg : "transparent",
                transition: "background-color .25s ease, color .25s ease",
              }}
            >
              {t("nav_chalets") ?? "Chalets"}
            </Link>
          </div>
        </div>
        */}

        {/* Spacer flexible pour pousser le bloc de droite */}
        <div style={{ flex: 1 }} />

        {/* Langue + Connexion (droite) */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: "auto" }}>
          <div ref={langRef} style={{ position: "relative" }}>
            <button
              onClick={() => setOpenLang((v) => !v)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                width: 72,
                padding: "6px 10px",
                borderRadius: 999,
                border: `1px solid ${palette.langBtnBorder}`,
                background: palette.langBtnBg,
                color: palette.textMain,
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 13,
                height: 34,
              }}
            >
              <Flag code={lang} size={14} />
              <span>{lang.toUpperCase()}</span>
              <span style={{ opacity: 0.7, fontSize: 10 }}>▼</span>
            </button>

            {openLang && (
              <ul
                style={{
                  position: "absolute",
                  right: 0,
                  top: "calc(100% + 6px)",
                  minWidth: 110,
                  background: isLuxe ? "rgba(0,0,0,0.9)" : "rgba(255,255,255,0.95)",
                  border: `1px solid ${palette.langBtnBorder}`,
                  borderRadius: 10,
                  listStyle: "none",
                  padding: 4,
                  margin: 0,
                  boxShadow: isLuxe ? "0 10px 30px rgba(0,0,0,.5)" : "0 8px 20px rgba(0,0,0,.1)",
                  zIndex: 60,
                }}
              >
                {LANGS.map((l) => (
                  <li key={l.code}>
                    <button
                      onClick={() => { setLang(l.code); setOpenLang(false); }}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        padding: "6px 0",
                        background: "transparent",
                        border: 0,
                        color: palette.textMain,
                        borderRadius: 6,
                        cursor: "pointer",
                        fontSize: 13,
                        fontWeight: 700,
                      }}
                    >
                      <Flag code={l.code} size={14} />
                      <span>{l.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {user ? (
            <button
              title={user.name}
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                overflow: "hidden",
                border: `2px solid ${palette.segBorder}`,
                background: isLuxe ? "#000" : "#ffffff",
                color: palette.textMain,
                fontWeight: 800,
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
              }}
            >
              {user.name[0].toUpperCase()}
            </button>
          ) : (
            <Link
              href="/login"
              style={{
                borderRadius: 999,
                padding: "8px 14px",
                fontWeight: 800,
                height: 34,
                display: "inline-grid",
                placeItems: "center",
                textDecoration: "none",
                color: isLuxe ? "#000" : "#0f1622",
                background: isLuxe ? "#d4af37" : "#ffffff",
                border: `1px solid ${palette.segBorder}`,
                transition: ".2s",
              }}
            >
              {t("nav_login")}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
