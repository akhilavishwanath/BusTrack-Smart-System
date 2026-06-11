import React, {
  useState,
  useEffect,
} from 'react';

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
            'http://192.168.106.177:3000/fullroute/${search}'
          );

        console.log(response.data);

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

  if (!busPosition) {

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
    Math.max(
      1,
      remainingStops * 2
    );



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

          coordinates={
            route.map((stop) => ({
              latitude: stop.latitude,
              longitude: stop.longitude,
            }))
          }

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
            fontSize: 28,
            fontWeight: 'bold',
          }}
        >
          🚍 Bus {search}
        </Text>



        <Text
          style={{
            color: '#22c55e',
            marginTop: 10,
            fontSize: 18,
          }}
        >
          ETA:
          {' '}
          {eta}
          {' '}
          mins
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
          {currentStop.crowd || 'Medium'}
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



        {route.map((stop, index) => {

          let color = '#6b7280';

          if (index < currentIndex) {
            color = '#22c55e';
          }

          else if (
            index === currentIndex
          ) {
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
                ? '🚌'
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