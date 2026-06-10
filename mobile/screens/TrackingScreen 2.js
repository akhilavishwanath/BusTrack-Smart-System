import { View, Text } from 'react-native';

export default function TrackingScreen() {
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
          fontSize: 28,
        }}
      >
        🗺️ Live Tracking
      </Text>
    </View>
  );
}