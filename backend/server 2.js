const express = require('express');

const cors = require('cors');

const fs = require('fs');

const csv = require('csv-parser');

const app = express();

const path = require('path');

app.use(cors());

app.use(express.json());

const routes = [];


// LOAD CSV

fs.createReadStream('./data/routes.csv')

  .pipe(csv())

  .on('data', (data) => {

    routes.push(data);

  })

  .on('end', () => {

    console.log('CSV Loaded Successfully');

    console.log(routes[0]);

  });


// HOME

app.get('/', (req, res) => {

  res.send('Hyderabad Bus API Running 🚍');

});


// GET ALL ROUTES

app.get('/routes', (req, res) => {

  res.json(routes);

});


// SEARCH ROUTES

app.get('/search/:busNumber', (req, res) => {

  const busNumber =
    req.params.busNumber.toLowerCase();

  const filteredRoutes =
    routes.filter((route) =>

      route.route
        .toLowerCase()
        .includes(busNumber)

    );

  res.json(filteredRoutes);

});


// GET SINGLE ROUTE

app.get('/route/:id', (req, res) => {

  const routeId =
    req.params.id.toLowerCase();

  const foundRoute =
    routes.find((route) =>

      route.route
        .toLowerCase() === routeId

    );

  if (foundRoute) {

    res.json(foundRoute);

  } else {

    res.status(404).json({

      message: 'Route not found'

    });

  }

});

    app.get('/fullroute/:busNumber', (req, res) => {

  const busNumber =
    req.params.busNumber.toLowerCase();

  // FIND ROUTE ID

  const foundRoute =
    routes.find((route) =>

      route.route
        .toLowerCase() === busNumber

    );

  if (!foundRoute) {

    return res.status(404).json({

      error: 'Bus route not found',

    });

  }

  const routeId =
    foundRoute.route_id;

  // LOAD ROUTE FILE

  const filePath = path.join(
    __dirname,
    'hyd-bus-data',
    'route_stops_order',
    `${routeId}.csv`
  );

  fs.readFile(
    filePath,
    'utf8',

    (err, data) => {

      if (err) {

        return res.status(404).json({

          error:
            'Route file not found',

        });

      }

      const lines =
        data
          .trim()
          .split('\n');

      const route =
        lines.map((line) => {

          const parts =
            line.split(',');

          return {

            stop:
              parts[3],

            latitude:
              parseFloat(parts[1]),

            longitude:
              parseFloat(parts[2]),

            crowd: 'Medium',

          };

        });

      res.json(route);

    }
  );

});

// START SERVER

app.listen(3000, () => {

  console.log('Server running on port 3000');

});