const express = require('express');
const cors = require('cors');
const router = require('./routes/auth'); // Corrected the import
const Cartrouter = require('./routes/Cartrouter');
require('dotenv').config();
require('./models/db');

const server = express();

// Middlewares
server.use(cors());
server.use(express.json()); // Parse JSON bodies
server.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
server.use('/auth', router);
server.use('/cart', Cartrouter)

server.get('/ping', (req, res) => {
  res.send('PONG');
});


server.listen(process.env.PORT, () => {
  console.log(`Server Running on ${process.env.PORT}`);
});
