const Product = require('../models/Product'); // Import the product model

// Controller to fetch all products
const GateAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Query all products
    res.json({ message: true, products }); // Return the products
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err }); // Error handling
  }
};

module.exports = { GateAllProducts };
