import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { getDashboard } from '../services/api';
import Screen from '../components/Screen';
import { useLanguage } from '../i18n/LanguageContext';

export default function HomeScreen({ navigation }) {
  const { t } = useLanguage();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getDashboard()
      .then(setDashboard)
      .catch(() => setError('Start backend on port 3000 to load live Hyderabad route data.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Screen>
        <ActivityIndicator color="#2dd4bf" size="large" style={styles.loader} />
      </Screen>
    );
  }

  return (
    <Screen>
      <Text style={styles.kicker}>BusTrack Smart</Text>
      <Text style={styles.title}>{t('dashboardTitle')}</Text>
      <Text style={styles.subtitle}>{t('dashboardSubtitle')}</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.statsGrid}>
        <Stat label={t('routes')} value={dashboard?.totalRoutes || 0} />
        <Stat label={t('activeBuses')} value={dashboard?.activeBuses || 0} />
        <Stat label={t('avgEta')} value={`${dashboard?.averageEtaMinutes || 0}m`} />
      </View>

      <Text style={styles.sectionTitle}>{t('featuredRoutes')}</Text>
      {(dashboard?.featuredRoutes || []).map((route) => (
        <Pressable
          key={`${route.number}-${route.routeId}`}
          style={styles.routeCard}
          onPress={() => navigation.navigate('Tracking', { busNumber: route.number })}
        >
          <View>
            <Text style={styles.routeNumber}>{route.number}</Text>
            <Text style={styles.routeText}>{route.originDestination}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{route.crowd}</Text>
          </View>
        </Pressable>
      ))}
    </Screen>
  );
}

function Stat({ label, value }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: { marginTop: 80 },
  kicker: { color: '#2dd4bf', fontSize: 14, fontWeight: '700', textTransform: 'uppercase' },
  title: { color: '#f8fafc', fontSize: 32, fontWeight: '800', marginTop: 8 },
  subtitle: { color: '#9ca3af', fontSize: 15, marginTop: 8, lineHeight: 22 },
  error: { color: '#fecaca', backgroundColor: '#7f1d1d', padding: 12, borderRadius: 8, marginTop: 16 },
  statsGrid: { flexDirection: 'row', gap: 10, marginTop: 22 },
  stat: { flex: 1, backgroundColor: '#101c2e', borderRadius: 8, padding: 14 },
  statValue: { color: '#f8fafc', fontSize: 22, fontWeight: '800' },
  statLabel: { color: '#94a3b8', fontSize: 12, marginTop: 4 },
  sectionTitle: { color: '#f8fafc', fontSize: 20, fontWeight: '800', marginTop: 26, marginBottom: 10 },
  routeCard: {
    backgroundColor: '#101c2e',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  routeNumber: { color: '#f8fafc', fontSize: 20, fontWeight: '800' },
  routeText: { color: '#9ca3af', marginTop: 4, maxWidth: 230 },
  badge: { backgroundColor: '#123b36', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6, alignSelf: 'flex-start' },
  badgeText: { color: '#5eead4', fontWeight: '800', fontSize: 12 },
});
