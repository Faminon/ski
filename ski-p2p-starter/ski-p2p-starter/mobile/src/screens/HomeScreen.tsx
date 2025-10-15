import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [resort, setResort] = useState('');
  const [start, setStart] = useState(dayjs().add(7, 'day').format('YYYY-MM-DD'));
  const [end, setEnd] = useState(dayjs().add(14, 'day').format('YYYY-MM-DD'));
  const [guests, setGuests] = useState('2');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Louez un chalet entre particuliers</Text>
      <TextInput placeholder="Station (ex: Chamonix)" value={resort} onChangeText={setResort} style={styles.input} />
      <TextInput placeholder="Arrivée (YYYY-MM-DD)" value={start} onChangeText={setStart} style={styles.input} />
      <TextInput placeholder="Départ (YYYY-MM-DD)" value={end} onChangeText={setEnd} style={styles.input} />
      <TextInput placeholder="Voyageurs" value={guests} onChangeText={setGuests} keyboardType="number-pad" style={styles.input} />
      <Button title="Rechercher" onPress={() => navigation.navigate('Results', { resort, start, end, guests: Number(guests) })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12 }
});
