const express = require('express');
const { AddwishlistData, GateAllwishlist, RemovewishlistData } = require('../controllers/wishController');
const Wishlistroute = express.Router();  // Use express.Router()

Wishlistroute.post('/add', AddwishlistData);
Wishlistroute.post('/remove', RemovewishlistData);
Wishlistroute.get('/gate/:userId', GateAllwishlist);


module.exports = Wishlistroute;
