import { gql } from '@/types/graphql';
import { disableFragmentWarnings } from 'graphql-tag';

disableFragmentWarnings();

// Queries - NFT
const NFT_QUERY = {
  nfts: {
    query: gql(`
      query Nfts($offset: Int, $limit: Int) {
        nfts(offset: $offset, limit: $limit) {
          ...NftFragmentId
          ...NftFragmentProps
        }
      }
    `),
  },
  nft: {
    query: gql(`
      query Nft($id: ID!) {
        nft(id: $id) {
          ...NftFragmentId
          ...NftFragmentProps
        }
      }
    `),
  },
};

export default NFT_QUERY;
