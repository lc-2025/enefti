'use client';

import { ACTION_PREFIX } from '@/utilities/constants';
import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import TStorage from '@/types/storage';

// Custom Hooks - Storage
/**
 * @description Starred/Added/Bought NFTs
 * It gets the NFTs added to the user wishlist or cart -
 * including checkout - by their IDs from browser storage
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
    wallet: {
      address: '',
      nfts: [],
    },
  });

  useEffect(() => {
    // API check
    if (window.localStorage) {
      const { WISHLIST, CART, WALLET } = ACTION_PREFIX;
      const data = {
        wishlist: localStorage.getItem(WISHLIST),
        cart: localStorage.getItem(CART),
        wallet: localStorage.getItem(WALLET),
      };
      // FIXME: Wallet
      // Data check
      if (data.wishlist || data.cart || data.wallet) {
        console.log(data.wallet);
        Object.entries(data).forEach(([key, value]) => {
          // Data check
          if (value) {
            setStorage((storage) => ({
              ...storage,
              [key]:
                key === WALLET ? JSON.parse(value) : [...JSON.parse(value)],
            }));
          }
        });
      }
    }
  }, []);

  return [storage, setStorage];
};

export default useNftStored;
