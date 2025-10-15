import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import { supabase } from '../supabaseClient';

type Props = NativeStackScreenProps<RootStackParamList, 'Booking'>;

export default function BookingScreen({ route }: Props) {
  const { listingId } = route.params;
  const [start, setStart] = useState(route.params.start || '');
  const [end, setEnd] = useState(route.params.end || '');
  const [guests, setGuests] = useState(String(route.params.guests || 2));

  const createBooking = async () => {
    const { data, error } = await supabase.functions.invoke('create-booking', {
      body: { listing_id: listingId, start, end, guests: Number(guests) }
    });
    if (error) {
      Alert.alert('Erreur', error.message);
    } else {
      Alert.alert('OK', 'Réservation créée (simulation).');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Réserver</Text>
      <TextInput placeholder="Arrivée (YYYY-MM-DD)" value={start} onChangeText={setStart} style={styles.input} />
      <TextInput placeholder="Départ (YYYY-MM-DD)" value={end} onChangeText={setEnd} style={styles.input} />
      <TextInput placeholder="Voyageurs" value={guests} onChangeText={setGuests} keyboardType="number-pad" style={styles.input} />
      <Button title="Confirmer" onPress={createBooking} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  title: { fontSize: 22, fontWeight: '700' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12 }
});
