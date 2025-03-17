import { Middleware } from 'redux';
import { RootState } from '@/types/state';
import { ACTION_PREFIX, ACTION } from '@/utilities/constants';

/**
 * @description Wishlist middleware
 * Updates the browser storage to load user's wishlist data
 * @author Luca Cattide
 * @date 17/03/2025
 * @param {*} store
 */
const wishlistMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action: any) => {
    const { ADD, REMOVE } = ACTION.WISHLIST;

    // Action & API check
    if (
      (action.type === ADD || action.type === REMOVE) &&
      window.localStorage
    ) {
      const { id } = action.payload;
      let wishlist = JSON.parse(localStorage.getItem(ACTION_PREFIX.WISHLIST)!);

      // Existing data check
      if (action.type === ADD) {
        wishlist = wishlist && !wishlist.includes(id) ? [...wishlist, id] : [id];
      } else if (action.type === REMOVE) {
        wishlist = [
          ...wishlist.filter((starredId: string) => starredId !== id),
        ];
      }

      localStorage.setItem(ACTION_PREFIX.WISHLIST, JSON.stringify(wishlist));
    }

    return next(action);
  };

export default wishlistMiddleware;
