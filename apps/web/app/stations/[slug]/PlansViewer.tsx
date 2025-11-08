"use client";

import { useState } from "react";
import Image from "next/image";

type Item = { src: string; title: string; alt: string };

export default function PlansViewer({ items }: { items: Item[] }) {
  const [zoom, setZoom] = useState<string | null>(null);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {items.map((it) => (
          <figure
            key={it.src}
            onClick={() => setZoom(it.src)}
            style={{
              background: "#fff",
              border: "1px solid rgba(15,22,34,.1)",
              borderRadius: 12,
              overflow: "hidden",
              margin: 0,
              cursor: "zoom-in",
            }}
          >
            <div style={{ position: "relative", width: "100%", height: 320 }}>
              <Image
                src={it.src}
                alt={it.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption style={{ padding: 10, fontSize: 13, color: "#374151" }}>
              {it.title}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Modal plein écran */}
      {zoom && (
        <div
          onClick={() => setZoom(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "zoom-out",
          }}
        >
          <Image src={zoom} alt="Agrandissement" fill style={{ objectFit: "contain" }} />
        </div>
      )}
    </>
  );
}
