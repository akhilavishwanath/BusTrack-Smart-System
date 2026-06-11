import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { getFullRoute, searchRoutes } from '../services/api';
import { useLanguage } from '../i18n/LanguageContext';
import RouteMap from '../components/RouteMap';

export default function TrackingScreen({ route }) {
  const { t } = useLanguage();
  const initialBusNumber = route.params?.busNumber || '1C';
  const [search, setSearch] = useState(initialBusNumber);
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setSearch(initialBusNumber);
    loadRoute(initialBusNumber);
  }, [initialBusNumber]);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchRoutes(search)
        .then(setResults)
        .catch(() => setResults([]));
    }, 350);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (!selected?.stops?.length) return undefined;

    const interval = setInterval(() => {
      setCurrentIndex((index) => (index + 1) % selected.stops.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [selected]);

  const currentStop = selected?.stops?.[currentIndex];
  const nextStop = selected?.stops?.[(currentIndex + 1) % (selected?.stops?.length || 1)];

  const region = useMemo(() => {
    const first = selected?.stops?.[0];

    return {
      latitude: first?.latitude || 17.385,
      longitude: first?.longitude || 78.4867,
      latitudeDelta: 0.18,
      longitudeDelta: 0.18,
    };
  }, [selected]);

  function loadRoute(busNumber) {
    setLoading(true);
    setError('');
    getFullRoute(busNumber)
      .then((data) => {
        setSelected(data);
        setCurrentIndex(0);
      })
      .catch(() => setError('Unable to load this route. Check backend is running and try another bus number.'))
      .finally(() => setLoading(false));
  }

  return (
    <View style={styles.container}>
      <RouteMap selected={selected} currentStop={currentStop} region={region} />

      <View style={styles.searchPanel}>
        <TextInput
          placeholder={t('searchBus')}
          placeholderTextColor="#94a3b8"
          value={search}
          onChangeText={setSearch}
          style={styles.input}
          autoCapitalize="characters"
        />
        {results.slice(0, 4).map((item) => (
          <Pressable key={`${item.number}-${item.routeId}`} style={styles.result} onPress={() => loadRoute(item.number)}>
            <Text style={styles.resultNumber}>{item.number}</Text>
            <Text style={styles.resultText}>{item.originDestination}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.infoCard}>
        {loading ? <ActivityIndicator color="#2dd4bf" /> : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {selected?.bus && currentStop ? (
          <>
            <Text style={styles.busTitle}>Bus {selected.bus.number}</Text>
            <Text style={styles.routeText}>{selected.bus.originDestination}</Text>
            <View style={styles.row}>
              <Info label="ETA" value={`${currentStop.etaMinutes} min`} />
              <Info label={t('crowd')} value={currentStop.crowd} />
              <Info label={t('next')} value={nextStop?.stop || '-'} />
            </View>
            <Text style={styles.stopTitle}>{t('routeProgress')}</Text>
            {selected.stops.map((stop, index) => (
              <Text key={`${stop.stop}-${index}`} style={[styles.stop, index === currentIndex && styles.activeStop]}>
                {index <= currentIndex ? '•' : '○'} {stop.stop}
              </Text>
            ))}
          </>
        ) : null}
      </View>
    </View>
  );
}

function Info({ label, value }) {
  return (
    <View style={styles.info}>
      <Text style={styles.infoValue}>{value}</Text>
      <Text style={styles.infoLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#07111f' },
  searchPanel: { position: 'absolute', top: 48, left: 16, right: 16, gap: 8 },
  input: { backgroundColor: '#101c2e', color: '#f8fafc', borderRadius: 8, padding: 14, fontSize: 16 },
  result: { backgroundColor: '#17233a', borderRadius: 8, padding: 10 },
  resultNumber: { color: '#f8fafc', fontWeight: '800' },
  resultText: { color: '#9ca3af', marginTop: 2 },
  infoCard: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 88,
    maxHeight: 330,
    backgroundColor: '#101c2e',
    borderRadius: 8,
    padding: 16,
  },
  error: { color: '#fecaca' },
  busTitle: { color: '#f8fafc', fontSize: 24, fontWeight: '800' },
  routeText: { color: '#9ca3af', marginTop: 4 },
  row: { flexDirection: 'row', gap: 8, marginTop: 14 },
  info: { flex: 1, backgroundColor: '#07111f', borderRadius: 8, padding: 10 },
  infoValue: { color: '#5eead4', fontWeight: '800' },
  infoLabel: { color: '#94a3b8', fontSize: 12, marginTop: 3 },
  stopTitle: { color: '#f8fafc', fontWeight: '800', marginTop: 14 },
  stop: { color: '#94a3b8', marginTop: 5 },
  activeStop: { color: '#5eead4', fontWeight: '800' },
});
