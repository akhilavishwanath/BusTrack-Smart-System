import { View, Text } from 'react-native';

export default function ProfileScreen() {
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
        👤 Profile
      </Text>
    </View>
  );
}