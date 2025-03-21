import 'dotenv/config';

// Constants
/**
 * Getting Environment variables via `dotenv`
 * Using environmental-config for per-project generic settings
 * as best-practice
 */
const { NODE_ENV, BASE_URL, PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
// Listen to all interfaces
const HOST = '0.0.0.0';
const PORT_DEFAULT = 4000;
const MESSAGE = {
  LISTEN: 'Server started and listening in',
  MISSING: 'Missing data: ',
  INVALID: 'Invalid input: ',
  EMPTY: 'No existing data',
  CONNECTION: 'DB connected.',
  CONNECTION_CLOSE: 'DB disconnected.',
  CONNECTION_ERROR: 'Cannot connect to DB.',
  SEED_DUMP: 'DB dumped. Populating with fresh data...',
  SEED_DONE: 'DB populated. Closing connection...',
  INPUT: 'BAD_USER_INPUT',
};
const EVENT = {
  ERROR: 'error',
};
const ROUTES = {
  BASE_URL,
  BASE_PATHNAME: '/',
  API: {
    BASE_PATHNAME: '/api',
    GRAPHQL: '/graphql',
    DATABASE: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_NAME}.qgtlq.mongodb.net/?retryWrites=true&w=majority&appName=${DB_NAME}`,
    COINGECKO:
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eth&per_page=100&page=1',
    NFT: {
      GET: '/nft',
      GET_ALL: '/nfts',
    },
    DOCS: {
      BASE_PATHNAME: '/docs',
      REST: '/rest',
    },
  },
};
const ID = '67cf2395af3c7323d084dd3c';
const OWNER = '0x123456789';
const TEST = {
  TIMEOUT: 60000,
  ID,
  OWNER,
  QUERY: {
    NFTS: {
      query: `
        query Nfts {
          nfts {
           id
         }
        }
      `,
    },
    NFT: {
      query: `
        query Nft {
          nft(id: "${ID}") {
            id
          }
        }
      `,
    },
    NFT_UPDATE: {
      query: `
        mutation UpdateNft {
          updateNft(id: "${ID}", owner: "${OWNER}") {
            id
            owner
          }
        }
      `,
    },
    NFT_BAD: {
      query: `
        query Nft {
          nft(id: "foo") {
            id
          }
        }
      `,
    },
  },
};

export { NODE_ENV, HOST, PORT_DEFAULT, PORT, MESSAGE, EVENT, ROUTES, TEST };
