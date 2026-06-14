import { useState } from 'react';

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import translations from '../../constants/language';

export default function ChatbotScreen() {
  const [currentLanguage, setCurrentLanguage] = useState('english');

  const t =
    currentLanguage === 'telugu'
      ? translations.telugu
      : currentLanguage === 'hindi'
        ? translations.hindi
        : currentLanguage === 'urdu'
          ? translations.urdu
          : translations.english;

  const [message, setMessage] = useState('');

  const [chat, setChat] = useState<any[]>([]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = message.toLowerCase();

    let botReply = '';

    // SECUNDERABAD

    if (userMessage.includes('secunderabad')) {
      botReply = t.secunderabadReply;
    }

    // DILSUKHNAGAR
    else if (userMessage.includes('dilsukhnagar')) {
      botReply = t.dilsukhnagarReply;
    }

    // MEHDIPATNAM
    else if (userMessage.includes('mehdipatnam')) {
      botReply = t.mehdipatnamReply;
    }

    // ETA
    else if (userMessage.includes('eta') || userMessage.includes('arrival')) {
      botReply = t.etaReply;
    }

    // CROWD
    else if (
      userMessage.includes('crowd') ||
      userMessage.includes('prediction')
    ) {
      botReply = t.crowdReply;
    }

    // HELLO
    else if (userMessage.includes('hello') || userMessage.includes('hi')) {
      botReply = t.helloReply;
    }

    // DEFAULT
    else {
      botReply = t.notFound;
    }

    const updatedChat = [
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
  };

  return (
    <View style={styles.container}>
      {/* LANGUAGE BUTTONS */}

      <View style={styles.langContainer}>
        <Pressable
          style={styles.langButton}
          onPress={() => setCurrentLanguage('english')}
        >
          <Text style={styles.langText}>English</Text>
        </Pressable>

        <Pressable
          style={styles.langButton}
          onPress={() => setCurrentLanguage('telugu')}
        >
          <Text style={styles.langText}>తెలుగు</Text>
        </Pressable>

        <Pressable
          style={styles.langButton}
          onPress={() => setCurrentLanguage('hindi')}
        >
          <Text style={styles.langText}>हिन्दी</Text>
        </Pressable>

        <Pressable
          style={styles.langButton}
          onPress={() => setCurrentLanguage('urdu')}
        >
          <Text style={styles.langText}>اردو</Text>
        </Pressable>
      </View>

      {/* TITLE */}

      <Text style={styles.title}>🤖 {t.chatbot}</Text>

      {/* CHAT */}

      <ScrollView style={styles.chatContainer}>
        {chat.map((item: any, index: number) => (
          <View
            key={index}
            style={item.sender === 'user' ? styles.userBox : styles.botBox}
          >
            <Text style={styles.chatText}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* INPUT */}

      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder={t.search}
        placeholderTextColor="#94a3b8"
        style={styles.input}
      />

      {/* BUTTON */}

      <Pressable style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>{t.send}</Text>
      </Pressable>

      {/* FEATURES */}

      <View style={styles.featuresBox}>
        <Text style={styles.feature}>✔ {t.liveTracking}</Text>

        <Text style={styles.feature}>✔ {t.crowdPrediction}</Text>

        <Text style={styles.feature}>✔ {t.etaPrediction}</Text>

        <Text style={styles.feature}>✔ {t.offlineAI}</Text>

        <Text style={styles.feature}>✔ {t.englishSupport}</Text>

        <Text style={styles.feature}>✔ {t.hindiSupport}</Text>

        <Text style={styles.feature}>✔ {t.teluguSupport}</Text>

        <Text style={styles.feature}>✔ {t.urduSupport}</Text>
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

  langContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
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
