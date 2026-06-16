const API_URL = 'http://172.18.211.186:3000';

export async function getDashboard() {
  const response = await fetch(`${API_URL}/dashboard`);
  return response.json();
}

export async function getRoutes() {
  try {
    const response = await fetch(`${API_URL}/routes`);

    const data = await response.json();

    console.log('ROUTES DATA:', data);

    return data;
  } catch (error) {
    console.log('ROUTES ERROR:', error);
    return [];
  }
}

export async function getFullRoute(busNumber) {
  const response = await fetch(`${API_URL}/fullroute/${busNumber}`);

  return response.json();
}
