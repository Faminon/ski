import { listListings } from "@/lib/services";

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams.q || "").toLowerCase();
  const listings = (await listListings()).filter(l =>
    l.title.toLowerCase().includes(q) ||
    l.station.toLowerCase().includes(q)
  );
  return (
    <div>
      <h1 style={{fontSize:24, fontWeight:800}}>Résultats</h1>
      <p className="meta">Mot-clé : {q || "—"}</p>
      <div className="grid grid-3" style={{marginTop:16}}>
        {listings.map(l => (
          <a key={l.id} href={`/listing/${l.id}`} className="card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={l.imageUrl} alt={l.title} className="image" />
            <div style={{fontWeight:700, marginTop:8}}>{l.title}</div>
            <div className="meta">{l.station}</div>
          </a>
        ))}
      </div>
    </div>
  );
}