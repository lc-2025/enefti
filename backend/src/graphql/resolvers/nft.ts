import { GraphQLResolverMap } from '@apollo/subgraph/dist/schema-helper';
import nftModel from '../../models/NFT';
import setError from '../../utils/graphql';
import { MESSAGE } from '../../utils/constants';

// GraphQL - NFT Resolvers
const resolversNft: GraphQLResolverMap<any> = {
  Query: {
    async nfts(parent, args) {
      const nfts = await nftModel
        .find(
          args.search
            ? {
                name: {
                  $regex: args.search,
                  $options: 'i',
                },
              }
            : args.ids
              ? {
                  id: {
                    $in: args.ids,
                  },
                }
              : {},
          null,
          {
            // Query Pagination
            skip: args.offset,
            limit: args.limit,
          },
        )
        .exec();

      // Data check
      if (!nfts) {
        setError(MESSAGE.EMPTY, '404');
      }

      return nfts;
    },
    async nft(parent, args) {
      // Requirements check
      if (!args.id) {
        setError(MESSAGE.INPUT, '400', 'id');
      }

      const nft = await nftModel.findById(args.id).exec();

      // Data check
      if (!nft) {
        setError(MESSAGE.EMPTY, '404');
      }

      return nft;
    },
  },
  Mutation: {
    async updateNft(parent, args) {
      // Requirements check
      if (!args.id || !args.owner) {
        setError(MESSAGE.INPUT, '400', 'id / owner');
      }

      const { id, owner } = args;
      const nft = await nftModel
        .findOneAndUpdate({ _id: id }, { owner }, { new: true })
        .exec();

      // Data check
      if (!nft) {
        setError(MESSAGE.EMPTY, '404');
      }

      return nft;
    },
  },
};

export default resolversNft;
