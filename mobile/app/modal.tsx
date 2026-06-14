import { Link } from 'expo-router';

import { StyleSheet, Text, View } from 'react-native';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is a modal</Text>

      <Link href="/" dismissTo style={styles.link}>
        Go to home screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#020617',
  },

  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },

  link: {
    marginTop: 15,
    paddingVertical: 15,
    color: '#38bdf8',
    fontSize: 16,
  },
});
