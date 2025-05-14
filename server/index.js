const express = require('express');
const cors = require('cors');
const router = require('./routes/auth'); // Import the auth routes
const Cartrouter = require('./routes/Cartrouter'); // Import the cart routes
const wishlistRouter = require('./routes/Wishlistroute'); // Import the wishlist routes
const Productroutes = require('./routes/Productsroute');
const Cartroute = require('./routes/Cartroute');


require('dotenv').config();
require('./models/db'); // Ensure you have your DB connection setup

const server = express();

// Middleware
server.use(cors());
server.use(express.json()); // Parse JSON bodies
server.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
server.use('/auth', router); // Authentication routes
server.use('/cart', Cartrouter); // Cart routes


// server.use('/api/wishlist', wishlistRouter); 
server.use('/api/cart', Cartroute); 
server.use('/api/products',Productroutes ); 


// Ping endpoint for testing
server.get('/ping', (req, res) => {
  res.send('PONG');
});

// Start the server
server.listen(process.env.PORT, () => {
  console.log(`Server Running on ${process.env.PORT}`);
});
