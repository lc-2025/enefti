import TWallet from '@/types/reducers/wallet';
import type { Nft } from '@/types/graphql/graphql';

// Utilities - General
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

/**
 * @description Wallet validator
 * Checks if the wallet is valid
 * - Current user purchased something
 * @author Luca Cattide
 * @date 01/04/2025
 * @param {Array<Nft>} purchased
 * @param {Partial<TWallet>} wallet
 * @returns {*}  {boolean}
 */
const isWalletValid = (
  purchased: Array<Nft>,
  wallet: Partial<TWallet>,
): boolean =>
  purchased && purchased.length === 0 && wallet.nfts! && wallet.nfts.length > 0;

/**
 * @description Purchase checker
 * Verifies if the NFTs in the list have been purchased
 * @author Luca Cattide
 * @date 01/04/2025
 * @param {Array<Nft>} purchased
 * @param {string} id
 * @returns {*}  {boolean}
 */
const isPurchased = (purchased: Array<Nft>, id: string): boolean =>
  purchased.some((nft) => nft.id === id);

export { checkNftStatus, getNftIds, isWalletValid, isPurchased };
