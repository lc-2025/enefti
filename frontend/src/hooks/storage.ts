import { useEffect, useState } from 'react';
import { ACTION_PREFIX } from '../utilities/constants';
import type { Dispatch, SetStateAction } from 'react';

// Custom Hooks - Storage
/**
 * @description Starred NFTs
 * It gets the NFTs added to the user wishlist
 * by their IDs from browser storage
 * @author Luca Cattide
 * @date 17/03/2025
 * @returns {*}  {Array<string>}
 */

const useStarredNft = (): (string[] | Dispatch<SetStateAction<string[]>>)[] => {
  // Hooks
  const [starred, setStarred] = useState<Array<string>>([]);

  useEffect(() => {
    // API check
    if (window.localStorage) {
      const wishlist = localStorage.getItem(ACTION_PREFIX.WISHLIST);

      // Data check
      if (wishlist) {
        setStarred([...JSON.parse(wishlist)]);
      }
    }
  }, []);

  return [starred, setStarred];
};

export default useStarredNft;
