import { Middleware } from 'redux';
import { RootState } from '@/types/state';
import { CLASS, ACTION_PREFIX, ACTION } from '@/utilities/constants';

/**
 * @description Wishlist middleware
 * Updates the browser storage to load user's wishlist data
 * @author Luca Cattide
 * @date 17/03/2025
 * @param {*} store
 */
const wishlistMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action: any) => {
    const { type } = action;
    const { OPEN, ADD, REMOVE } = ACTION.WISHLIST;

    // Action & API check
    if ((type === ADD || type === REMOVE) && window.localStorage) {
      const { id } = action.payload;
      let wishlist = JSON.parse(localStorage.getItem(ACTION_PREFIX.WISHLIST)!);

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
