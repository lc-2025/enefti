import { useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { ACTION_PREFIX } from '@/utilities/constants';
import { addNfts as addNftsWishlist, selectStarred } from '@/slices/wishlist';
import { addNfts as addNftsCart, selectAdded } from '@/slices/cart';
import type { AppDispatch, AppStore, RootState } from '../types/state';
import type { Nft } from '@/types/graphql/graphql';
import TStorage from '@/types/storage';

// Custom Hooks - State Management
// Use throughout the app instead of plain `useDispatch` and `useSelector`
const useAppDispatch = useDispatch.withTypes<AppDispatch>();
const useAppSelector = useSelector.withTypes<RootState>();
const useAppStore = useStore.withTypes<AppStore>();
/**
 * @description Wishlist/Cart state setter
 * Initializes the wishlist or the cart
 * based on starred/added ones
 * @author Luca Cattide
 * @date 19/03/2025
 * @param {Array<string>} actions
 * @param {Array<Nft>} nfts
 * @param {TStorage} storage
 */
const useAppState = (
  actions: Array<string>,
  nfts: Array<Nft>,
  storage: TStorage,
): void => {
  const starred = useAppSelector(selectStarred);
  const added = useAppSelector(selectAdded);
  const { wishlist, cart } = storage;
  const dispatch = useAppDispatch();
  const { WISHLIST, CART } = ACTION_PREFIX;
  const action = {
    [WISHLIST]: (): void => {
      // Data check
      if (starred && starred.length === 0 && wishlist.length > 0) {
        dispatch(
          addNftsWishlist(
            nfts.filter(
              (nft) =>
                !starred.some((nftStarred) => nftStarred.id === nft.id) &&
                wishlist.includes(nft.id),
            ),
          ),
        );
      }
    },
    [CART]: (): void => {
      // Data check
      if (added && added.length === 0 && cart.length > 0) {
        dispatch(
          addNftsCart(
            nfts.filter(
              (nft) =>
                !added.some((nftAdded) => nftAdded.id === nft.id) &&
                cart.includes(nft.id),
            ),
          ),
        );
      }
    },
  };

  useEffect(() => {
    actions.forEach((type) => {
      action[type]();
    });
  }, [wishlist, cart]);
};

export { useAppDispatch, useAppSelector, useAppStore, useAppState };
