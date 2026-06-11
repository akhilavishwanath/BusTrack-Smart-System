import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PredictionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        📊 Crowd Prediction
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
});