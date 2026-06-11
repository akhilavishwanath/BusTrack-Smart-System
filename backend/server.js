const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const DATA_DIR = path.join(__dirname, 'data');
const ROUTES_FILE = path.join(DATA_DIR, 'routes.csv');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

app.use(cors());
app.use(express.json());

const routes = [];

function ensureUsersFile() {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify({ users: [] }, null, 2));
  }
}

function readUsers() {
  ensureUsersFile();
  return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
}

function writeUsers(data) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));
}

function crowdForRoute(route, index = 0) {
  const seed = `${route.route}-${route.route_id}-${index}`;
  const score = seed.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % 100;

  if (score > 82) return 'Very High';
  if (score > 58) return 'High';
  if (score > 28) return 'Medium';
  return 'Low';
}

function etaForCrowd(crowd, index = 0) {
  const base = (index + 1) * 3;
  const delay = {
    Low: 0,
    Medium: 2,
    High: 5,
    'Very High': 8,
  }[crowd] || 2;

  return base + delay;
}

function routeToBus(route, index = 0) {
  const crowd = crowdForRoute(route, index);
  const [origin = 'Hyderabad', destination = 'Hyderabad'] =
    (route.origin_destination || '').split(' TO ');

  return {
    number: route.route,
    routeId: route.route_id,
    origin: origin.trim(),
    destination: destination.trim(),
    originDestination: route.origin_destination,
    crowd,
    etaMinutes: etaForCrowd(crowd, index),
    occupancyPercent: {
      Low: 28,
      Medium: 54,
      High: 76,
      'Very High': 92,
    }[crowd],
  };
}

function fallbackRouteStops(route) {
  const bus = routeToBus(route);
  const stops = [
    { stop: bus.origin || 'Origin', latitude: 17.385, longitude: 78.4867 },
    { stop: 'Koti', latitude: 17.3859, longitude: 78.4809 },
    { stop: 'Lakdikapul', latitude: 17.4062, longitude: 78.4653 },
    { stop: 'Ameerpet', latitude: 17.4375, longitude: 78.4483 },
    { stop: bus.destination || 'Destination', latitude: 17.4474, longitude: 78.3762 },
  ];

  return stops.map((stop, index) => ({
    ...stop,
    crowd: crowdForRoute(route, index),
    etaMinutes: etaForCrowd(crowdForRoute(route, index), index),
  }));
}

function findRouteByNumber(busNumber) {
  const normalizedBusNumber = busNumber.toLowerCase();

  return routes.find((route) => route.route.toLowerCase() === normalizedBusNumber);
}

fs.createReadStream(ROUTES_FILE)
  .pipe(csv())
  .on('data', (data) => {
    routes.push(data);
  })
  .on('end', () => {
    console.log(`CSV loaded successfully: ${routes.length} routes`);
  });

app.get('/', (req, res) => {
  res.json({
    message: 'Hyderabad Bus API Running',
    routes: routes.length,
    endpoints: ['/routes', '/dashboard', '/search/:busNumber', '/fullroute/:busNumber', '/predictions', '/auth/login'],
  });
});

app.get('/routes', (req, res) => {
  res.json(routes.map(routeToBus));
});

app.get('/dashboard', (req, res) => {
  const buses = routes.slice(0, 12).map(routeToBus);
  const crowdSummary = buses.reduce(
    (summary, bus) => ({
      ...summary,
      [bus.crowd]: (summary[bus.crowd] || 0) + 1,
    }),
    {}
  );

  res.json({
    city: 'Hyderabad',
    totalRoutes: routes.length,
    activeBuses: Math.min(routes.length, 128),
    averageEtaMinutes: Math.round(
      buses.reduce((sum, bus) => sum + bus.etaMinutes, 0) / Math.max(buses.length, 1)
    ),
    crowdSummary,
    featuredRoutes: buses,
  });
});

app.get('/search/:busNumber', (req, res) => {
  const busNumber = req.params.busNumber.toLowerCase();
  const filteredRoutes = routes
    .filter((route) => route.route.toLowerCase().includes(busNumber))
    .slice(0, 25)
    .map(routeToBus);

  res.json(filteredRoutes);
});

app.get('/route/:id', (req, res) => {
  const foundRoute = findRouteByNumber(req.params.id);

  if (!foundRoute) {
    return res.status(404).json({ message: 'Route not found' });
  }

  res.json(routeToBus(foundRoute));
});

