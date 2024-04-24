// server/testConnection.js
const pgp = require('pg-promise')();

// Replace the connection string with your actual PostgreSQL connection string
const db = pgp('postgres://dell:root@localhost:5432/delivery');

(async () => {
  try {
    // Test the database connection by querying a simple table
    const query = 'SELECT * FROM organization';
    console.log('Executing query:', query);
    db.any(query)
      .then(data => {
        console.log('Query result:', data);
      })
      .catch(error => {
        console.error('Error executing query:', error);
      });
    console.log('Database connection successful!');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    // Close the database connection
    pgp.end();
  }
})();
