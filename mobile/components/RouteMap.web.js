import { StyleSheet, Text, View } from 'react-native';

export default function RouteMap() {
  return (
    <View style={styles.webMap}>
      <Text style={styles.webMapTitle}>Live map opens in Expo Go</Text>
      <Text style={styles.webMapText}>
        Web preview shows route data. Use Expo Go on Android/iPhone for the native moving map.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  webMap: { flex: 1, backgroundColor: '#07111f', alignItems: 'center', justifyContent: 'center', padding: 24 },
  webMapTitle: { color: '#f8fafc', fontSize: 24, fontWeight: '800', textAlign: 'center' },
  webMapText: { color: '#9ca3af', marginTop: 10, lineHeight: 22, textAlign: 'center' },
});
