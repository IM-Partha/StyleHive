const express = require('express');
const Cart = require('../models/Cart');
const authMiddleware = require('../middleware/authMiddleware');  // Add your authentication middleware
const Cartrouter = express.Router();

// Add item to cart
Cartrouter.post('/add', authMiddleware, async (req, res) => {
  const { productId, name, price, quantity } = req.body;
  const userId = req.user.id; // Get user ID from authentication

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // Create new cart if one does not exist
      cart = new Cart({ user: userId, items: [{ productId, name, price, quantity }] });
    } else {
      // Check if the product already exists in the cart
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (itemIndex > -1) {
        // Update the quantity if product is already in the cart
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new product to the cart
        cart.items.push({ productId, name, price, quantity });
      }
    }

    // Save the cart
    await cart.save();
    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove item from cart
Cartrouter.delete('/remove', authMiddleware, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(400).json({ message: 'Cart not found' });
    }

    // Remove product from the cart
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();

    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's cart
Cartrouter.get('/', authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.productId');

    if (!cart) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    res.status(200).json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update item quantity in cart
Cartrouter.put('/update', authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(400).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex === -1) {
      return res.status(400).json({ message: 'Item not found in cart' });
    }

    // Update item quantity
    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    res.status(200).json({ message: 'Cart updated', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = Cartrouter;
