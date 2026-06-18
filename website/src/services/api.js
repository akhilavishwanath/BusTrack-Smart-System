const API_URL =
  import.meta.env.VITE_API_URL ||
  'https://bustrack-smart-system.onrender.com';

export async function getDashboard() {
  const response = await fetch(`${API_URL}/dashboard`);
  return response.json();
}

export async function getRoutes() {
  const response = await fetch(`${API_URL}/routes`);
  return response.json();
}

export async function getFullRoute(busNumber) {
  const response = await fetch(`${API_URL}/fullroute/${busNumber}`);

  return response.json();
}
