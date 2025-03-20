import { addNfts as addNftsWishlist } from '@/slices/wishlist';
import { addNfts as addNftsCart } from '@/slices/cart';
import { ACTION_PREFIX } from './constants';
import { Nft } from '@/types/graphql/graphql';
import TStorage from '@/types/storage';

// Utilities
/**
 * @description Starred/Added NFT checker
 * It verifies if an NFT is present in the user
 * wishlist or cart by its ID
 * @author Luca Cattide
 * @date 17/03/2025
 * @param {string} id
 * @param {string[]} ids
 * @returns {*}  {boolean}
 */
const checkNftStatus = (id: string, ids: Array<string>): boolean =>
  ids.find((existingId: string) => existingId === id) ? true : false;

/**
 * @description Wishlist/Cart state setter
 * Initializes the wishlist or the cart
 * based on starred/added ones
 * @author Luca Cattide
 * @date 19/03/2025
 * @param {string} state
 * @param {Array<Nft>} nfts
 * @param {TStorage} storage
 */
const setState = (state: string, nfts: Array<Nft>, storage: TStorage, dispatch ): void => {
  const { wishlist, cart } = storage;
  const { WISHLIST, CART } = ACTION_PREFIX;
  const action = {
    [WISHLIST]: (): void => {
      dispatch(
        addNftsWishlist(nfts.filter((nft: Nft) => wishlist.includes(nft.id))),
      );
    },
    [CART]: (): void => {
      dispatch(addNftsCart(nfts.filter((nft) => cart.includes(nft.id))));
    },
  };

  action[state]();
};

export { setState, checkNftStatus };
