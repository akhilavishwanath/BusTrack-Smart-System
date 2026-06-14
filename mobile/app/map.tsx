/* eslint-disable */

import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { getFullRoute } from '../services/api';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      iframe: any;
    }
  }
}

export default function MapScreen() {
  const { bus } = useLocalSearchParams();

  const [html, setHtml] = useState('');

  const [stops, setStops] = useState<any[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  // LOAD ROUTE

  useEffect(() => {
    if (!bus) return;

    getFullRoute(bus as string)
      .then((data) => {
        try {
          const cleanStops = (data.stops || []).filter((s: any) => {
            const lat = Number(s.latitude);

            const lng = Number(s.longitude);

            return (
              !Number.isNaN(lat) &&
              !Number.isNaN(lng) &&
              lat !== 0 &&
              lng !== 0 &&
              lat > 10 &&
              lng > 10
            );
          });

          setStops(cleanStops);

          // INVALID ROUTE

          if (cleanStops.length < 2) {
            setHtml('');

            return;
          }

          const polyline = JSON.stringify(
            cleanStops.map((s: any) => [
              Number(s.latitude),
              Number(s.longitude),
            ])
          );

          const stopNames = JSON.stringify(
            cleanStops.map((s: any) => String(s.stop || 'Stop'))
          );

          const generatedHtml = `
          <!DOCTYPE html>

          <html>

          <head>

            <meta charset="utf-8" />

            <link
              rel="stylesheet"
              href="https://unpkg.com/leaflet/dist/leaflet.css"
            />

            <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

            <style>

              html,
              body,
              #map {

                height: 100%;
                margin: 0;

              }

            </style>

          </head>

          <body>

            <div id="map"></div>

            <script>

              try {

                const stops =
                  ${polyline};

                const stopNames =
                  ${stopNames};

                const map =
                  L.map('map')
                    .setView(
                      stops[0],
                      12
                    );

                L.tileLayer(
                  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                  {
                    attribution:
                      'OpenStreetMap'
                  }
                ).addTo(map);

                // ROUTE LINE

                L.polyline(
                  stops,
                  {
                    color: '#22c55e',
                    weight: 6
                  }
                ).addTo(map);

                // STOPS

                stops.forEach(
                  (stop, index) => {

                    L.circleMarker(
                      stop,
                      {
                        radius: 5,
                        color: '#2563eb',
                        fillColor: '#2563eb',
                        fillOpacity: 1
                      }
                    )
                    .addTo(map)
                    .bindPopup(
                      stopNames[index]
                    );

                  }
                );

                // BUS ICON

                const busIcon =
                  L.icon({

                    iconUrl:
                      'https://cdn-icons-png.flaticon.com/512/3448/3448339.png',

                    iconSize:
                      [40, 40]

                  });

                let currentIndex = 0;

                const marker =
                  L.marker(
                    stops[currentIndex],
                    {
                      icon: busIcon
                    }
                  ).addTo(map);

                function moveBus() {

                  currentIndex++;

                  if (
                    currentIndex >=
                    stops.length
                  ) {

                    currentIndex = 0;

                  }

                  marker.setLatLng(
                    stops[currentIndex]
                  );

                }

                setInterval(
                  moveBus,
                  3000
                );

              } catch (e) {

                document.body.innerHTML =
                  '<h2 style="color:red;padding:20px;">Invalid Route Data</h2>';

              }

            </script>

          </body>

          </html>
          `;

          setHtml(generatedHtml);
        } catch (err) {
          console.log('MAP ERROR', err);

          setHtml('');
        }
      })

      .catch((err) => {
        console.log('FETCH ERROR', err);
      });
  }, [bus]);

  // LIVE STOP UPDATE

  useEffect(() => {
    if (!stops.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev + 1 >= stops.length) {
          return 0;
        }

        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [stops]);

  const currentStop = stops[currentIndex];

  const nextStop = stops[(currentIndex + 1) % stops.length];

  // CROWD

  const crowds = ['Low', 'Medium', 'High'];

  const crowd = crowds[currentIndex % crowds.length];

  // TRAFFIC

  const trafficList = ['Low', 'Moderate', 'High'];

  const traffic = trafficList[currentIndex % trafficList.length];

  // ETA

  const eta = 5 + currentIndex * 2;

  return (
    <View style={styles.container}>
      {/* BACK BUTTON */}

      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </Pressable>

      {/* HEADER */}

      <View style={styles.headerBox}>
        <Text style={styles.busTitle}>🚌 {bus}</Text>

        <Text style={styles.routeName}>
          {stops.length > 0
            ? `${stops[0].stop.toUpperCase()} TO ${stops[stops.length - 1].stop.toUpperCase()} Live Tracking`
            : 'LIVE TRACKING'}
        </Text>
      </View>

      {/* MAP */}

      <View style={styles.mapContainer}>
        {html ? (
          Platform.OS === 'web' ? (
            <iframe
              srcDoc={html}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              title="Bus Map"
            />
          ) : (
            <Text style={styles.loading}>Map available on web only</Text>
          )
        ) : (
          <Text style={styles.loading}>Invalid Route Data</Text>
        )}
      </View>

      {/* INFO BOX */}

      <View style={styles.infoBox}>
        <Text style={styles.label}>📍 Current Stop</Text>

        <Text style={styles.value}>{currentStop?.stop || 'Loading'}</Text>

        <Text style={styles.label}>➡ Next Stop</Text>

        <Text style={styles.value}>{nextStop?.stop || 'Loading'}</Text>

        <Text style={styles.label}>👥 Crowd Prediction</Text>

        <Text style={styles.value}>{crowd}</Text>

        <Text style={styles.label}>🚦 Traffic Status</Text>

        <Text style={styles.value}>{traffic}</Text>

        <Text style={styles.eta}>ETA: {eta} mins</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },

  backButton: {
    marginTop: 45,
    marginLeft: 20,
  },

  backText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  headerBox: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },

  busTitle: {
    color: 'white',
    fontSize: 34,
    fontWeight: 'bold',
  },

  routeName: {
    color: '#22c55e',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },

  mapContainer: {
    height: 320,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 25,
    overflow: 'hidden',
  },

  infoBox: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 15,
    backgroundColor: '#0f172a',
    borderRadius: 25,
    padding: 16,
    marginBottom: 20,
  },

  label: {
    color: '#94a3b8',
    fontSize: 14,
    marginTop: 6,
  },

  value: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  eta: {
    color: '#38bdf8',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
  },

  loading: {
    color: 'white',
    padding: 20,
    textAlign: 'center',
    marginTop: 120,
    fontSize: 18,
  },
});
