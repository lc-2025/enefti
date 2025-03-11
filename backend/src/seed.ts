import axios from 'axios';
import connectDb from './database';
import NFT from './models/NFT';
import setNft from './utils/data';
import { ROUTES, MESSAGE } from './utils/constants';
import TCoin from './types/api/Coin';

/**
 * @description Database seeding
 * Populating DB with starting mocked data
 * - 100 sample NFTs
 * @author Luca Cattide
 * @date 10/03/2025
 * @returns {*}  {Promise<void>}
 */
const seed = async (): Promise<void> => {
  const { connection } = await connectDb();

  // DB Dump
  await NFT.deleteMany({});

  console.log(MESSAGE.SEED_DUMP);

  /**
   * CoinGecko API Data-Fetching
   * Getting random crypto prices to populate mocked data
   */
  axios
    .get(ROUTES.API.COINGECKO)
    .then(async (response) => {
      const coins = response.data as Array<TCoin>;
      const nfts = coins.map((coin, i) => setNft(coin, i));

      // Populate DB
      await NFT.insertMany(nfts);

      console.log(MESSAGE.SEED_DONE);
    })
    .catch((error) => console.error(error))
    .finally(async () => {
      await connection.close();

      console.log(MESSAGE.CONNECTION_CLOSE);
    });
};

seed()
  .then(() => console.log(201))
  .catch((error) => console.error(error));
