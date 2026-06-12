const sqlite3 =
  require('sqlite3').verbose();

const db =
  new sqlite3.Database(
    './database.db',
    (err) => {

      if (err) {

        console.log(
          'Database Error:',
          err
        );

      } else {

        console.log(
          'SQLite Database Connected'
        );

      }

    }
  );

// CREATE USERS TABLE

db.serialize(() => {

  db.run(`

    CREATE TABLE IF NOT EXISTS users (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      name TEXT,

      email TEXT UNIQUE,

      phone TEXT,

      createdAt TEXT

    )

  `);

});

module.exports = db;