import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Screen from '../components/Screen';
import { demoUser, loginUser } from '../services/api';
import { languages, useLanguage } from '../i18n/LanguageContext';

export default function ProfileScreen() {
  const { language, setLanguage, t } = useLanguage();
  const [form, setForm] = useState(demoUser);
  const [savedUser, setSavedUser] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    saveLogin(demoUser);
  }, []);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function saveLogin(payload = form) {
    setMessage('Saving login details...');
    loginUser(payload)
      .then((user) => {
        setSavedUser(user);
        setMessage('Login details saved in backend database.');
      })
      .catch(() => setMessage('Could not save login. Start backend on port 3000.'));
  }

  return (
    <Screen>
      <Text style={styles.title}>{t('profileTitle')}</Text>
      <Text style={styles.subtitle}>Passenger details are posted to the backend when the user logs in.</Text>

      <Text style={styles.sectionTitle}>{t('language')}</Text>
      <View style={styles.languageRow}>
        {languages.map((item) => (
          <Pressable
            key={item.code}
            style={[styles.languageButton, language === item.code && styles.activeLanguage]}
            onPress={() => setLanguage(item.code)}
          >
            <Text style={styles.languageText}>{item.label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.form}>
        <Input label={t('name')} value={form.name} onChangeText={(value) => updateField('name', value)} />
        <Input label={t('email')} value={form.email} onChangeText={(value) => updateField('email', value)} />
        <Input label={t('phone')} value={form.phone} onChangeText={(value) => updateField('phone', value)} />
        <Pressable style={styles.button} onPress={() => saveLogin()}>
          <Text style={styles.buttonText}>{t('saveLogin')}</Text>
        </Pressable>
      </View>

      <Text style={styles.message}>{message}</Text>

      {savedUser ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{savedUser.name}</Text>
          <Text style={styles.cardLine}>{savedUser.email}</Text>
          <Text style={styles.cardLine}>{savedUser.phone}</Text>
          <Text style={styles.cardLine}>Role: {savedUser.role}</Text>
          <Text style={styles.cardLine}>Last login: {new Date(savedUser.lastLoginAt).toLocaleString()}</Text>
        </View>
      ) : null}
    </Screen>
  );
}

function Input({ label, ...props }) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput placeholderTextColor="#94a3b8" style={styles.input} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { color: '#f8fafc', fontSize: 30, fontWeight: '800' },
  subtitle: { color: '#9ca3af', marginTop: 8, lineHeight: 21 },
  sectionTitle: { color: '#f8fafc', fontSize: 18, fontWeight: '800', marginTop: 18 },
  languageRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  languageButton: { backgroundColor: '#101c2e', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10 },
  activeLanguage: { backgroundColor: '#0f766e' },
  languageText: { color: '#f8fafc', fontWeight: '700' },
  form: { backgroundColor: '#101c2e', borderRadius: 8, padding: 14, marginTop: 18, gap: 12 },
  label: { color: '#cbd5e1', fontWeight: '700', marginBottom: 6 },
  input: { backgroundColor: '#07111f', color: '#f8fafc', borderRadius: 8, padding: 13, fontSize: 16 },
  button: { backgroundColor: '#0f766e', borderRadius: 8, padding: 14, alignItems: 'center', marginTop: 4 },
  buttonText: { color: '#f8fafc', fontWeight: '800' },
  message: { color: '#5eead4', marginTop: 14 },
  card: { backgroundColor: '#101c2e', borderRadius: 8, padding: 16, marginTop: 16 },
  cardTitle: { color: '#f8fafc', fontSize: 22, fontWeight: '800' },
  cardLine: { color: '#cbd5e1', marginTop: 7 },
});
