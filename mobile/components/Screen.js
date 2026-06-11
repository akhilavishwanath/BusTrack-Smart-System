import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

export default function Screen({ children, scroll = true }) {
  const content = scroll ? (
    <ScrollView contentContainerStyle={styles.content}>{children}</ScrollView>
  ) : (
    children
  );

  return <SafeAreaView style={styles.container}>{content}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07111f',
  },
  content: {
    padding: 18,
    paddingBottom: 110,
  },
});
