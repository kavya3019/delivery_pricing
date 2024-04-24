const express = require('express');
const bodyParser = require('body-parser');
const { calculatePrice } = require('./priceCalculator');
const pgp = require('pg-promise')();
const cors = require('cors'); // Import the cors package
const pool = pgp({
    connectionString: 'postgres://dell:root@localhost:5432/delivery'
  /* your database connection options */
});


const app = express();
const PORT = process.env.PORT || 5000;

// Use the cors middleware
app.use(cors());


// Middleware
app.use(bodyParser.json());
// Define API endpoints for delivery cost calculation
app.post('/calculatePrice', async (req, res) => {
    const { zone, organization_id, total_distance, item_type } = req.body;
console.log(req.body);
    try {
      const client = await pool.connect();
  console.log('hii');
  const basePriceQuery=await client.query('select km_price,base_distance_in_km from pricing  where organization_id=$1 and zone=$2', [organization_id, zone, item_type]);
  const { km_price, base_distance_in_km } = basePriceQuery[0];
  console.log(km_price,base_distance_in_km);
      const totalPrice = calculatePrice( zone, km_price,base_distance_in_km, total_distance, item_type) ; 
  
      res.json({ total_price_in_cents: totalPrice,total_price_in_euros:totalPrice/10 });
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  // Calculate price endpoint
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  