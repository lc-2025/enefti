import { Middleware } from 'redux';
import { RootState } from '@/types/state';
import { CLASS, ACTION_PREFIX, ACTION } from '@/utilities/constants';

/**
 * @description Wishlist/Cart middleware
 * Updates the browser storage to load user's wishlist or cart data
 * @author Luca Cattide
 * @date 17/03/2025
 * @param {*} store
 */
const storageMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action: any) => {
    const { type } = action;
    const { WISHLIST, CART } = ACTION;

    // Action & API check
    if (
      (type === WISHLIST.ADD ||
        type === CART.ADD ||
        type === WISHLIST.REMOVE ||
        type === CART.REMOVE) &&
      window.localStorage
    ) {
      const { id } = action.payload;
      const actions = [ACTION_PREFIX.WISHLIST, ACTION_PREFIX.CART];
      const data = {};

      actions.forEach((action) => {
        data[action] = JSON.parse(localStorage.getItem(action)!);
      })

      // Existing data check
      if (type === ADD) {
        wishlist =
          wishlist && !wishlist.includes(id) ? [...wishlist, id] : [id];
      } else if (type === REMOVE) {
        wishlist = [
          ...wishlist.filter((starredId: string) => starredId !== id),
        ];
      }

      localStorage.setItem(ACTION_PREFIX.WISHLIST, JSON.stringify(wishlist));
    } else if (type === OPEN) {
      const { MODAL } = CLASS;

      // Modal Popup check
      if (action.payload) {
        document.body.classList.add(MODAL);
      } else {
        document.body.classList.remove(MODAL);
      }
    }

    return next(action);
  };

export default wishlistMiddleware;