app.get('/fullroute/:busNumber', (req, res) => {
  const foundRoute = findRouteByNumber(req.params.busNumber);

  if (!foundRoute) {
    return res.status(404).json({ error: 'Bus route not found' });
  }

  const filePath = path.join(
    __dirname,
    'hyd-bus-data',
    'route_stops_order',
    `${foundRoute.route_id}.csv`
  );

  if (!fs.existsSync(filePath)) {
    return res.json({
      bus: routeToBus(foundRoute),
      stops: fallbackRouteStops(foundRoute),
      source: 'generated-from-routes-csv',
    });
  }

  const stops = [];
  fs.createReadStream(filePath)
    .pipe(csv({ headers: false }))
    .on('data', (row) => {
      const index = stops.length;
      const crowd = crowdForRoute(foundRoute, index);

      stops.push({
        stop: row[3],
        latitude: Number(row[1]),
        longitude: Number(row[2]),
        crowd,
        etaMinutes: etaForCrowd(crowd, index),
      });
    })
    .on('end', () => {
      res.json({
        bus: routeToBus(foundRoute),
        stops,
        source: 'route-stops-order-csv',
      });
    });
});

app.get('/predictions', (req, res) => {
  const busNumber = req.query.busNumber;
  const sourceRoutes = busNumber ? routes.filter((route) => route.route === busNumber) : routes;

  res.json(
    sourceRoutes.slice(0, 30).map((route, index) => {
      const bus = routeToBus(route, index);

      return {
        ...bus,
        recommendation:
          bus.crowd === 'Very High'
            ? 'Try the next bus or start earlier.'
            : bus.crowd === 'High'
              ? 'Seats may be limited.'
              : 'Good time to travel.',
      };
    })
  );
});

app.post('/auth/login', (req, res) => {
  const { name = 'BusTrack User', email, phone = '', role = 'passenger' } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const data = readUsers();
  const existingIndex = data.users.findIndex((user) => user.email === email);
  const now = new Date().toISOString();
  const user = {
    id: existingIndex >= 0 ? data.users[existingIndex].id : `user_${Date.now()}`,
    name,
    email,
    phone,
    role,
    lastLoginAt: now,
  };

  if (existingIndex >= 0) {
    data.users[existingIndex] = { ...data.users[existingIndex], ...user };
  } else {
    data.users.push({ ...user, createdAt: now });
  }

  writeUsers(data);
  res.json({ user });
});

app.post('/chatbot', (req, res) => {
  const message = String(req.body.message || '').trim();
  const lowerMessage = message.toLowerCase();
  const busMatch = lowerMessage.match(/[0-9]+[a-z/0-9]*/i);
  const requestedRoute = busMatch ? findRouteByNumber(busMatch[0]) : null;

  if (!message) {
    return res.json({
      reply: 'Ask me about bus routes, live tracking, ETA, crowd prediction, or your profile.',
      suggestions: ['Show route 1C', 'Crowd for 1C', 'How to track a bus?'],
    });
  }

  if (lowerMessage.includes('crowd') || lowerMessage.includes('busy') || lowerMessage.includes('seat')) {
    const route = requestedRoute || routes[0];
    const bus = routeToBus(route);

    return res.json({
      reply: `Bus ${bus.number} crowd is ${bus.crowd}. Occupancy is around ${bus.occupancyPercent}% and ETA is ${bus.etaMinutes} minutes.`,
      data: bus,
      suggestions: [`Track ${bus.number}`, `Route ${bus.number}`, 'Show dashboard'],
    });
  }

  if (lowerMessage.includes('eta') || lowerMessage.includes('time') || lowerMessage.includes('arrive')) {
    const route = requestedRoute || routes[0];
    const bus = routeToBus(route);

    return res.json({
      reply: `Bus ${bus.number} is expected in about ${bus.etaMinutes} minutes on ${bus.originDestination}.`,
      data: bus,
      suggestions: [`Crowd for ${bus.number}`, `Full route ${bus.number}`],
    });
  }

  if (requestedRoute) {
    const bus = routeToBus(requestedRoute);

    return res.json({
      reply: `Bus ${bus.number} runs ${bus.originDestination}. Current crowd is ${bus.crowd}, ETA is ${bus.etaMinutes} minutes.`,
      data: bus,
      suggestions: [`Crowd for ${bus.number}`, `ETA for ${bus.number}`, 'Search another bus'],
    });
  }

  if (lowerMessage.includes('profile') || lowerMessage.includes('login')) {
    return res.json({
      reply: 'Open the Profile tab and tap Save Login. The backend stores the passenger name, email, phone, role, and last login time.',
      suggestions: ['Save profile', 'Show dashboard'],
    });
  }

  return res.json({
    reply: 'I can help with Hyderabad bus routes, live tracking, ETA, crowd prediction, and login profile details. Try asking: "Track 1C" or "Crowd for 1C".',
    suggestions: ['Track 1C', 'Crowd prediction', 'Profile help'],
  });
});

app.get('/users/:email', (req, res) => {
  const data = readUsers();
  const user = data.users.find((entry) => entry.email === req.params.email);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ user });
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
  console.log('Open http://YOUR_MAC_IP:3000/dashboard from your phone to test LAN access.');
});
