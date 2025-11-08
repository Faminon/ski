"use client";

import Image from "next/image";
import Link from "next/link";

export default function StationsSection() {
  const stations = [
    {
      name: "Val Thorens",
      image: "/images/stations/val-thorens.jpg",
      description: "La plus haute station d’Europe, au cœur des 3 Vallées.",
      link: "/listing?station=val-thorens",
    },
    {
      name: "Tignes",
      image: "/images/stations/tignes.jpg",
      description:
        "Immense domaine relié à Val d’Isère, parfait pour le ski sportif.",
      link: "/listing?station=tignes",
    },
    {
      name: "Vars",
      image: "/images/stations/vars.jpg",
      description:
        "Dans les Hautes-Alpes, cadre authentique, ensoleillé et dynamique.",
      link: "/listing?station=vars",
    },
  ];

  return (
    <section style={{ background: "#fff", padding: "64px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Titre cliquable */}
        <div
          style={{
            marginBottom: 24,
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <Link href="/stations" style={{ textDecoration: "none" }}>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: "#0f1622",
                margin: 0,
              }}
            >
              Les Stations
            </h2>
          </Link>

          <Link
            href="/stations"
            style={{
              color: "#0f1622",
              textDecoration: "none",
              fontWeight: 700,
              opacity: 0.8,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
          >
            Voir toutes → 
          </Link>
        </div>

        {/* Cartes */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {stations.map((station) => (
            <Link key={station.name} href={station.link} style={{ textDecoration: "none" }}>
              <article
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: 14,
                  border: "1px solid rgba(15,22,34,.1)",
                  borderRadius: 14,
                  background: "#f9fbff",
                  transition:
                    "transform .15s ease, box-shadow .15s ease, background-color .15s ease",
                  boxShadow: "0 1px 2px rgba(0,0,0,.04)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 20px rgba(0,0,0,.08)";
                  (e.currentTarget as HTMLDivElement).style.background = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 2px rgba(0,0,0,.04)";
                  (e.currentTarget as HTMLDivElement).style.background = "#f9fbff";
                }}
              >
                <div
                  style={{
                    position: "relative",
                    flex: "0 0 48px",
                    width: 48,
                    height: 48,
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={station.image}
                    alt={station.name}
                    fill
                    sizes="48px"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ color: "#0f1622", fontWeight: 800, fontSize: 16 }}>
                    {station.name}
                  </span>
                  <span style={{ color: "#576277", fontSize: 13 }}>
                    {station.description}
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
