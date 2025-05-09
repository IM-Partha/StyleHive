const express = require('express');
const { GateAllProducts } = require('../controllers/Productcontroller');
const Productroutes = express.Router();  // Use express.Router()

Productroutes.get('/all', GateAllProducts);



module.exports = Productroutes;
