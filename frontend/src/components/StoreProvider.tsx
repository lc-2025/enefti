'use client';

import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { AppStore } from '@/types/state';

// State Management - Store Provider
const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore | null>(null);

  /**
   * Reference check
   * Ensures to create the store once during rendering
   */
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
