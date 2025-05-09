const Wishlist = require('../models/Wishlist'); 



const AddwishlistData = async (req, res) => {
  const { userId, productId, name, imageUrl, price } = req.body;

  try {
    // Log request body for debugging
    // console.log('Received data:', { userId, productId, name, imageUrl, price });

    // Validate all required fields
    if (!userId || !productId || !name || !imageUrl || !price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Find wishlist for the given userId
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      // Create a new wishlist if not found
      wishlist = new Wishlist({
        userId,
        products: [{ productId: productId.toString(), name, imageUrl, price }],
      });
    } else {
      // Check for duplicate product in wishlist
      const productExists = wishlist.products.some(
        (product) => product.productId.toString() === productId.toString()
      );

      if (productExists) {
        return res.status(400).json({ message: 'Product already in wishlist' });
      }

      // Add product if it doesn't already exist
      wishlist.products.push({ productId: productId.toString(), name, imageUrl, price });
    }

    // Save wishlist to DB
    await wishlist.save();

    // Success response
    res.status(200).json({ message: 'Product added to wishlist', wishlist });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ error: 'Failed to add product to wishlist' });
  }
};

module.exports = AddwishlistData;



const GateAllwishlist =async (req,res)=>{
  try {
    // Retrieve userId from the request (for simplicity, assuming it's sent directly in the request body)
    const { userId } = req.params; // You can modify this to get the userId from the request in the appropriate way
    console.log(userId)
    if (!userId) {
      return res.status(400).json({
        status: 'error',
        message: 'User ID is required',
      });
    }

    // Fetch the wishlist from the database for the given userId
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({
        status: 'error',
        message: 'Wishlist not found for the user',
      });
    }

    // Return the wishlist data
    return res.status(200).json({
      status: 'success',
      data: wishlist.products, // assuming `products` is the array of products in the wishlist
    });
  } catch (error) {
    // Handle any other errors (e.g., database issues, etc.)
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
}

const RemovewishlistData = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    if (!userId || !productId) {
      return res.status(400).json({
        status: 'error',
        message: 'userId and productId are required',
      });
    }

    // Find the wishlist
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({
        status: 'error',
        message: 'Wishlist not found for this user',
      });
    }

    // Filter out the product by productId (as string)
    wishlist.products = wishlist.products.filter(
      (product) => product.productId !== productId
    );

    await wishlist.save();

    return res.status(200).json({
      status: 'success',
      message: 'Product removed from wishlist',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};


module.exports = { AddwishlistData,GateAllwishlist,RemovewishlistData };
