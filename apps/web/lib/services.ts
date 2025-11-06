import listings from "@/data/listings.json";
import type { Listing } from "./types";

export async function listListings(): Promise<Listing[]> {
  await new Promise(r => setTimeout(r, 80));
  return listings as Listing[];
}

export async function getListing(id: string): Promise<Listing | undefined> {
  const all = await listListings();
  return all.find(x => x.id === id);
}