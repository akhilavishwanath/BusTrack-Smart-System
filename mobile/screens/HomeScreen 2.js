import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#020617',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 34,
          fontWeight: 'bold',
        }}
      >
        🚌 BusTrack Smart
      </Text>

      <Text
        style={{
          color: '#94a3b8',
          marginTop: 12,
          fontSize: 16,
        }}
      >
        AI-Powered TGSRTC Tracking
      </Text>
    </View>
  );
}