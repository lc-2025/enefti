import { gql } from '@apollo/client';

// Queries - NFT
const NFT_QUERY = {
  nfts: {
    query: gql`
      query Nfts {
        nfts {
          id
          name
          image
          description
          price
          owner
        }
      }
    `,
  },
};

export default NFT_QUERY;
