import { getListing } from "@/lib/services";
import { notFound } from "next/navigation";

export default async function ListingPage({ params }: { params: { id: string } }) {
  const listing = await getListing(params.id);
  if (!listing) return notFound();
  return (
    <div className="grid" style={{gridTemplateColumns:"1.3fr .7fr", gap:20}}>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={listing.imageUrl} alt={listing.title} className="image" style={{height:320}} />
        <h1 style={{fontSize:26, fontWeight:900, marginTop:12}}>{listing.title}</h1>
        <div className="meta">{listing.station} · {listing.capacity} pers.</div>
        <p style={{margin:"12px 0"}}>{listing.description}</p>
        <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
          {listing.amenities.map(a => <span key={a} className="badge">{a}</span>)}
        </div>
      </div>
      <aside className="card" style={{ alignSelf:"start" }}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div><span style={{fontWeight:900, fontSize:20}}>{Math.round(listing.pricePerNightCents/100)} €</span> <span className="meta">/ nuit</span></div>
          <div className="badge">{listing.capacity} pers.</div>
        </div>
        <form className="grid" style={{gap:10, marginTop:12}} onSubmit={(e) => e.preventDefault()}>
          <label>Check-in<input className="input" name="checkin" type="date" required /></label>
          <label>Check-out<input className="input" name="checkout" type="date" required /></label>
          <button className="btn" type="submit">Simuler une réservation</button>
          <div className="meta">Front only — pas de paiement ici.</div>
        </form>
      </aside>
    </div>
  );
}