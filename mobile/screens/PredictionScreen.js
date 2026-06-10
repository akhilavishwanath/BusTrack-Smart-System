import { View, Text } from 'react-native';

export default function PredictionScreen() {
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
        👥 Crowd Prediction
      </Text>
    </View>
  );
}