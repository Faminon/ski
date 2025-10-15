import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import { supabase } from '../supabaseClient';

type Props = NativeStackScreenProps<RootStackParamList, 'Listing'>;

type FullListing = {
  id: string;
  title: string;
  description: string | null;
  nightly_price_eur: number;
  max_guests: number;
  resort_slug: string;
};

export default function ListingScreen({ route, navigation }: Props) {
  const [listing, setListing] = useState<FullListing | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase.from('listings_public').select('*').eq('id', route.params.listingId).single();
      if (error) console.error(error);
      setListing(data);
    };
    load();
  }, [route.params.listingId]);

  if (!listing) return <ActivityIndicator style={{ marginTop: 40 }} />;

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: '700' }}>{listing.title}</Text>
      <Text>{listing.description ?? 'Aucune description.'}</Text>
      <Text>Capacité: {listing.max_guests} voyageurs</Text>
      <Text>Station: {listing.resort_slug.replaceAll('-', ' ')}</Text>
      <Text style={{ fontWeight: '600' }}>{listing.nightly_price_eur}€ / nuit</Text>
      <Button title="Réserver" onPress={() => navigation.navigate('Booking', { listingId: listing.id, start: '', end: '', guests: 2 })} />
    </ScrollView>
  );
}
