import type { Nft } from '@/types/graphql/graphql';

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
 * @description NFT IDs getter
 * Returns a list of NFT IDs
 * @author Luca Cattide
 * @date 22/03/2025
 * @param {Partial<Nft>[]} nfts
 * @returns {*}  {Array<string>}
 */
const getNftIds = (nfts: Partial<Nft>[]): Array<string> =>
  nfts.map((nft) => nft.id!);

export { checkNftStatus, getNftIds };
