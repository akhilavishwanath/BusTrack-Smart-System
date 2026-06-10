import React, { useState, useEffect } from 'react';

import MapView, {
  Marker,
  Polyline,
} from 'react-native-maps';

import {
  View,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';

import { buses } from '../services/busData';

export default function TrackingScreen() {

  const [search, setSearch] = useState('');

  const [selectedBus, setSelectedBus] =
    useState(buses[0]);

  const [currentIndex, setCurrentIndex] =
    useState(
      buses[0].currentStopIndex
    );

  // LIVE BUS POSITION

  const [busPosition, setBusPosition] =
    useState({
      latitude:
        buses[0].route[0].latitude,

      longitude:
        buses[0].route[0].longitude,
    });

  // SEARCH BUS

  useEffect(() => {

    if (search.trim() === '') {

      setSelectedBus(buses[0]);

      setCurrentIndex(
        buses[0].currentStopIndex
      );

      setBusPosition({
        latitude:
          buses[0].route[0].latitude,

        longitude:
          buses[0].route[0].longitude,
      });

    } else {

      const foundBus = buses.find((bus) =>
        bus.number
          .toLowerCase()
          .includes(search.toLowerCase())
      );

      if (foundBus) {

        setSelectedBus(foundBus);

        setCurrentIndex(
          foundBus.currentStopIndex
        );

        setBusPosition({
          latitude:
            foundBus.route[0].latitude,

          longitude:
            foundBus.route[0].longitude,
        });

      }

    }

  }, [search]);

  // REAL LIVE ROUTE MOVEMENT

  useEffect(() => {

    let pointIndex =
      selectedBus.currentStopIndex;

    const routePoints =
      selectedBus.route;

    const interval = setInterval(() => {

      pointIndex++;

      // LOOP ROUTE

      if (
        pointIndex >=
        routePoints.length
      ) {
        pointIndex = 0;
      }

      const point =
        routePoints[pointIndex];

      // MOVE EXACTLY ON ROUTE

      setBusPosition({
        latitude: point.latitude,
        longitude: point.longitude,
      });

      setCurrentIndex(pointIndex);

    }, 2000);

    return () => clearInterval(interval);

  }, [selectedBus]);

  // CURRENT STOP

  const currentStop =
    selectedBus.route[currentIndex];

  // NEXT STOP

  const nextStop =
    selectedBus.route[
      (currentIndex + 1)
      % selectedBus.route.length
    ];

  // DYNAMIC ETA

  const remainingStops =
    selectedBus.route.length
    - currentIndex
    - 1;

  let eta =
    Math.max(
      1,
      remainingStops * 2
    );

  // CROWD EFFECT

  if (
    currentStop.crowd === 'High'
  ) {
    eta += 2;
  }

  if (
    currentStop.crowd === 'Very High'
  ) {
    eta += 4;
  }

  return (
    <View style={{ flex: 1 }}>

      {/* SEARCH */}

      <View
        style={{
          position: 'absolute',
          top: 50,
          left: 20,
          right: 20,
          zIndex: 10,
        }}
      >

        <TextInput
          placeholder="Search Bus Number..."
          placeholderTextColor="#94a3b8"

          value={search}

          onChangeText={setSearch}

          style={{
            backgroundColor: '#111827',
            color: 'white',
            padding: 15,
            borderRadius: 18,
            fontSize: 18,
          }}
        />

      </View>

      {/* MAP */}

      <MapView
        style={{ flex: 1 }}

        initialRegion={{
          latitude:
            selectedBus.route[0].latitude,

          longitude:
            selectedBus.route[0].longitude,

          latitudeDelta: 0.15,
          longitudeDelta: 0.15,
        }}
      >

        {/* ROUTE LINE */}
        <Polyline
          coordinates={selectedBus.route}
          strokeColor={selectedBus.color}
          strokeWidth={5}
        />

        {/* START */}

        <Marker
          coordinate={{
            latitude:
              selectedBus.route[0].latitude,

            longitude:
              selectedBus.route[0].longitude,
          }}

          title="Start"

          description={
            selectedBus.route[0].stop
          }

          pinColor="green"
        />

        {/* DESTINATION */}

        <Marker
          coordinate={{
            latitude:
              selectedBus.route[
                selectedBus.route.length - 1
              ].latitude,

            longitude:
              selectedBus.route[
                selectedBus.route.length - 1
              ].longitude,
          }}

          title="Destination"

          description={
            selectedBus.route[
              selectedBus.route.length - 1
            ].stop
          }

          pinColor="red"
        />

               {/* MOVING BUS */}

        <Marker
          coordinate={{
            latitude: busPosition.latitude,
            longitude: busPosition.longitude,
          }}

          title={`Bus ${selectedBus.number}`}
          description={`Near ${currentStop.stop}`}

          anchor={{ x: 0.5, y: 0.5 }}
        >
          <Text
            style={{
              fontSize: 20,
            }}
          >
            🚌
          </Text>
        </Marker>

      </MapView>

      {/* INFO CARD */}

      <ScrollView
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          maxHeight: 320,

          backgroundColor: '#111827',

          borderRadius: 20,
          padding: 20,
        }}
      >

        <Text
          style={{
            color: 'white',
            fontSize: 30,
            fontWeight: 'bold',
          }}
        >
          🚍 Bus {selectedBus.number}
        </Text>

        <Text
          style={{
            color: '#22c55e',
            marginTop: 10,
            fontSize: 18,
          }}
        >
          ETA: {eta} mins
        </Text>

        <Text
          style={{
            color: 'white',
            marginTop: 10,
            fontSize: 17,
          }}
        >
          📍 Current Stop:
          {' '}
          {currentStop.stop}
        </Text>

        <Text
          style={{
            color: '#94a3b8',
            marginTop: 8,
            fontSize: 16,
          }}
        >
          ➡️ Next Stop:
          {' '}
          {nextStop.stop}
        </Text>

        <Text
          style={{
            color: '#facc15',
            marginTop: 8,
            fontSize: 17,
          }}
        >
          👥 Crowd:
          {' '}
          {currentStop.crowd}
        </Text>

        {/* ROUTE PROGRESS */}

        <Text
          style={{
            color: 'white',
            marginTop: 15,
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          Route Progress
        </Text>

        {selectedBus.route.map((stop, index) => {

          let color = '#6b7280';

          if (index < currentIndex) {
            color = '#22c55e';
          }

          else if (index === currentIndex) {
            color = '#3b82f6';
          }

          return (

            <Text
              key={index}
              style={{
                color,
                marginTop: 8,
                fontSize: 16,
              }}
            >
              {index < currentIndex
                ? '✅'
                : index === currentIndex
                ? '🚍'
                : '⏳'}

              {' '}
              {stop.stop}
            </Text>

          );

        })}

      </ScrollView>

    </View>
  );
}