"use client";

import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import { useI18n } from "@/components/IntlProvider";
import { useTheme } from "@/components/ThemeProvider";

export default function HomeContent() {
  const { t } = useI18n();
  const { isLuxe } = useTheme();

  return (
    <main style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Image de fond */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/images/montagne-hero.jpg"
          alt="Panorama de montagne"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Contenu centré */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          paddingTop: 120,
          textAlign: "center",
          color: isLuxe ? "#f7f4ea" : "#0f1622",
        }}
      >
        <h1
          style={{
            fontSize: 42,
            fontWeight: 800,
            marginBottom: 40,
            color: isLuxe ? "#d4af37" : "#0f1622", // or vs noir
            textShadow: isLuxe ? "0 1px 12px rgba(0,0,0,.45)" : "none",
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
