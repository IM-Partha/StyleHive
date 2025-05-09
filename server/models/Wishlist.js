const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: String,
      name: String,
      imageUrl: String,
      price: String,
    },
  ],
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
