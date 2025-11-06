"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useI18n, type Lang } from "@/components/IntlProvider";

/* Drapeaux inline */
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
  const [user] = useState<{ name: string; avatar?: string } | null>(null);

  const [openLang, setOpenLang] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => { if (langRef.current && !langRef.current.contains(e.target as Node)) setOpenLang(false); };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname?.startsWith("/appartements");
    return pathname?.startsWith(href);
  };

  return (
    <header
      style={{
        position: "fixed",
        inset: "0 0 auto 0",
        zIndex: 50,
        /* 🎯 barre blanche translucide */
        background: "rgba(255,255,255,0.35)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(255,255,255,0.5)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: 16,
          padding: "12px 24px",
        }}
      >
        {/* Logo (couleur sombre pour contraster sur blanc) */}
        <div style={{ justifySelf: "start" }}>
          <Link href="/" style={{ fontSize: 20, fontWeight: 900, color: "#0f1622", textDecoration: "none" }}>
            {t("brand")}
          </Link>
        </div>

        {/* Segmented control centré */}
        <div style={{ justifySelf: "center" }}>
          <div
            role="tablist"
            aria-label="Type d'hébergement"
            style={{
              display: "inline-flex",
              background: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(0,0,0,0.1)",
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
                color: isActive("/") ? "#fff" : "#0f1622",
                background: isActive("/") ? "#0f1622" : "transparent",
                borderRight: "1px solid rgba(0,0,0,0.08)",
                transition: "background-color 0.25s ease, color 0.25s ease", // ✨ transition fluide
              }}
            >
              {t("nav_apartments")}
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
                color: isActive("/chalets") ? "#fff" : "#0f1622",
                background: isActive("/chalets") ? "#0f1622" : "transparent",
                transition: "background-color 0.25s ease, color 0.25s ease", // ✨ transition fluide
              }}
            >
              {t("nav_chalets")}
            </Link>
          </div>
        </div>

        {/* Langues + Connexion */}
        <div style={{ justifySelf: "end", display: "flex", alignItems: "center", gap: 10 }}>
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
                border: "1px solid rgba(0,0,0,0.12)",
                background: "rgba(255,255,255,0.8)",
                color: "#0f1622",
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
                  background: "rgba(255,255,255,0.95)",
                  border: "1px solid rgba(0,0,0,0.12)",
                  borderRadius: 10,
                  listStyle: "none",
                  padding: 4,
                  margin: 0,
                  boxShadow: "0 8px 20px rgba(0,0,0,.1)",
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
                        background: l.code === lang ? "rgba(155,93,229,0.15)" : "transparent",
                        border: 0,
                        color: "#0f1622",
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
                border: "2px solid rgba(0,0,0,0.12)",
                background: "rgba(255,255,255,0.9)",
                color: "#0f1622",
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
                color: "#0f1622",
                background: "#ffffff",
                border: "1px solid rgba(0,0,0,0.12)",
                transition: ".2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#9b5de5")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
            >
              {t("nav_login")}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
