"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import DateRangePicker from "./DateRangePicker";
import { useI18n } from "@/components/IntlProvider";

const STATIONS = [
  "Val Thorens",
  "Méribel",
  "Courchevel",
  "Tignes",
  "Val d'Isère",
  "Vars",
] as const;

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export default function SearchBar() {
  const router = useRouter();
  const { t } = useI18n();

  const [q, setQ] = useState("");
  const [checkin, setCheckin] = useState<string>("");
  const [checkout, setCheckout] = useState<string>("");
  const [guests, setGuests] = useState<number>(1);

  const [openStations, setOpenStations] = useState(false);
  const [openGuests, setOpenGuests] = useState(false);
  const [openDates, setOpenDates] = useState(false);

  const boxRef = useRef<HTMLDivElement>(null);

  const filteredStations = useMemo(() => {
    if (!q.trim()) return STATIONS.slice();
    const nq = normalize(q.trim());
    const starts = STATIONS.filter((s) => normalize(s).startsWith(nq));
    const contains = STATIONS.filter((s) => !starts.includes(s) && normalize(s).includes(nq));
    return [...starts, ...contains].slice(0, 6);
  }, [q]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) {
        setOpenStations(false); setOpenGuests(false); setOpenDates(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (checkin) params.set("checkin", checkin);
    if (checkout) params.set("checkout", checkout);
    if (guests) params.set("guests", String(guests));
    router.push(`/search?${params.toString()}`);
  }

  const pretty = (iso?: string) => {
    if (!iso) return "";
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
  };

  return (
    <div ref={boxRef} style={{ position: "relative", display: "flex", justifyContent: "center", width: "100%" }}>
      <form onSubmit={onSubmit} style={{ display: "flex", alignItems: "center", background: "#0f1622", border: "1px solid var(--border)", borderRadius: 999, boxShadow: openStations || openGuests || openDates ? "0 12px 30px rgba(0,0,0,.45)" : "0 10px 25px rgba(0,0,0,.25)", padding: "4px 6px", width: "100%", maxWidth: 820, zIndex: 10 }}>
        {/* Destination */}
        <div style={{ ...cellStyle, position: "relative", flex: 1, minWidth: 180 }}>
          <label style={labelStyle}>{t("search_destination_label")}</label>
          <input
            aria-label={t("search_destination_label")}
            placeholder={t("search_destination_ph")}
            value={q}
            onChange={(e) => { setQ(e.target.value); setOpenStations(true); setOpenDates(false); setOpenGuests(false); }}
            onFocus={() => { setOpenStations(true); setOpenDates(false); setOpenGuests(false); }}
            style={inputBareStyle}
          />
        </div>

        <Divider />

        {/* Arrivée */}
        <div style={{ ...cellStyle, position: "relative", minWidth: 120 }}>
          <label style={labelStyle}>{t("search_arrival")}</label>
          <button type="button" onClick={() => { setOpenDates((v) => !v); setOpenStations(false); setOpenGuests(false); }} style={chipStyle}>
            {checkin ? pretty(checkin) : "jj/mm/aaaa"}
          </button>
        </div>

        <Divider />

        {/* Départ */}
        <div style={{ ...cellStyle, position: "relative", minWidth: 120 }}>
          <label style={labelStyle}>{t("search_departure")}</label>
          <button type="button" onClick={() => { setOpenDates((v) => !v); setOpenStations(false); setOpenGuests(false); }} style={chipStyle}>
            {checkout ? pretty(checkout) : "jj/mm/aaaa"}
          </button>
        </div>

        <Divider />

        {/* Personnes */}
        <div style={{ ...cellStyle, position: "relative", minWidth: 100 }}>
          <label style={labelStyle}>{t("search_guests")}</label>
          <button type="button" onClick={() => { setOpenGuests((v) => !v); setOpenStations(false); setOpenDates(false); }} style={{ ...inputBareStyle, height: 28, display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid var(--border)", borderRadius: 8, padding: "0 10px", cursor: "pointer", width: 72 }}>
            {guests}<span style={{ marginLeft: 8, fontSize: 12, opacity: 0.8 }}>▼</span>
          </button>

          {openGuests && (
            <ul role="listbox" style={{ position: "absolute", top: "100%", left: 14, right: 14, marginTop: 8, background: "#0f1622", border: "1px solid var(--border)", borderRadius: 12, listStyle: "none", padding: 6, zIndex: 25, boxShadow: "0 10px 30px rgba(0,0,0,.35)", maxHeight: 240, overflowY: "auto", scrollbarWidth: "none" }}>
              {Array.from({ length: 10 }).map((_, i) => {
                const n = i + 1;
                const selected = n === guests;
                return (
                  <li key={n}>
                    <button type="button" onClick={() => { setGuests(n); setOpenGuests(false); }}
                      style={{ width: "100%", textAlign: "center", padding: "8px 0", background: selected ? "#142033" : "transparent", border: 0, color: "#eaf2ff", borderRadius: 8, cursor: "pointer", fontSize: 14 }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#142033")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = selected ? "#142033" : "transparent")}
                    >
                      {n}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <button type="submit" className="btn" style={{ borderRadius: 999, marginLeft: 8, padding: "10px 16px", fontWeight: 800, height: 40 }}>
          {t("search_cta")}
        </button>
      </form>

      {/* Suggestions stations */}
      {openStations && filteredStations.length > 0 && (
        <ul style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 820, background: "#0f1622", border: "1px solid var(--border)", borderRadius: 12, boxShadow: "0 10px 30px rgba(0,0,0,.35)", marginTop: 8, listStyle: "none", padding: 8, zIndex: 20 }}>
          {filteredStations.map((s) => (
            <li key={s}>
              <button type="button" onClick={() => { setQ(s); setOpenStations(false); }}
                style={{ width: "100%", textAlign: "left", padding: "10px 12px", background: "transparent", border: 0, color: "#eaf2ff", borderRadius: 8, cursor: "pointer", fontSize: 15 }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#142033")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Calendrier */}
      {openDates && (
        <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 820, marginTop: 8, zIndex: 25 }}>
          <DateRangePicker
            startISO={checkin}
            endISO={checkout}
            onChange={(start, end, opts) => { setCheckin(start || ""); setCheckout(end || ""); if (opts?.final) setOpenDates(false); }}
            onClose={() => setOpenDates(false)}
            size="sm"
          />
        </div>
      )}
    </div>
  );
}

const cellStyle: React.CSSProperties = { display: "flex", flexDirection: "column", justifyContent: "center", padding: "6px 12px" };
const labelStyle: React.CSSProperties = { fontSize: 11, letterSpacing: 0.3, textTransform: "uppercase", color: "var(--muted)" };
const inputBareStyle: React.CSSProperties = { background: "transparent", border: "0", outline: "none", padding: 0, height: 22, color: "#eaf2ff", width: "100%" };
const chipStyle: React.CSSProperties = { ...inputBareStyle, height: 28, display: "flex", alignItems: "center", border: "1px solid var(--border)", borderRadius: 8, padding: "0 10px", cursor: "pointer" } as const;

function Divider() { return <div style={{ width: 1, height: 28, background: "var(--border)" }} />; }
