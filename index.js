const axios = require('axios');
const { Pool } = require('pg');

// PostgreSQL database connection configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Password',
  port: '5432',
});

// Fetch and store data from each endpoint
async function fetchDataAndStore() {
  try {
    // Fetch UIDs from the main endpoint
    const uids = await fetchRestaurantUIDs();

    // Fetch and store data for each UID
    for (const uid of uids) {
      await fetchAndStoreDataForUID(uid);
    }

    console.log('Data fetching and storing complete.');
  } catch (error) {
    console.error('Error occurred:', error.message);
  } finally {
    // Close the database connection pool
    await pool.end();
  }
}

// Fetch UIDs of all registered restaurants
async function fetchRestaurantUIDs() {
  const url = 'YOUR_URL';
  const apiKey = 'YOUR_API_KEY';
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  const uids = response.data.map((restaurant) => restaurant.uid);
  return uids;
}

// Fetch data from each endpoint for a specific UID and store it in the database
async function fetchAndStoreDataForUID(uid) {
  const endpoints = [
    '/restaurants',
  ];

  for (const endpoint of endpoints) {
    const url = `YOUR_URL${endpoint}`;
    const apiKey = 'YOUR_API_KEY';
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    const data = response.data;
    await storeDataInDatabase(data, uid, endpoint);
  }
}

// Store the fetched data in the PostgreSQL database
async function storeDataInDatabase(data, uid, endpoint) {
  const client = await pool.connect();

  try {
    // Begin a transaction
    await client.query('BEGIN');

    // Store the data in the database (modify this based on your database schema)
    await client.query('INSERT INTO restapi (data, uid, endpoint) VALUES ($1, $2, $3)', [
      JSON.stringify(data),
      uid,
      endpoint,
    ]);

    // Commit the transaction
    await client.query('COMMIT');

    console.log(`Data stored in the database for UID ${uid}, endpoint ${endpoint}`);
  } catch (error) {
    // Rollback the transaction on error
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

// Run the main function to fetch and store the data
fetchDataAndStore();
