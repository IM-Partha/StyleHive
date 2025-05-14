// src/Redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Function to get the initial cart from localStorage
const getInitialCart = () => {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : [];
};

const initialState = {
  cart: getInitialCart(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.cart.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }

      // Update localStorage after modification
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    increaseQuantity: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload.id);
      if (product) {
        product.quantity += 1;
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    decreaseQuantity: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload.id);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem('cart'); // Clear localStorage as well
    },
  },
});

// Correct selector export
export const selectCart = (state) => state.cart.cart;

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
