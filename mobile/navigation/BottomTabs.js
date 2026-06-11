import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import TrackingScreen from '../screens/TrackingScreen';
import PredictionScreen from '../screens/PredictionScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatbotScreen from '../screens/ChatbotScreen';
import { useLanguage } from '../i18n/LanguageContext';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { t } = useLanguage();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,

          tabBarStyle: {
            backgroundColor: '#111827',
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
            } else if (route.name === 'Chatbot') {
              iconName = 'chatbubble-ellipses';
            }

            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: t('home') }} />
        <Tab.Screen name="Tracking" component={TrackingScreen} options={{ title: t('tracking') }} />
        <Tab.Screen name="Prediction" component={PredictionScreen} options={{ title: t('prediction') }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: t('profile') }} />
        <Tab.Screen name="Chatbot" component={ChatbotScreen} options={{ title: t('chatbot') }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
