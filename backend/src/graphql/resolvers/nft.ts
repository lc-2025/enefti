import { GraphQLResolverMap } from '@apollo/subgraph/dist/schema-helper';
import { Types } from 'mongoose';
import nftModel from '../../models/NFT';
import setFilter from '../../utils/api';
import { setError, setResponse } from '../../utils/graphql';
import { MESSAGE } from '../../utils/constants';

// GraphQL - NFT Resolvers
const resolversNft: GraphQLResolverMap<any> = {
  Query: {
    async nfts(parent, args) {
      const count = await nftModel.countDocuments().exec();
      const nfts = await nftModel
        .aggregate([
          {
            $match: args.search
              ? {
                  name: {
                    $regex: args.search,
                    $options: 'i',
                  },
                }
              : args.ids
                ? setFilter(
                    args.ids.map((id: string) => new Types.ObjectId(id)),
                  )
                : {},
          },
          { $skip: args.offset ?? 0 },
          { $limit: args.limit ?? count },
          {
            $addFields: {
              count,
            },
          },
        ])
        .exec();

      // Data check
      if (!nfts) {
        setError(MESSAGE.EMPTY, '404');
      }

      return setResponse(nfts);
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
    async updateNfts(parent, args) {
      // Requirements check
      if (!args.ids || !args.owner) {
        setError(MESSAGE.INPUT, '400', 'id / owner');
      }

      const { ids, owner } = args;
      const filter = setFilter(ids);
      const nftsUpdated = await nftModel.updateMany(filter, { owner }).exec();

      // Update check
      if (!nftsUpdated) {
        setError(MESSAGE.SERVER, '500');
      }

      const nfts = await nftModel.find(filter).lean().exec();

      // Data check
      if (!nfts) {
        setError(MESSAGE.EMPTY, '404');
      }

      return setResponse(nfts);
    },
  },
};

export default resolversNft;
