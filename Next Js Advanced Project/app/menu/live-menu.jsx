"use client";
import { useEffect, useState } from "react";
export default function LiveMenu() {
 const [query, setQuery] = useState(""); const [debounced, setDebounced] = useState(""); const [data, setData] = useState(null); const [error, setError] = useState("");
 useEffect(() => { const timer = setTimeout(() => setDebounced(query), 300); return () => clearTimeout(timer); }, [query]);
 useEffect(() => { let alive = true; const load = async () => { try { const response = await fetch(`/api/dishes?q=${encodeURIComponent(debounced)}`, { cache: "no-store" }); if (!response.ok) throw new Error("Menu could not be loaded."); const result = await response.json(); if (alive) { setData(result); setError(""); } } catch { if (alive) setError("Menu is temporarily unavailable."); } }; load(); const timer = setInterval(load, 15000); return () => { alive = false; clearInterval(timer); }; }, [debounced]);
 return <section className="live-menu"><label htmlFor="dish-search">Search dishes</label><input id="dish-search" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Try doro, coffee, sides…"/><p className="muted" aria-live="polite">{error || (data ? `${data.dishes.length} dishes · Updated ${new Date(data.updatedAt).toLocaleTimeString()}` : "Loading menu…")}</p>{data && <div className="live-results">{data.dishes.map(d => <article className="dish" key={d.id}><div><h3>{d.name}</h3><p>{d.category}</p></div><strong>{d.price} ETB</strong></article>)}</div>}</section>;
}
