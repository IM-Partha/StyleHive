import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allProducts: [], // To store all product data
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = action.payload; // Store the product data in state
    },
  },
});

export const { setAllProducts } = productsSlice.actions;
export default productsSlice.reducer;
