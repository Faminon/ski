"use client";

import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import { useI18n } from "@/components/IntlProvider";

export default function HomeContent() {
  const { t } = useI18n();

  return (
    <main style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Image de fond, depuis /public/images */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/images/montagne-hero.jpg"
          alt="Panorama de montagne"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Contenu : on décale un peu pour ne pas être sous la navbar fixe */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          paddingTop: 120, // espace sous la navbar
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h1
          style={{
            fontSize: 42,
            fontWeight: 800,
            marginBottom: 40,
            color: "#0f1622", // 🔥 noir/sombre
          }}
        >
          {t("home_title")}
        </h1>

        <div style={{ width: "100%", maxWidth: 900 }}>
          <SearchBar />
        </div>
      </div>
    </main>
  );
}
