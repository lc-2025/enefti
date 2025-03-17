import type { Nft } from '../graphql/graphql';

// Types - State Management - Reducer (Wishlist)
type TWishlist = {
  nfts: Partial<Nft>[];
};

export default TWishlist;
