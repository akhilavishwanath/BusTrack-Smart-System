const API_URL = 'http://172.18.211.186:3000';

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
