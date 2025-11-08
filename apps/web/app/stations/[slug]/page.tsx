import Image from "next/image";
import Link from "next/link";
import { getAllSlugs, getStationBySlug } from "@/lib/stations";
import Footer from "@/components/Footer";
import PlansViewer from "./PlansViewer";

// ---- SSG params (Server only)
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// ---- Metadata (Server only)
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const station = getStationBySlug(params.slug);
  return {
    title: station ? `${station.name} | SkiBnB` : "Station | SkiBnB",
    description: station?.intro ?? "Informations station de ski",
  };
}

// ---- Helpers (Server-side safe)
function formatFR(dateISO?: string) {
  if (!dateISO) return "";
  const [y, m, d] = dateISO.split("-").map((n) => parseInt(n, 10));
  const dt = new Date(y, (m ?? 1) - 1, d ?? 1);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(dt);
}

function toLocalDate(dateISO?: string): Date | null {
  if (!dateISO) return null;
  const [y, m, d] = dateISO.split("-").map((n) => parseInt(n, 10));
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

function atMidnightLocal(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function diffDays(a: Date, b: Date) {
  const ms = atMidnightLocal(b).getTime() - atMidnightLocal(a).getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

// Statut d’ouverture + alerte de fermeture (calcul côté serveur)
function computeSeasonStatus(openingStart?: string, openingEnd?: string) {
  const start = toLocalDate(openingStart);
  const end = toLocalDate(openingEnd);
  const today = atMidnightLocal(new Date());

  // Avant l'ouverture → J-XX (bleu)
  if (start && today < start) {
    const days = diffDays(today, start);
    return {
      kind: "before" as const,
      label: days === 0 ? "Ouverture aujourd’hui" : `Ouverture dans J-${days}`,
      toneBg: "#0ea5e9",
      toneText: "#fff",
      closeSoon: null as null,
    };
  }

  // Saison en cours → Ouvert (rouge) + éventuelle alerte fermeture (≤14j)
  if (start && end && today >= start && today <= end) {
    const daysLeft = diffDays(today, end);
    const closeSoon = daysLeft <= 14 ? { daysLeft } : null;
    return {
      kind: "inseason" as const,
      label: "Ouvert",
      toneBg: "#dc2626",
      toneText: "#fff",
      closeSoon,
    };
  }

  // Après saison → gris
  if (end && today > end) {
    return {
      kind: "after" as const,
      label: `Saison terminée le ${formatFR(openingEnd)}`,
      toneBg: "#9ca3af",
      toneText: "#0f1622",
      closeSoon: null as null,
    };
  }

  // Inconnu
  return {
    kind: "unknown" as const,
    label: "Dates d’ouverture à confirmer",
    toneBg: "#f59e0b",
    toneText: "#0f1622",
    closeSoon: null as null,
  };
}

function ExternalLinkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden focusable="false" {...props}>
      <path fill="currentColor" d="M14 3h7v7h-2V6.414l-9.293 9.293-1.414-1.414L17.586 5H14V3z"></path>
      <path fill="currentColor" d="M5 5h6v2H7v10h10v-4h2v6H5V5z"></path>
    </svg>
  );
}

export default function StationPage({ params }: { params: { slug: string } }) {
  const station = getStationBySlug(params.slug);

  if (!station) {
    return (
      <main style={{ padding: "140px 24px" }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 12 }}>Station introuvable</h1>
        <p>La station demandée n’existe pas.</p>
        <p style={{ marginTop: 16 }}>
          <Link href="/stations">← Retour à la liste des stations</Link>
        </p>
      </main>
    );
  }

  const {
    name,
    heroImage,
    intro,
    altitudeVillage,
    altitudeMin,
    altitudeMax,
    domaineName,
    domaineKm,
    lifts,
    slopes,
    snowpark,
    openingStart,
    openingEnd,
    nearestAirports,
    officialSite,
    planStationImage,
    planDomaineImage,
  } = station;

  const openingRange =
    openingStart && openingEnd
      ? `${formatFR(openingStart)} → ${formatFR(openingEnd)}`
      : openingStart
      ? `À partir du ${formatFR(openingStart)}`
      : openingEnd
      ? `Jusqu’au ${formatFR(openingEnd)}`
      : "N.C.";

  const season = computeSeasonStatus(openingStart, openingEnd);

  return (
    <main style={{ background: "#fff" }}>
      {/* HERO */}
      <section style={{ position: "relative", height: 360 }}>
        <Image src={heroImage} alt={name} fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.45) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "end", padding: "24px" }}>
          <div style={{ color: "#fff" }}>
            <Link href="/stations" style={{ display: "inline-block", marginBottom: 8, color: "rgba(255,255,255,.9)", textDecoration: "none" }}>
              ← Toutes les stations
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <h1 style={{ margin: 0, fontSize: 36, fontWeight: 900 }}>{name}</h1>

              {/* Badge saison */}
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 999, background: season.toneBg, color: season.toneText, fontWeight: 800, fontSize: 13 }}>
                <span aria-hidden style={{ width: 8, height: 8, borderRadius: "50%", background: "currentColor", opacity: 0.9 }} />
                {season.label}
              </span>

              {/* Lien site officiel */}
              {officialSite && (
                <a href={officialSite} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 999, background: "rgba(255,255,255,0.15)", color: "#fff", textDecoration: "none", fontWeight: 800, fontSize: 13 }}>
                  Site officiel
                  <ExternalLinkIcon />
                </a>
              )}
            </div>

            <p style={{ margin: "6px 0 0 0", maxWidth: 900 }}>{intro}</p>

            {/* Indicateur fermeture (≤14j) */}
            {season.kind === "inseason" && season.closeSoon && (
              <div style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 999, background: "rgba(255,255,255,0.18)", color: "#fff", fontWeight: 700, fontSize: 13 }}>
                <span aria-hidden style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff", opacity: 0.9 }} />
                {season.closeSoon.daysLeft === 0 ? "Fermeture aujourd’hui" : `Fermeture dans J-${season.closeSoon.daysLeft}`}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Fiche rapide */}
      <section style={{ padding: "24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
          <StatCard label="Altitude village" value={`${altitudeVillage} m`} />
          <StatCard label="Altitude domaine" value={`${altitudeMin} m → ${altitudeMax} m`} />
          <StatCard label="Domaine skiable" value={`${domaineName} • ~${domaineKm} km`} />
          <StatCard label="Remontées" value={`${lifts}`} />
          <StatCard label="Pistes" value={`V${slopes.green} • B${slopes.blue} • R${slopes.red} • N${slopes.black}`} hint="(V=vert, B=bleu, R=rouge, N=noir)" />
          <StatCard label="Snowpark" value={snowpark ? "Oui" : "Non"} />
          <StatCard label="Ouverture" value={openingRange} />
          {nearestAirports?.length ? <StatCard label="Aéroports proches" value={nearestAirports.join(" • ")} /> : null}
        </div>
      </section>

      {/* Plans (interactif via Client Component) */}
      {(planStationImage || planDomaineImage) && (
        <section style={{ padding: "8px 24px 24px", maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f1622", marginBottom: 12 }}>Plans</h2>
          <PlansViewer
            items={[
              ...(planStationImage ? [{ src: planStationImage, title: "Plan de la station", alt: `Plan de ${name}` }] : []),
              ...(planDomaineImage ? [{ src: planDomaineImage, title: "Plan du domaine skiable", alt: `Plan du domaine — ${name}` }] : []),
            ]}
          />
        </section>
      )}
      <Footer />
    </main>
  );
}

function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div style={{ background: "#ffffff", border: "1px solid rgba(15,22,34,.1)", borderRadius: 12, padding: 14, boxShadow: "0 2px 10px rgba(0,0,0,.04)" }}>
      <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 800, color: "#0f1622" }}>{value}</div>
      {hint ? <div style={{ fontSize: 12, color: "#9aa3b2" }}>{hint}</div> : null}
    </div>
  );
}