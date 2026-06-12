import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';

import {
  getRoutes,
  getFullRoute,
} from '../../services/api';

import {
  router,
} from 'expo-router';

export default function TrackingScreen() {

  const [routes, setRoutes] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState('');

  // LOAD VALID ROUTES

  useEffect(() => {

    const loadRoutes = async () => {

      try {

        const data =
          await getRoutes();

        const validRoutes = [];

        for (const route of data) {

          try {

            const routeData =
              await getFullRoute(
                route.number || route.route
              );

            const validStops =
              (routeData.stops || []).filter(

                (s: any) => {

                  const lat =
                    Number(s.latitude);

                  const lng =
                    Number(s.longitude);

                  return (

                    !isNaN(lat) &&
                    !isNaN(lng) &&
                    lat !== 0 &&
                    lng !== 0

                  );

                }

              );

            // ONLY KEEP VALID ROUTES

            if (
              validStops.length >= 2
            ) {

              validRoutes.push(route);

            }

          } catch (err) {

            console.log(
              'INVALID ROUTE',
              route.number
            );

          }

        }

        setRoutes(validRoutes);

      } catch (error) {

        console.log(error);

      }

    };

    loadRoutes();

  }, []);

  // SEARCH FILTER

  const filteredRoutes =
    routes.filter(
      (route: any) => {

        const routeName =
          route.route ||
          route.number ||
          '';

        const destination =
          route.origin_destination ||
          route.originDestination ||
          '';

        return (

          routeName
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          destination
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )

        );

      }
    );

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        📍 Live Bus Tracking
      </Text>

      <TextInput
        placeholder="Search route or place..."
        placeholderTextColor="#94a3b8"
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      {
        filteredRoutes.map(
          (
            route: any,
            index: number
          ) => (

            <Pressable
              key={index}
              style={styles.card}

              onPress={() =>

                router.push({

                  pathname: '/map',

                  params: {
                    bus:
                      route.route ||
                      route.number,
                  },

                })

              }
            >

              <Text style={styles.busNumber}>
                🚌 {
                  route.route ||
                  route.number
                }
              </Text>

              <Text style={styles.route}>
                {
                  route.origin_destination ||
                  route.originDestination
                }
              </Text>

            </Pressable>

          )
        )
      }

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
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20,
  },

  search: {
    backgroundColor: '#0f172a',
    color: 'white',
    padding: 14,
    borderRadius: 14,
    marginBottom: 20,
    fontSize: 16,
  },

  card: {
    backgroundColor: '#0f172a',
    padding: 18,
    borderRadius: 18,
    marginBottom: 16,
  },

  busNumber: {
    color: '#22c55e',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  route: {
    color: 'white',
    fontSize: 16,
  },

});