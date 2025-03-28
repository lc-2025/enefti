import { gql } from '@/types/graphql';

// Queries - NFT
const NFT_QUERY = {
  nfts: {
    query: gql(`
      query Nfts($ids: [ID!], $search: String, $offset: Int, $limit: Int) {
        nfts(ids: $ids, search: $search, offset: $offset, limit: $limit) {
          ...NftFragmentId
          ...NftFragmentProps
        }
      }
    `),
    mutation: gql(`
      mutation UpdateNfts($ids: [ID!]!, $owner: String!) {
        updateNfts(ids: $ids, owner: $owner) {
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
