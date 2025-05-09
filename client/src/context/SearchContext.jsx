// context/SearchContext.jsx
import React, { createContext, useState, useContext } from 'react';

// Create the context
const SearchContext = createContext();

// Create the provider component
export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

// Create a custom hook to easily use the context
export const useSearchContext = () => useContext(SearchContext);
