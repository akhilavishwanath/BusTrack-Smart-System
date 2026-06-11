import { Text, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

export default function RouteMap({ selected, currentStop, region }) {
  return (
    <MapView style={styles.map} region={region}>
      {selected?.stops?.length ? (
        <>
          <Polyline coordinates={selected.stops} strokeColor="#14b8a6" strokeWidth={5} />
          <Marker coordinate={selected.stops[0]} title="Start" description={selected.stops[0].stop} pinColor="green" />
          <Marker
            coordinate={selected.stops[selected.stops.length - 1]}
            title="Destination"
            description={selected.stops[selected.stops.length - 1].stop}
            pinColor="red"
          />
          {currentStop ? (
            <Marker coordinate={currentStop} title={`Bus ${selected.bus.number}`} description={`Near ${currentStop.stop}`}>
              <Text style={styles.busMarker}>Bus</Text>
            </Marker>
          ) : null}
        </>
      ) : null}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
  busMarker: { backgroundColor: '#0f766e', color: 'white', padding: 5, borderRadius: 6, fontWeight: '800' },
});
