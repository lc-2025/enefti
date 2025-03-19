import { gql } from '@/types/graphql';

// Queries - NFT
const NFT_QUERY = {
  nfts: {
    query: gql(`
      query Nfts($search: String, $offset: Int, $limit: Int) {
        nfts(search: $search, offset: $offset, limit: $limit) {
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
