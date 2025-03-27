import { gql } from '@/types/graphql';

// NFT - Query Fragments
const NFT_FRAGMENT = {
  ID: gql(`
    fragment NftFragmentId on Nft {
      id
    }
  `),
  PROPS: gql(`
    fragment NftFragmentProps on Nft {
      name
      image
      description
      price
      owner
      count
    }
  `),
};

export default NFT_FRAGMENT;
