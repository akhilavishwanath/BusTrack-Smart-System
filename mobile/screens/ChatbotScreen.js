import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Screen from '../components/Screen';
import { askChatbot } from '../services/api';
import { useLanguage } from '../i18n/LanguageContext';

export default function ChatbotScreen() {
  const { t } = useLanguage();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'Hi, I can help with Hyderabad bus routes, ETA, tracking, crowd prediction, and profile help.',
    },
  ]);

  function sendMessage(text = message) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setMessages((current) => [...current, { role: 'user', text: trimmed }]);
    setMessage('');
    setLoading(true);

    askChatbot(trimmed)
      .then((response) => {
        setMessages((current) => [
          ...current,
          {
            role: 'bot',
            text: response.reply,
            suggestions: response.suggestions || [],
          },
        ]);
      })
      .catch(() => {
        setMessages((current) => [
          ...current,
          { role: 'bot', text: 'Backend is offline. Start the server on port 3000 and try again.' },
        ]);
      })
      .finally(() => setLoading(false));
  }

  const latestSuggestions = messages[messages.length - 1]?.suggestions || ['Track 1C', 'Crowd for 1C', 'Profile help'];

  return (
    <Screen>
      <Text style={styles.title}>{t('chatbotTitle')}</Text>
      <Text style={styles.subtitle}>{t('chatbotSubtitle')}</Text>

      <View style={styles.chatBox}>
        {messages.map((item, index) => (
          <View key={`${item.role}-${index}`} style={[styles.bubble, item.role === 'user' ? styles.userBubble : styles.botBubble]}>
            <Text style={styles.bubbleText}>{item.text}</Text>
          </View>
        ))}
        {loading ? <ActivityIndicator color="#2dd4bf" style={styles.loader} /> : null}
      </View>

      <View style={styles.suggestions}>
        {latestSuggestions.map((suggestion) => (
          <Pressable key={suggestion} style={styles.suggestion} onPress={() => sendMessage(suggestion)}>
            <Text style={styles.suggestionText}>{suggestion}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.inputRow}>
        <TextInput
          placeholder={t('typeMessage')}
          placeholderTextColor="#94a3b8"
          value={message}
          onChangeText={setMessage}
          style={styles.input}
        />
        <Pressable style={styles.sendButton} onPress={() => sendMessage()}>
          <Text style={styles.sendText}>{t('send')}</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: '#f8fafc', fontSize: 30, fontWeight: '800' },
  subtitle: { color: '#9ca3af', marginTop: 8, lineHeight: 21 },
  chatBox: { marginTop: 18, gap: 10 },
  bubble: { borderRadius: 8, padding: 12, maxWidth: '88%' },
  botBubble: { backgroundColor: '#101c2e', alignSelf: 'flex-start' },
  userBubble: { backgroundColor: '#0f766e', alignSelf: 'flex-end' },
  bubbleText: { color: '#f8fafc', lineHeight: 20 },
  loader: { marginVertical: 8 },
  suggestions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 16 },
  suggestion: { backgroundColor: '#17233a', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
  suggestionText: { color: '#cbd5e1', fontWeight: '700' },
  inputRow: { flexDirection: 'row', gap: 8, marginTop: 16 },
  input: { flex: 1, backgroundColor: '#101c2e', color: '#f8fafc', borderRadius: 8, padding: 13, fontSize: 16 },
  sendButton: { backgroundColor: '#0f766e', borderRadius: 8, paddingHorizontal: 16, justifyContent: 'center' },
  sendText: { color: '#f8fafc', fontWeight: '800' },
});
