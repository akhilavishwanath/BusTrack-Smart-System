const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('node:path');
const csv = require('csv-parser');

const db = require('./database');

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const DATA_DIR = path.join(__dirname, 'data');

const ROUTES_FILE = path.join(DATA_DIR, 'routes.csv');

app.use(cors());

app.use(express.json());

const routes = [];

// CROWD

function crowdForRoute(route, index = 0) {
  const seed = `${route.route}-${route.route_id}-${index}`;

  const score =
    seed.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % 100;

  if (score > 82) return 'Very High';

  if (score > 58) return 'High';

  if (score > 28) return 'Medium';

  return 'Low';
}

// ETA

function etaForCrowd(crowd, index = 0) {
  const base = (index + 1) * 3;

  const delay =
    {
      Low: 0,
      Medium: 2,
      High: 5,
      'Very High': 8,
    }[crowd] || 2;

  return base + delay;
}

// ROUTE → BUS

function routeToBus(route, index = 0) {
  const crowd = crowdForRoute(route, index);

  const [origin = 'Hyderabad', destination = 'Hyderabad'] = (
    route.origin_destination || ''
  ).split(' TO ');

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

// FALLBACK ROUTE

function fallbackRouteStops(route) {
  const bus = routeToBus(route);

  const stops = [
    {
      stop: bus.origin || 'Origin',

      latitude: 17.385,

      longitude: 78.4867,
    },

    {
      stop: 'Koti',

      latitude: 17.3859,

      longitude: 78.4809,
    },

    {
      stop: 'Lakdikapul',

      latitude: 17.4062,

      longitude: 78.4653,
    },

    {
      stop: 'Ameerpet',

      latitude: 17.4375,

      longitude: 78.4483,
    },

    {
      stop: bus.destination || 'Destination',

      latitude: 17.4474,

      longitude: 78.3762,
    },
  ];

  return stops.map((stop, index) => ({
    ...stop,

    crowd: crowdForRoute(route, index),

    etaMinutes: etaForCrowd(crowdForRoute(route, index), index),
  }));
}

// FIND ROUTE

function findRouteByNumber(busNumber) {
  const normalizedBusNumber = busNumber.toLowerCase();

  return routes.find(
    (route) => route.route.toLowerCase() === normalizedBusNumber
  );
}

// LOAD CSV

fs.createReadStream(ROUTES_FILE)

  .pipe(csv())

  .on('data', (data) => {
    routes.push(data);
  })

  .on('end', () => {
    console.log(`CSV loaded successfully: ${routes.length} routes`);
  });

// HOME

app.get('/', (_req, res) => {
  res.json({
    message: 'Hyderabad Bus API Running',

    routes: routes.length,
  });
});

// ROUTES

app.get('/routes', (_req, res) => {
  res.json(routes.map(routeToBus));
});

// DASHBOARD

app.get('/dashboard', (_req, res) => {
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
      buses.reduce((sum, bus) => sum + bus.etaMinutes, 0) /
        Math.max(buses.length, 1)
    ),

    crowdSummary,

    featuredRoutes: buses,
  });
});

// SEARCH

app.get('/search/:busNumber', (req, res) => {
  const busNumber = req.params.busNumber.toLowerCase();

  const filteredRoutes = routes

    .filter((route) => route.route.toLowerCase().includes(busNumber))

    .slice(0, 25)

    .map(routeToBus);

  res.json(filteredRoutes);
});

// FULL ROUTE

app.get('/fullroute/:busNumber', (req, res) => {
  const foundRoute = findRouteByNumber(req.params.busNumber);

  if (!foundRoute) {
    return res.status(404).json({
      error: 'Bus route not found',
    });
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
    });
  }

  const stops = [];

  fs.createReadStream(filePath)

    .pipe(
      csv({
        headers: false,
      })
    )

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
      });
    });
});

// PREDICTIONS

app.get('/predictions', (req, res) => {
  const busNumber = req.query.busNumber;

  const sourceRoutes = busNumber
    ? routes.filter((route) => route.route === busNumber)
    : routes;

  res.json(
    sourceRoutes

      .slice(0, 30)

      .map((route, index) => {
        const bus = routeToBus(route, index);

        return {
          ...bus,

          recommendation:
            bus.crowd === 'Very High'
              ? 'Try the next bus.'
              : bus.crowd === 'High'
                ? 'Seats may be limited.'
                : 'Good time to travel.',
        };
      })
  );
});

// SQLITE LOGIN

app.post('/auth/login', (req, res) => {
  const { name, email, phone } = req.body;

  if (!email) {
    return res.status(400).json({
      error: 'Email required',
    });
  }

  const createdAt = new Date().toISOString();

  const query = `

    INSERT OR REPLACE INTO users

    (name, email, phone, createdAt)

    VALUES (?, ?, ?, ?)

  `;

  db.run(
    query,

    [name, email, phone, createdAt],

    function (err) {
      if (err) {
        console.log(err);

        return res.status(500).json({
          error: 'Database error',
        });
      }

      res.json({
        success: true,

        user: {
          id: this.lastID,

          name,
          email,
          phone,
        },
      });
    }
  );
});

// CHATBOT

app.post('/chatbot', (req, res) => {
  const message = String(req.body.message || '').trim();

  if (!message) {
    return res.json({
      reply: 'Ask me about routes, ETA, tracking or crowd prediction.',
    });
  }

  return res.json({
    reply: `You asked: ${message}`,
  });
});

// SERVER

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
