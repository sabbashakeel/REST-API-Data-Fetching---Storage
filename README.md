# REST-API-Data-Fetching---Storage
Restaurant Data Fetcher and Storer
This project fetches restaurant data from an API and stores it in a PostgreSQL database. It retrieves restaurant UIDs from a main endpoint, then fetches detailed data for each UID from specified API endpoints, and finally stores the data in a PostgreSQL table.

# Features
Fetch restaurant UIDs from an API.
Retrieve detailed data for each restaurant.
Store the fetched data in a PostgreSQL database.
Transaction handling to ensure data consistency.

# Prerequisites
Node.js installed on your machine.
PostgreSQL installed and configured.
API with valid endpoints and an API key.
Installation
Clone the repository:

# bash
Copy code
npm install axios pg
Configure PostgreSQL in your code: Update the Pool configuration in the code with your PostgreSQL credentials (user, password, database, port).

# Replace the placeholder values:

YOUR_URL: The base URL of your API.
YOUR_API_KEY: Your API key for authorization.
Usage
Ensure your PostgreSQL database is running.

# Run the script:

bash
Copy code
node index.js
The script will:

# Fetch restaurant UIDs from the main API.
Retrieve detailed data for each restaurant from the specified endpoints.
Store the data in the PostgreSQL database under the restapi table.
Database Schema
The data is stored in a PostgreSQL table named restapi with the following structure:

Column	Type	Description
data	JSON	The fetched API data for each restaurant.
uid	Text	The UID of the restaurant.
endpoint	Text	The endpoint from which the data was fetched.
