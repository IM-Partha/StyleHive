import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../searchSlice'; 
import bookmarkReducer from '../bookmarkSlice'; 
import cartReducer from '../cartSlice'; 

const store = configureStore({
  reducer: {
    search: searchReducer,
    bookmark: bookmarkReducer, 
    cart: cartReducer,
  },
});

export default store;
