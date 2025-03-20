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

export default checkNftStatus;
