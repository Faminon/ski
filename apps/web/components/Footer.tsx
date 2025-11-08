"use client";

import Link from "next/link";

type FooterProps = {
  /** Réduit les marges hautes si besoin (ex: pages très courtes) */
  compact?: boolean;
};

export default function Footer({ compact = false }: FooterProps) {
  return (
    <footer
      role="contentinfo"
      style={{
        background: "#0f1622",
        color: "#dbe0ea",
        padding: compact ? "36px 24px 28px" : "48px 24px 32px",
        marginTop: compact ? "32px" : "64px",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 24,
        }}
      >
        {/* Bloc marque */}
        <div>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", margin: 0 }}>
            SkiBnB
          </h3>
          <p style={{ marginTop: 8, lineHeight: 1.6, fontSize: 14 }}>
            Plateforme de location d’appartements et de chalets au ski.
            Découvrez les meilleures stations et réservez en toute simplicité.
          </p>
        </div>

        {/* Bloc contact */}
        <div>
          <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: "#fff" }}>
            Contact
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: 1.8 }}>
            <li>
              📧{" "}
              <a
                href="mailto:contact@skibnb.fr"
                style={{ color: "#dbe0ea", textDecoration: "none" }}
              >
                contact@skibnb.fr
              </a>
            </li>
            <li>📞 +33 6 12 34 56 78</li>
            <li>📍 15 Rue des Neiges, 73000 Chambéry, France</li>
          </ul>
        </div>

        {/* Bloc liens */}
        <div>
          <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: "#fff" }}>
            Liens utiles
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: 1.9 }}>
            <li>
              <Link href="/a-propos" style={{ color: "#dbe0ea", textDecoration: "none" }}>
                À propos
              </Link>
            </li>
            <li>
              <Link href="/mentions-legales" style={{ color: "#dbe0ea", textDecoration: "none" }}>
                Mentions légales
              </Link>
            </li>
            <li>
              <Link
                href="/politique-confidentialite"
                style={{ color: "#dbe0ea", textDecoration: "none" }}
              >
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link href="/stations" style={{ color: "#dbe0ea", textDecoration: "none" }}>
                Les stations
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          margin: "28px 0",
        }}
      />

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 13,
          color: "rgba(255,255,255,0.65)",
        }}
      >
        <span>© {new Date().getFullYear()} SkiBnB — Tous droits réservés.</span>

        <span>
          Fait par <strong style={{ color: "#fff" }}>Faminon</strong>
        </span>
      </div>
    </footer>
  );
}
