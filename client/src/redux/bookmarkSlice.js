// src/redux/bookmarkSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Load bookmarks from localStorage (if any)
const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem('bookmarks');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error loading bookmarks from localStorage:', e);
    return [];
  }
};

// Save bookmarks to localStorage
const saveToLocalStorage = (bookmarks) => {
  try {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } catch (e) {
    console.error('Error saving bookmarks to localStorage:', e);
  }
};

const initialState = {
  bookmarks: loadFromLocalStorage(), // Use localStorage as initial state
};

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      const product = action.payload;
      if (!state.bookmarks.some((item) => item.id === product.id)) {
        state.bookmarks.push(product);
        saveToLocalStorage(state.bookmarks); // Save updated list
      }
    },
    removeBookmark: (state, action) => {
      state.bookmarks = state.bookmarks.filter((item) => item.id !== action.payload);
      saveToLocalStorage(state.bookmarks); // Save updated list
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarkSlice.actions;
export const selectBookmarks = (state) => state.bookmark.bookmarks;
export default bookmarkSlice.reducer;
