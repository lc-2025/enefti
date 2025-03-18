import type { Nft } from '../graphql/graphql';

// Types - State Management - Reducer (Wishlist)
type TWishlist = {
  open: boolean;
  nfts: Partial<Nft>[];
};

export default TWishlist;
