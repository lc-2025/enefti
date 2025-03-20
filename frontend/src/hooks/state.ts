import { useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { ACTION_PREFIX } from '@/utilities/constants';
import { addNfts as addNftsWishlist } from '@/slices/wishlist';
import { addNfts as addNftsCart } from '@/slices/cart';
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
  const dispatch = useAppDispatch();
  const { wishlist, cart } = storage;
  const { WISHLIST, CART } = ACTION_PREFIX;
  const action = {
    [WISHLIST]: (): void => {
      dispatch(
        addNftsWishlist(nfts.filter((nft) => wishlist.includes(nft.id))),
      );
    },
    [CART]: (): void => {
      dispatch(addNftsCart(nfts.filter((nft) => cart.includes(nft.id))));
    },
  };

  useEffect(() => {
    actions.forEach((type) => {
      action[type]();
    });
  }, [wishlist, cart]);
};

export { useAppDispatch, useAppSelector, useAppStore, useAppState };
