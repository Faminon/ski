"use client";
import { useMemo, useState } from "react";

type Props = {
  startISO?: string;
  endISO?: string;
  onChange: (startISO: string, endISO: string, opts?: { final?: boolean }) => void;
  onClose: () => void;
  size?: "sm" | "md";
};

// utils
function pad(n: number) { return n < 10 ? `0${n}` : `${n}`; }
function toISO(d: Date) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }
function sameDay(a: Date, b: Date) { return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }
function isBetween(d: Date, a: Date, b: Date) {
  const x = d.setHours(0,0,0,0), s = a.setHours(0,0,0,0), e = b.setHours(0,0,0,0);
  return x > s && x < e;
}

export default function DateRangePicker({
  startISO, endISO, onChange, onClose, size = "md"
}: Props) {
  const today = new Date();
  const startInit = startISO ? new Date(startISO) : undefined;
  const endInit = endISO ? new Date(endISO) : undefined;

  const [cursor, setCursor] = useState<Date>(
    startInit ? new Date(startInit) : new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [start, setStart] = useState<Date | undefined>(startInit);
  const [end, setEnd] = useState<Date | undefined>(endInit);

  const month = useMemo(() => buildMonth(cursor), [cursor]);

  function selectDay(d: Date) {
    // 1er clic : on fixe start et on notifie immédiatement le parent
    if (!start || (start && end)) {
      setStart(d);
      setEnd(undefined);
      onChange(toISO(d), ""); // 👉 met à jour "Arrivée" tout de suite
      return;
    }
    // 2e clic : on fixe end, on notifie et on ferme
    if (start && !end) {
      let s = start;
      let e = d;
      if (d < start) { s = d; e = start; }
      else if (sameDay(d, start)) {
        const next = new Date(d); next.setDate(d.getDate() + 1);
        e = next;
      }
      setStart(s);
      setEnd(e);
      onChange(toISO(s), toISO(e), { final: true }); // 👉 range complet + fermeture
      onClose();
    }
  }

  function clear() {
    setStart(undefined);
    setEnd(undefined);
    onChange("", "");
  }

  // style compact
  const scale = size === "sm" ? 0.86 : 1;
  const dayPadding = size === "sm" ? "7px 0" : "10px 0";
  const headerPad = size === "sm" ? 8 : 12;
  const fontHeader = size === "sm" ? 14 : 16;

  return (
    <div
      style={{
        background: "#0f1622",
        border: "1px solid var(--border)",
        borderRadius: 14,
        boxShadow: "0 16px 40px rgba(0,0,0,.45)",
        overflow: "hidden",
        transform: `scale(${scale})`,
        transformOrigin: "top center",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          padding: headerPad,
          borderBottom: "1px solid var(--border)",
        }}
      >
        <button
          type="button"
          onClick={() => setCursor((c) => new Date(c.getFullYear(), c.getMonth() - 1, 1))}
          style={navBtn}
          aria-label="Mois précédent"
        >
          ◀
        </button>
        <div style={{ textAlign: "center", fontWeight: 800, fontSize: fontHeader }}>
          {cursor.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
        </div>
        <button
          type="button"
          onClick={() => setCursor((c) => new Date(c.getFullYear(), c.getMonth() + 1, 1))}
          style={navBtn}
          aria-label="Mois suivant"
        >
          ▶
        </button>
      </div>

      <div style={{ padding: 10 }}>
        {/* En-têtes jours */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 6,
            marginBottom: 6,
            color: "var(--muted)",
            fontSize: 11,
            textTransform: "uppercase",
          }}
        >
          {["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"].map((d) => (
            <div key={d} style={{ textAlign: "center" }}>{d}</div>
          ))}
        </div>

        {/* Jours */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
          {month.map((cell, i) => {
            if (!cell) return <div key={`e${i}`} />;
            const d = cell;
            const isStart = start && sameDay(d, start);
            const isEnd = end && sameDay(d, end);
            const inBetween = start && end ? isBetween(new Date(d), new Date(start), new Date(end)) : false;
            const isPast = d.setHours(0,0,0,0) < new Date(new Date().setHours(0,0,0,0)).getTime();

            return (
              <button
                key={d.toISOString()}
                type="button"
                onClick={() => !isPast && selectDay(new Date(d))}
                disabled={isPast}
                style={{
                  padding: dayPadding,
                  textAlign: "center",
                  borderRadius: isStart || isEnd ? 10 : 8,
                  border: "1px solid var(--border)",
                  background: isStart || isEnd ? "#1e2a3f" : inBetween ? "#142033" : "transparent",
                  color: isPast ? "#445165" : "#eaf2ff",
                  cursor: isPast ? "not-allowed" : "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!isPast && !isStart && !isEnd && !inBetween) e.currentTarget.style.background = "#142033";
                }}
                onMouseLeave={(e) => {
                  if (!isPast && !isStart && !isEnd && !inBetween) e.currentTarget.style.background = "transparent";
                }}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions compactes */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 6,
          padding: 8,
          borderTop: "1px solid var(--border)",
        }}
      >
        <button type="button" onClick={clear} style={{ ...ghostBtn, padding: "8px 10px" }}>
          Effacer
        </button>
        <button type="button" onClick={onClose} style={{ ...ghostBtn, padding: "8px 10px" }}>
          Fermer
        </button>
      </div>
    </div>
  );
}

function buildMonth(anyDayInMonth: Date): (Date | null)[] {
  const first = new Date(anyDayInMonth.getFullYear(), anyDayInMonth.getMonth(), 1);
  const last = new Date(anyDayInMonth.getFullYear(), anyDayInMonth.getMonth() + 1, 0);
  const firstDayIndex = ((first.getDay() + 6) % 7); // 0..6 (0=Lun)
  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDayIndex; i++) cells.push(null);
  for (let d = 1; d <= last.getDate(); d++) cells.push(new Date(first.getFullYear(), first.getMonth(), d));
  while (cells.length % 7 !== 0) cells.push(null);
  while (cells.length < 42) cells.push(null);
  return cells;
}

const navBtn: React.CSSProperties = {
  background: "transparent",
  border: "1px solid var(--border)",
  borderRadius: 8,
  color: "#eaf2ff",
  padding: "4px 8px",
  cursor: "pointer",
  fontSize: 12,
};

const ghostBtn: React.CSSProperties = {
  background: "transparent",
  border: "1px solid var(--border)",
  color: "#eaf2ff",
  borderRadius: 10,
  padding: "10px 14px",
  cursor: "pointer",
};
