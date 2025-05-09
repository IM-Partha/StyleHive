const express = require('express');
const { AddtoCart, GateCart, RemoveCart ,Clearcart} = require('../controllers/cartcontroller');
const Cartroute = express.Router();  

Cartroute.post('/addcart', AddtoCart);
Cartroute.get('/getcart/:userId', GateCart);
Cartroute.post('/removecart', RemoveCart);
Cartroute.post('/clearcart', Clearcart);
module.exports = Cartroute;
