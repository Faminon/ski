import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import { supabase } from '../supabaseClient';

type Props = NativeStackScreenProps<RootStackParamList, 'Results'>;

type Listing = {
  id: string;
  title: string;
  nightly_price_eur: number;
  resort_slug: string;
  thumbnail_url: string | null;
};

export default function ResultsScreen({ route, navigation }: Props) {
  const [data, setData] = useState<Listing[]|null>(null);

  useEffect(() => {
    const load = async () => {
      const { resort } = route.params;
      let query = supabase.from('listings_public').select('id,title,nightly_price_eur,resort_slug,thumbnail_url').limit(50);
      if (resort && resort.trim().length > 0) query = query.eq('resort_slug', resort.toLowerCase().replaceAll(' ', '-'));
      const { data, error } = await query;
      if (error) console.error(error);
      setData(data ?? []);
    };
    load();
  }, [route.params]);

  if (!data) return <ActivityIndicator style={{ marginTop: 40 }} />;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16, gap: 12 }}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Listing', { listingId: item.id })} style={{ padding: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 12 }}>
          <Text style={{ fontWeight: '600' }}>{item.title}</Text>
          <Text>{item.resort_slug.replaceAll('-', ' ')}</Text>
          <Text>{item.nightly_price_eur}€ / nuit</Text>
        </TouchableOpacity>
      )}
      ListEmptyComponent={<Text style={{ padding: 16 }}>Aucune annonce trouvée.</Text>}
    />
  );
}
