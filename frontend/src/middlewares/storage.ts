import { Middleware } from 'redux';
import { RootState } from '@/types/state';
import { CLASS, ACTION_PREFIX, ACTION } from '@/utilities/constants';
import { Nft } from '@/types/graphql/graphql';

/**
 * @description Wishlist/Cart middleware
 * Updates the browser storage to load user's wishlist or cart data
 * @author Luca Cattide
 * @date 17/03/2025
 * @param {*} store
 */
const storageMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action: any) => {
    const { type, payload } = action;
    const { WISHLIST, CART, WALLET } = ACTION;
    let actions = [
      WISHLIST.ADD,
      WISHLIST.REMOVE,
      CART.ADD,
      CART.REMOVE,
      CART.RESET,
      WALLET.BUY,
    ];

    // Action & API check
    if (actions.includes(type) && window.localStorage) {
      const data = {
        [ACTION_PREFIX.WISHLIST]: null,
        [ACTION_PREFIX.CART]: null,
        [ACTION_PREFIX.WALLET]: null,
      };
      const dataType = actions
        .find((action) => action.includes(type))
        ?.split('/')[0];

      Object.keys(data).forEach((key) => {
        data[key] = JSON.parse(localStorage.getItem(key)!);
      });

      // Data initialization - Add action check
      if (type === actions[0] || type === actions[2]) {
        const { id } = payload;

        data[dataType!] =
          data[dataType!] && !data[dataType!].includes(id)
            ? [...data[dataType!], id]
            : [id];
      } else if (type === actions[5]) {
        data[dataType!] = {
          ...payload,
          nfts: payload.nfts.map((nft: Nft) => nft.id),
        };
        // Remove action check
      } else if (type === actions[1] || type === actions[3]) {
        data[dataType!] = [
          ...data[dataType!].filter(
            (currentId: string) => currentId !== payload,
          ),
        ];
        // Reset action check
      } else if (type === actions[4]) {
        data[dataType!] = [];
      }
      // Data storage - Data existing check
      if (data[dataType!] || data[dataType!].length > 0) {
        localStorage.setItem(
          dataType!,
          JSON.stringify(data[dataType]),
        );
      } else {
        localStorage.removeItem(dataType!);
      }
    } else if (type === WISHLIST.OPEN) {
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

export default storageMiddleware;
