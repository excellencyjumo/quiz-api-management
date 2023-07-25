const { Client } = require('pg');
require("dotenv").config();

// Create a new PostgreSQL client object
const client = new Client({
  host: process.env.LOCALHOST,
  port: process.env.DBPORT,
  database: process.env.DBASE,
  user: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
});

// Connect to the PostgreSQL database
client
  .connect()
  .then(() => {
    console.log('Connected to the PostgreSQL database');
  })
  .catch((error) => {
    console.error('Error connecting to the PostgreSQL database:', error.toString());
  });

module.exports = client;
