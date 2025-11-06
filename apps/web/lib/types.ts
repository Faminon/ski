export type Listing = {
  id: string;
  title: string;
  station: string;
  description: string;
  capacity: number;
  pricePerNightCents: number;
  imageUrl: string;
  amenities: string[];
};