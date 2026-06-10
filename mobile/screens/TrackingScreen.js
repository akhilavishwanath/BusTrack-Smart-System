<<<<<<< HEAD
 import React, {
  useState,
  useEffect,
} from 'react';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> 6ab285dc7898e52dce96354c75e0bc66a90a4f40

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

<<<<<<< HEAD
import axios from 'axios';

export default function TrackingScreen() {

  const [search, setSearch] =
    useState('127K');

  const [route, setRoute] =
    useState([]);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [busPosition, setBusPosition] =
    useState(null);



  // FETCH ROUTE FROM BACKEND

  useEffect(() => {

    if (!search.trim()) {
      return;
    }

    const fetchRoute = async () => {

      try {

        const response =
          await axios.get(
            `http://192.168.31.160:3000/fullroute/${search}`
          );

        if (!response.data.length) {
          return;
        }

        setRoute(response.data);

        setCurrentIndex(0);

        setBusPosition({

          latitude:
            response.data[0].latitude,

          longitude:
            response.data[0].longitude,

        });

      } catch (error) {

        console.log(error);

      }

    };

    fetchRoute();

  }, [search]);



  // LIVE BUS MOVEMENT

  useEffect(() => {

    if (route.length === 0) {
      return;
    }

    let index = 0;

    const interval = setInterval(() => {

      index++;

      if (index >= route.length) {

        index = 0;

      }

      setCurrentIndex(index);

      setBusPosition({

        latitude:
          route[index].latitude,

        longitude:
          route[index].longitude,

      });

    }, 2500);

    return () => clearInterval(interval);

  }, [route]);



  // LOADING SCREEN

  if (
    route.length === 0 ||
    !busPosition
  ) {

    return (

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}
      >

        <Text
          style={{
            color: 'white',
            fontSize: 22,
          }}
        >
          Loading Bus Route...
        </Text>

      </View>

    );

  }



  const currentStop =
    route[currentIndex];



  const nextStop =
    route[
      (currentIndex + 1)
      % route.length
    ];



  const remainingStops =
    route.length
    - currentIndex
    - 1;



  const eta =
=======
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
>>>>>>> 6ab285dc7898e52dce96354c75e0bc66a90a4f40
    Math.max(
      1,
      remainingStops * 2
    );

<<<<<<< HEAD


  return (

=======
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
>>>>>>> 6ab285dc7898e52dce96354c75e0bc66a90a4f40
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
<<<<<<< HEAD

          placeholder="Search Bus Number..."

=======
          placeholder="Search Bus Number..."
>>>>>>> 6ab285dc7898e52dce96354c75e0bc66a90a4f40
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

<<<<<<< HEAD


=======
>>>>>>> 6ab285dc7898e52dce96354c75e0bc66a90a4f40
      {/* MAP */}

      <MapView
        style={{ flex: 1 }}

<<<<<<< HEAD
        showsTraffic={true}

        region={{

          latitude:
            busPosition.latitude,

          longitude:
            busPosition.longitude,

          latitudeDelta: 0.12,

          longitudeDelta: 0.12,

        }}
      >

        {/* ROUTE */}

        <Polyline

          coordinates={route}

          strokeColor="#22c55e"

          strokeWidth={6}

        />



        {/* ALL STOPS */}

        {route.map((stop, index) => (

          <Marker

            key={index}

            coordinate={{

              latitude:
                stop.latitude,

              longitude:
                stop.longitude,

            }}

            title={stop.stop}

            pinColor="orange"
          />

        ))}



        {/* LIVE BUS */}

        <Marker

          coordinate={busPosition}

          title={`Bus ${search}`}

          description={`Near ${currentStop.stop}`}

        >

          <Text
            style={{
              fontSize: 30,
=======
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
>>>>>>> 6ab285dc7898e52dce96354c75e0bc66a90a4f40
            }}
          >
            🚌
          </Text>
<<<<<<< HEAD

=======
>>>>>>> 6ab285dc7898e52dce96354c75e0bc66a90a4f40
        </Marker>

      </MapView>

<<<<<<< HEAD


=======
>>>>>>> 6ab285dc7898e52dce96354c75e0bc66a90a4f40
      {/* INFO CARD */}

      <ScrollView
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
<<<<<<< HEAD

=======
>>>>>>> 6ab285dc7898e52dce96354c75e0bc66a90a4f40
          maxHeight: 320,

          backgroundColor: '#111827',

          borderRadius: 20,
<<<<<<< HEAD

=======
>>>>>>> 6ab285dc7898e52dce96354c75e0bc66a90a4f40
          padding: 20,
        }}
      >

        <Text
          style={{
            color: 'white',
<<<<<<< HEAD
            fontSize: 28,
            fontWeight: 'bold',
          }}
        >
          🚍 Bus {search}
        </Text>



=======
            fontSize: 30,
            fontWeight: 'bold',
          }}
        >
          🚍 Bus {selectedBus.number}
        </Text>

>>>>>>> 6ab285dc7898e52dce96354c75e0bc66a90a4f40
        <Text
          style={{
            color: '#22c55e',
            marginTop: 10,
            fontSize: 18,
          }}
        >
<<<<<<< HEAD
          ETA:
          {' '}
          {eta}
          {' '}
          mins
        </Text>



=======
          ETA: {eta} mins
        </Text>

>>>>>>> 6ab285dc7898e52dce96354c75e0bc66a90a4f40
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

<<<<<<< HEAD


=======
>>>>>>> 6ab285dc7898e52dce96354c75e0bc66a90a4f40
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

<<<<<<< HEAD

=======
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
>>>>>>> 6ab285dc7898e52dce96354c75e0bc66a90a4f40

        <Text
          style={{
            color: 'white',
<<<<<<< HEAD
            marginTop: 18,
=======
            marginTop: 15,
>>>>>>> 6ab285dc7898e52dce96354c75e0bc66a90a4f40
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
<<<<<<< HEAD
          Route Stops
        </Text>



        {route.map((stop, index) => {
=======
          Route Progress
        </Text>

        {selectedBus.route.map((stop, index) => {
>>>>>>> 6ab285dc7898e52dce96354c75e0bc66a90a4f40

          let color = '#6b7280';

          if (index < currentIndex) {
            color = '#22c55e';
          }

<<<<<<< HEAD
          else if (
            index === currentIndex
          ) {
=======
          else if (index === currentIndex) {
>>>>>>> 6ab285dc7898e52dce96354c75e0bc66a90a4f40
            color = '#3b82f6';
          }

          return (

            <Text
<<<<<<< HEAD

              key={index}

=======
              key={index}
>>>>>>> 6ab285dc7898e52dce96354c75e0bc66a90a4f40
              style={{
                color,
                marginTop: 8,
                fontSize: 16,
              }}
            >
<<<<<<< HEAD

              {index < currentIndex
                ? '✅'
                : index === currentIndex
                ? '🚌'
                : '⏳'}

              {' '}

              {stop.stop}

=======
              {index < currentIndex
                ? '✅'
                : index === currentIndex
                ? '🚍'
                : '⏳'}

              {' '}
              {stop.stop}
>>>>>>> 6ab285dc7898e52dce96354c75e0bc66a90a4f40
            </Text>

          );

        })}

      </ScrollView>

    </View>
<<<<<<< HEAD

  );

=======
  );
>>>>>>> 6ab285dc7898e52dce96354c75e0bc66a90a4f40
}