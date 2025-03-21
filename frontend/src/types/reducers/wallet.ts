import type { Nft } from '../graphql/graphql';

// Types - State Management - Reducer (Wallet)
type TWallet = {
  address: string;
  nfts: Array<Nft>;
  error: boolean;
};

export default TWallet;
