"use client";

import React, { createContext, useContext, useState } from 'react';

interface SearchContextValue {
  query: string;
  setQuery: (value: string) => void;
}

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState('');
  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider');
  }
  return context;
}
