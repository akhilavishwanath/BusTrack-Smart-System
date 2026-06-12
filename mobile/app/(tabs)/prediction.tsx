import React, {
  useState,
  useContext,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';

import translations
from '../../constants/language';

import {
  LanguageContext,
} from '../../context/LanguageContext';

export default function PredictionScreen() {

  const [
    currentLanguage,
    setCurrentLanguage,
  ] = useState('english');

  const t = currentLanguage === 'telugu'
    ? translations.telugu
    : currentLanguage === 'hindi'
    ? translations.hindi
    : currentLanguage === 'urdu'
    ? translations.urdu
    : translations.english;

  return (

    <ScrollView style={styles.container}>

      {/* LANGUAGE BUTTONS */}

      <View
        style={styles.langContainer}
      >

        <Pressable
          style={styles.langButton}
          onPress={() =>
            setCurrentLanguage(
              'english'
            )
          }
        >
          <Text style={styles.langText}>
            English
          </Text>
        </Pressable>

        <Pressable
          style={styles.langButton}
          onPress={() =>
            setCurrentLanguage(
              'telugu'
            )
          }
        >
          <Text style={styles.langText}>
            తెలుగు
          </Text>
        </Pressable>

        <Pressable
          style={styles.langButton}
          onPress={() =>
            setCurrentLanguage(
              'hindi'
            )
          }
        >
          <Text style={styles.langText}>
            हिन्दी
          </Text>
        </Pressable>

        <Pressable
          style={styles.langButton}
          onPress={() =>
            setCurrentLanguage(
              'urdu'
            )
          }
        >
          <Text style={styles.langText}>
            اردو
          </Text>
        </Pressable>

      </View>

      <Text style={styles.title}>
        📊 {t.prediction}
      </Text>

      <View style={styles.card}>

       <Text style={styles.cardText}>
         🤖 {t.prediction}
      </Text>   

        <Text style={styles.cardText}>
          📈 Passenger Analysis
        </Text>

        <Text style={styles.cardText}>
          🚍 Smart ETA Prediction
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

  langContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 50,
    marginBottom: 20,
  },

  langButton: {
    backgroundColor: '#1e293b',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
  },

  langText: {
    color: 'white',
    fontWeight: 'bold',
  },

  title: {
    color: 'white',
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#0f172a',
    padding: 20,
    borderRadius: 20,
  },

  cardText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 15,
  },

});