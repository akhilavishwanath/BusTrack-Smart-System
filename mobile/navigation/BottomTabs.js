import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../app/(tabs)/index';
import PredictionScreen from '../app/prediction';
import ProfileScreen from '../app/profile';
import TrackingScreen from '../app/tracking';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,

          tabBarStyle: {
            backgroundColor: '#0f172a',
            borderTopWidth: 0,
            height: 65,
          },

          tabBarActiveTintColor: '#22c55e',
          tabBarInactiveTintColor: '#94a3b8',

          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Tracking') {
              iconName = 'bus';
            } else if (route.name === 'Prediction') {
              iconName = 'analytics';
            } else if (route.name === 'Profile') {
              iconName = 'person';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Tracking" component={TrackingScreen} />
        <Tab.Screen name="Prediction" component={PredictionScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
