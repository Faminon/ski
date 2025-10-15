import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen';
import ResultsScreen from './screens/ResultsScreen';
import ListingScreen from './screens/ListingScreen';
import BookingScreen from './screens/BookingScreen';

export type RootStackParamList = {
  Home: undefined;
  Results: { resort?: string; start?: string; end?: string; guests?: number };
  Listing: { listingId: string };
  Booking: { listingId: string; start: string; end: string; guests: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Ski P2P' }} />
        <Stack.Screen name="Results" component={ResultsScreen} options={{ title: 'Résultats' }} />
        <Stack.Screen name="Listing" component={ListingScreen} options={{ title: 'Annonce' }} />
        <Stack.Screen name="Booking" component={BookingScreen} options={{ title: 'Réservation' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
