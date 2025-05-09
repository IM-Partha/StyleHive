const mongoose = require('mongoose');

// Flexible schema definition
const productSchema = new mongoose.Schema({}, { strict: false }); // Allows any structure

// Export the model for the 'products' collection
module.exports = mongoose.model('Products', productSchema, 'products');
