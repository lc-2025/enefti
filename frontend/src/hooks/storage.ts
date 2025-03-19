'use client';

import { ACTION_PREFIX } from '@/utilities/constants';
import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import TStorage from '@/types/storage';

// Custom Hooks - Storage
/**
 * @description Starred/Added NFTs
 * It gets the NFTs added to the user wishlist or cart
 * by their IDs from browser storage
 * @author Luca Cattide
 * @date 17/03/2025
 * @returns {*}  {Array<string>}
 */
const useNftStored = (): (TStorage | Dispatch<SetStateAction<TStorage>>)[] => {
  // Hooks
  /**
   * This is an example of local state
   * Used at hook level to manage external API - Browser `storage`
   */
  const [storage, setStorage] = useState<TStorage>({
    wishlist: [],
    cart: [],
  });

  useEffect(() => {
    // API check
    if (window.localStorage) {
      const { WISHLIST, CART } = ACTION_PREFIX;
      const data = {
        wishlist: localStorage.getItem(WISHLIST),
        cart: localStorage.getItem(CART),
      };

      // Data check
      if (data.wishlist || data.cart) {
        Object.entries(data).forEach(([key, value]) => {
          setStorage((storage) => ({
            ...storage,
            [key]: value ? [...JSON.parse(value)] : [],
          }));
        });
      }
    }
  }, []);

  return [storage, setStorage];
};

export default useNftStored;
