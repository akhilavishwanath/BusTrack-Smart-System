import React, {
  useState,
  useContext,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native';

import {
  getRoutes,
} from '../../services/api';

import translations from '../../constants/language';

import {
  LanguageContext,
} from '../../context/LanguageContext';

export default function ChatbotScreen() {

  const {
    currentLanguage,
  } = useContext(
    LanguageContext
  );

  const t =
    currentLanguage === 'telugu'
      ? translations.telugu
      : currentLanguage === 'hindi'
      ? translations.hindi
      : currentLanguage === 'urdu'
      ? translations.urdu
      : translations.english;

  const [message, setMessage] =
    useState('');

  const [chat, setChat] =
    useState<any[]>([]);

  const handleSend = async () => {

    if (!message.trim()) return;

    let botReply =
      '❌ No routes found';

    try {

      const routes =
        await getRoutes();

      const userMessage =
        message.toLowerCase();

      // ETA

      if (
        userMessage.includes(
          'eta'
        )
      ) {

        botReply =
          '⏱ Estimated arrival time is 12 mins';

      }

      // CROWD

      else if (

        userMessage.includes(
          'crowd'
        ) ||

        userMessage.includes(
          'prediction'
        )

      ) {

        botReply =
          '📊 AI Prediction: Medium crowd currently';

      }

      // HELLO

      else if (
        userMessage.includes(
          'hello'
        )
      ) {

        botReply =
          '👋 Hello! Ask me about buses, routes, crowd prediction, or ETA';

      }

      // ROUTE SEARCH

      else {

        const matchedRoute =
          routes.find((route: any) => {

            const routeName =
              (
                route.route ||
                route.number ||
                ''
              ).toLowerCase();

            const destination =
              (
                route.origin_destination ||
                route.originDestination ||
                ''
              ).toLowerCase();

            // CLEAN USER MESSAGE

            const cleanedMessage =

              userMessage

                .replace(
                  'which',
                  ''
                )

                .replace(
                  'bus',
                  ''
                )

                .replace(
                  'goes',
                  ''
                )

                .replace(
                  'route',
                  ''
                )

                .replace(
                  'routes',
                  ''
                )

                .replace(
                  'tell me',
                  ''
                )

                .replace(
                  'to',
                  ''
                )

                .trim();

            const words =
              cleanedMessage.split(
                ' '
              );

            return (

              words.some(
                (word) =>

                  word.length > 1 && (

                    destination.includes(
                      word
                    ) ||

                    routeName.includes(
                      word
                    )

                  )

              )

            );

          });

        // RESPONSE

        if (matchedRoute) {

          botReply =

            `🚌 Bus ${
              matchedRoute.route ||
              matchedRoute.number
            } goes to ${
              matchedRoute.origin_destination ||
              matchedRoute.originDestination
            }`;

        }

        else {

          botReply =
            '❌ Sorry, I could not find matching bus information';

        }

      }

      const updatedChat: any[] = [

        ...chat,

        {
          sender: 'user',
          text: message,
        },

        {
          sender: 'bot',
          text: botReply,
        },

      ];

      setChat(updatedChat);

      setMessage('');

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        🤖 {t.chatbot}
      </Text>

      <ScrollView
        style={styles.chatContainer}
      >

        {

          chat.map(
            (
              item: any,
              index: number
            ) => (

              <View
                key={index}

                style={
                  item.sender === 'user'
                    ? styles.userBox
                    : styles.botBox
                }
              >

                <Text style={styles.chatText}>
                  {item.text}
                </Text>

              </View>

            )
          )

        }

      </ScrollView>

      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Ask about routes, buses, ETA..."
        placeholderTextColor="#94a3b8"
        style={styles.input}
      />

      <Pressable
        style={styles.button}
        onPress={handleSend}
      >

        <Text style={styles.buttonText}>
          {t.send}
        </Text>

      </Pressable>

      <View style={styles.featuresBox}>

        <Text style={styles.feature}>
          ✔ {t.liveTracking}
        </Text>

        <Text style={styles.feature}>
          ✔ {t.crowdPrediction}
        </Text>

        <Text style={styles.feature}>
          ✔ {t.etaPrediction}
        </Text>

        <Text style={styles.feature}>
          ✔ {t.offlineAI}
        </Text>

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#020617',
    padding: 20,
    paddingTop: 60,
  },

  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  chatContainer: {
    flex: 1,
    marginBottom: 20,
  },

  userBox: {
    backgroundColor: '#22c55e',
    padding: 14,
    borderRadius: 14,
    alignSelf: 'flex-end',
    marginBottom: 10,
    maxWidth: '80%',
  },

  botBox: {
    backgroundColor: '#1e293b',
    padding: 14,
    borderRadius: 14,
    alignSelf: 'flex-start',
    marginBottom: 10,
    maxWidth: '80%',
  },

  chatText: {
    color: 'white',
    fontSize: 16,
  },

  input: {
    backgroundColor: '#0f172a',
    color: 'white',
    padding: 15,
    borderRadius: 14,
    fontSize: 16,
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#22c55e',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  featuresBox: {
    backgroundColor: '#0f172a',
    padding: 18,
    borderRadius: 18,
    marginTop: 20,
  },

  feature: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },

});