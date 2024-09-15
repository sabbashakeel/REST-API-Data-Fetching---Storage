-- Create the table to store the fetched data
CREATE TABLE restAPI (
  id SERIAL PRIMARY KEY,
  data JSONB,
  uid TEXT,
  endpoint TEXT
);
