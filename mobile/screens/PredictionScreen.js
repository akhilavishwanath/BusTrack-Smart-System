import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';
import Screen from '../components/Screen';
import { getPredictions } from '../services/api';
import { useLanguage } from '../i18n/LanguageContext';

export default function PredictionScreen() {
  const { t } = useLanguage();
  const [busNumber, setBusNumber] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
      getPredictions(busNumber)
        .then(setPredictions)
        .catch(() => setPredictions([]))
        .finally(() => setLoading(false));
    }, 350);

    return () => clearTimeout(timer);
  }, [busNumber]);

  return (
    <Screen>
      <Text style={styles.title}>{t('crowdPrediction')}</Text>
      <Text style={styles.subtitle}>Predictions are calculated from route, ETA, and repeatable crowd scoring in the backend.</Text>
      <TextInput
        placeholder={t('filterBus')}
        placeholderTextColor="#94a3b8"
        value={busNumber}
        onChangeText={setBusNumber}
        style={styles.input}
        autoCapitalize="characters"
      />
      {loading ? <ActivityIndicator color="#2dd4bf" style={styles.loader} /> : null}
      {predictions.map((item) => (
        <View key={`${item.number}-${item.routeId}`} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.bus}>{item.number}</Text>
            <Text style={styles.crowd}>{item.crowd}</Text>
          </View>
          <Text style={styles.route}>{item.originDestination}</Text>
          <Text style={styles.meta}>Occupancy {item.occupancyPercent}% • ETA {item.etaMinutes} min</Text>
          <Text style={styles.recommendation}>{item.recommendation}</Text>
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: '#f8fafc', fontSize: 30, fontWeight: '800' },
  subtitle: { color: '#9ca3af', marginTop: 8, lineHeight: 21 },
  input: { backgroundColor: '#101c2e', color: '#f8fafc', borderRadius: 8, padding: 14, fontSize: 16, marginTop: 18 },
  loader: { marginTop: 18 },
  card: { backgroundColor: '#101c2e', borderRadius: 8, padding: 14, marginTop: 12 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bus: { color: '#f8fafc', fontSize: 22, fontWeight: '800' },
  crowd: { color: '#5eead4', fontWeight: '800' },
  route: { color: '#9ca3af', marginTop: 6 },
  meta: { color: '#cbd5e1', marginTop: 10 },
  recommendation: { color: '#f8fafc', marginTop: 8, fontWeight: '700' },
});
