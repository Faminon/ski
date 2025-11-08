"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Footer from "@/components/Footer"; // ✅ On réutilise ton composant global

const STATIONS = [
  {
    slug: "val-thorens",
    name: "Val Thorens",
    image: "/images/stations/val-thorens.jpg",
    description:
      "La plus haute station d’Europe, intégrée au domaine des 3 Vallées.",
  },
  {
    slug: "tignes",
    name: "Tignes",
    image: "/images/stations/tignes.jpg",
    description:
      "Reliée à Val d’Isère, idéale pour le ski de performance et la glisse.",
  },
  {
    slug: "vars",
    name: "Vars",
    image: "/images/stations/vars.jpg",
    description:
      "Station ensoleillée des Hautes-Alpes, cadre authentique et vivant.",
  },
];

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export default function StationsPage() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const nq = normalize(q.trim());
    if (!nq) return STATIONS;
    return STATIONS.filter((s) => normalize(s.name).includes(nq));
  }, [q]);

  return (
    <main style={{ background: "#fff" }}>
      <section
        style={{
          padding: "120px 24px 16px",
          textAlign: "center",
          background:
            "linear-gradient(180deg, rgba(15,22,34,.05), rgba(15,22,34,0))",
        }}
      >
        <h1
          style={{
            fontSize: 32,
            fontWeight: 900,
            color: "#0f1622",
            marginBottom: 8,
          }}
        >
          Les Stations
        </h1>
        <p style={{ color: "#576277", marginBottom: 20 }}>
          Explorez nos destinations phares et réservez votre séjour facilement.
        </p>

        {/* Barre de recherche */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher une station…"
            aria-label="Rechercher une station"
            className="stations-search"
          />
        </div>
      </section>

      <section style={{ padding: "24px", maxWidth: 1100, margin: "0 auto" }}>
        {filtered.length === 0 ? (
          <p style={{ color: "#576277", textAlign: "center", padding: "24px 0" }}>
            Aucune station ne correspond à « {q} ».
          </p>
        ) : (
          <div className="stations-grid">
            {filtered.map((s) => (
              <Link
                key={s.slug}
                href={`/listing?station=${s.slug}`}
                className="station-card"
              >
                <div className="station-card__image">
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="station-card__body">
                  <h3 className="station-card__title">{s.name}</h3>
                  <p className="station-card__desc">{s.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ✅ Réutilisation du footer global */}
      <Footer />

      <style jsx>{`
        .stations-search {
          width: min(560px, 92vw);
          height: 40px;
          border-radius: 999px;
          border: 1px solid rgba(15, 22, 34, 0.15);
          padding: 0 14px;
          font-size: 14px;
          outline: none;
          background: #ffffff;
          color: #0f1622;
          transition: box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .stations-search:focus {
          border-color: #0f1622;
          box-shadow: 0 0 0 4px rgba(15, 22, 34, 0.12);
        }
        .stations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        .station-card {
          display: block;
          background: #ffffff;
          border: 1px solid rgba(15, 22, 34, 0.1);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
          text-decoration: none;
          transition: transform 0.18s ease, box-shadow 0.18s ease,
            border-color 0.18s ease;
        }
        .station-card:hover,
        .station-card:focus-visible {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
          border-color: rgba(15, 22, 34, 0.2);
          outline: none;
        }
        .station-card__image {
          position: relative;
          width: 100%;
          height: 160px;
        }
        .station-card__body {
          padding: 14px;
        }
        .station-card__title {
          margin: 0;
          font-size: 18px;
          font-weight: 800;
          color: #0f1622;
        }
        .station-card__desc {
          margin: 6px 0 0 0;
          font-size: 14px;
          color: #576277;
        }
      `}</style>
    </main>
  );
}
