import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';

export default function HomeScreen() {
  const [dashboard] = useState({
    activeBuses: 128,
    totalRoutes: 524,
    averageEtaMinutes: 23,
    featuredRoutes: [
      {
        number: '1C',
        originDestination: 'CBS TO SECUNDERABAD',
        crowd: 'High',
        etaMinutes: 8,
      },
      {
        number: '1D',
        originDestination: 'CHILKALGUDA TO DILSUKH NAGAR',
        crowd: 'Medium',
        etaMinutes: 11,
      },
    ],
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🚌 BusTrack Smart</Text>

      <Text style={styles.subtitle}>
        Smart Hyderabad Bus Tracking System
      </Text>

      <View style={styles.statsBox}>
        <Text style={styles.info}>
          🚍 Active Buses: {dashboard.activeBuses}
        </Text>

        <Text style={styles.info}>
          🛣 Total Routes: {dashboard.totalRoutes}
        </Text>

        <Text style={styles.info}>
          ⏱ Avg ETA: {dashboard.averageEtaMinutes} mins
        </Text>
      </View>

      <Pressable style={styles.card}>
        <Text style={styles.cardText}>
          📍 Live Bus Tracking
        </Text>
      </Pressable>

      <Pressable style={styles.card}>
        <Text style={styles.cardText}>
          🤖 AI Chatbot
        </Text>
      </Pressable>

      <Pressable style={styles.card}>
        <Text style={styles.cardText}>
          📊 Crowd Prediction
        </Text>
      </Pressable>

      <Pressable style={styles.card}>
        <Text style={styles.cardText}>
          🗺 Route Navigation
        </Text>
      </Pressable>

      <Text style={styles.sectionTitle}>
        Featured Routes
      </Text>

      {dashboard.featuredRoutes.map((route, index) => (
        <View key={index} style={styles.routeCard}>
          <Text style={styles.routeNumber}>
            {route.number}
          </Text>

          <Text style={styles.routeText}>
            {route.originDestination}
          </Text>

          <Text style={styles.routeInfo}>
            Crowd: {route.crowd}
          </Text>

          <Text style={styles.routeInfo}>
            ETA: {route.etaMinutes} mins
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    padding: 20,
  },

  title: {
    color: 'white',
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 10,
  },

  subtitle: {
    color: '#94a3b8',
    fontSize: 16,
    marginBottom: 20,
  },

  statsBox: {
    backgroundColor: '#0f172a',
    padding: 18,
    borderRadius: 20,
    marginBottom: 25,
  },

  info: {
    color: '#38bdf8',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
  },

  card: {
    backgroundColor: '#0f172a',
    padding: 20,
    borderRadius: 18,
    marginBottom: 16,
  },

  cardText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },

  sectionTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 16,
  },

  routeCard: {
    backgroundColor: '#111827',
    padding: 18,
    borderRadius: 18,
    marginBottom: 14,
  },

  routeNumber: {
    color: '#22c55e',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  routeText: {
    color: 'white',
    fontSize: 15,
    marginBottom: 8,
  },

  routeInfo: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 4,
  },
});