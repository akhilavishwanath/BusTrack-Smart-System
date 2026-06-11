import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChatbotScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        🤖 AI Chatbot
      </Text>

      <Text style={styles.subtitle}>
        Smart Bus Assistant Coming Soon
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  subtitle: {
    color: '#94a3b8',
    fontSize: 16,
  },
});