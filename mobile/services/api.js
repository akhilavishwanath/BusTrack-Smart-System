import axios from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const debuggerHost =
  Constants.expoConfig?.hostUri ||
  Constants.manifest2?.extra?.expoClient?.hostUri ||
  Constants.manifest?.debuggerHost;

const host = debuggerHost?.split(':')?.[0];

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  (host ? `http://${host}:3000` : Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000');

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export async function getDashboard() {
  const response = await api.get('/dashboard');
  return response.data;
}

export async function searchRoutes(busNumber) {
  const endpoint = busNumber ? `/search/${encodeURIComponent(busNumber)}` : '/routes';
  const response = await api.get(endpoint);
  return response.data;
}

export async function getFullRoute(busNumber) {
  const response = await api.get(`/fullroute/${encodeURIComponent(busNumber)}`);
  return response.data;
}

export async function getPredictions(busNumber = '') {
  const response = await api.get('/predictions', {
    params: busNumber ? { busNumber } : {},
  });
  return response.data;
}

export async function loginUser(payload) {
  const response = await api.post('/auth/login', payload);
  return response.data.user;
}

export async function askChatbot(message) {
  const response = await api.post('/chatbot', { message });
  return response.data;
}

export const demoUser = {
  name: 'Hyderabad Passenger',
  email: 'passenger@bustrack.local',
  phone: '9999999999',
  role: 'passenger',
};
