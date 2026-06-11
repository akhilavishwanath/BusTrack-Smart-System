export async function getDashboard() {
  const response = await fetch(
    'http://192.168.31.160:3000/dashboard'
  );

  return response.json();
}

export async function getRoutes() {
  const response = await fetch(
    'http://192.168.31.160:3000/routes'
  );

  return response.json();
}

export async function getFullRoute(busNumber) {

  const response = await fetch(
    `http://192.168.31.160:3000/fullroute/${busNumber}`
  );

  return response.json();
}