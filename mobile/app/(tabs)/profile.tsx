import React, {
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';

export default function ProfileScreen() {

  const [name, setName] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [phone, setPhone] =
    useState('');

  const [role, setRole] =
    useState('Passenger');

  const saveProfile = async () => {

    try {

      const response =
        await fetch(
          'http://192.168.106.177:3000/auth/login',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body: JSON.stringify({

              name,
              email,
              phone,
              role,

            }),

          }
        );

      const data =
        await response.json();

      Alert.alert(
        'Success',
        'Profile saved successfully!'
      );

      console.log(data);

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Error',
        'Failed to save profile'
      );

    }

  };

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        👤 Profile
      </Text>

      <Text style={styles.subtitle}>
        Passenger Login & Details
      </Text>

      {/* NAME */}

      <Text style={styles.label}>
        Full Name
      </Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        placeholderTextColor="#94a3b8"
        style={styles.input}
      />

      {/* EMAIL */}

      <Text style={styles.label}>
        Email
      </Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
        placeholderTextColor="#94a3b8"
        keyboardType="email-address"
        style={styles.input}
      />

      {/* PHONE */}

      <Text style={styles.label}>
        Phone Number
      </Text>

      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter phone number"
        placeholderTextColor="#94a3b8"
        keyboardType="phone-pad"
        style={styles.input}
      />

      {/* ROLE */}

      <Text style={styles.label}>
        Role
      </Text>

      <TextInput
        value={role}
        onChangeText={setRole}
        placeholder="Passenger / Student"
        placeholderTextColor="#94a3b8"
        style={styles.input}
      />

      {/* BUTTON */}

      <Pressable
        style={styles.button}
        onPress={saveProfile}
      >

        <Text style={styles.buttonText}>
          Save Profile
        </Text>

      </Pressable>

      {/* ABOUT */}

      <View style={styles.aboutBox}>

        <Text style={styles.aboutTitle}>
          🚌 BusTrack Smart
        </Text>

        <Text style={styles.aboutText}>
          AI Powered Smart Bus
          Tracking System for
          Hyderabad public
          transport.
        </Text>

        <Text style={styles.aboutText}>
          ✔ Live Tracking
        </Text>

        <Text style={styles.aboutText}>
          ✔ Crowd Prediction
        </Text>

        <Text style={styles.aboutText}>
          ✔ Smart ETA
        </Text>

        <Text style={styles.aboutText}>
          ✔ AI Chatbot
        </Text>

      </View>

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
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 50,
  },

  subtitle: {
    color: '#94a3b8',
    fontSize: 16,
    marginBottom: 30,
    marginTop: 5,
  },

  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 8,
    marginTop: 12,
  },

  input: {
    backgroundColor: '#0f172a',
    color: 'white',
    padding: 15,
    borderRadius: 14,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#22c55e',
    padding: 18,
    borderRadius: 18,
    marginTop: 30,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  aboutBox: {
    backgroundColor: '#0f172a',
    padding: 20,
    borderRadius: 20,
    marginTop: 30,
    marginBottom: 40,
  },

  aboutTitle: {
    color: '#22c55e',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  aboutText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },

});