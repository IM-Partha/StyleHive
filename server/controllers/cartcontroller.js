const Cart = require('../models/Cart')


const AddtoCart = async (req, res) => {
  const { userId, productId, name, imageUrl, price } = req.body;

  try {
    console.log('Received data:', { userId, productId, name, imageUrl, price });

    if (!userId || !productId || !name || !imageUrl || !price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let userCart = await Cart.findOne({ userId });

    if (!userCart) {
      // Create a new cart if not found
      userCart = new Cart({
        userId,
        products: [{ productId, name, imageUrl, price }],
      });
    } else {
      // Check if product already exists
      const productExists = userCart.products.some(
        (product) => product.productId.toString() === productId.toString()
      );

      if (productExists) {
        return res.status(400).json({ message: 'Product already in cart' });
      }

      // Add product to existing cart
      userCart.products.push({ productId, name, imageUrl, price });
    }

    await userCart.save();

    res.status(200).json({ message: 'Product added to cart', cart: userCart });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add product to cart' });
  }
};

const GateCart =async (req,res)=>{
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
    const wishlist = await Cart.findOne({ userId });

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

const RemoveCart =async (req,res )=>{
const { userId, productId } = req.body;

  try {
    if (!userId || !productId) {
      return res.status(400).json({
        status: 'error',
        message: 'userId and productId are required',
      });
    }

    // Find the wishlist
    const wishlist = await Cart.findOne({ userId });

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
}


const Clearcart = async (req,res)=>{
const { userId } = req.body;
  try {
    await Cart.deleteMany({ userId });
    res.json({ status: 'success', message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to clear cart' });
  }
}


module.exports={AddtoCart,GateCart,RemoveCart,Clearcart}