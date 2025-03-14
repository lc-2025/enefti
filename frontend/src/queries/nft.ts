import { gql } from '@/types/graphql';

// Queries - NFT
const NFT_QUERY = {
  nfts: {
    query: gql(`
      query Nfts($offset: Int, $limit: Int) {
        nfts(offset: $offset, limit: $limit) {
          id
          name
          image
          description
          price
          owner
        }
      }
    `),
  },
};

export default NFT_QUERY;
