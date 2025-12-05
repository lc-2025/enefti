import 'dotenv/config';
import Joi from 'joi';

// Constants
/**
 * Getting Environment variables via `dotenv`
 * Using environmental-config for per-project generic settings
 * as best-practice
 */
const { NODE_ENV, BASE_URL, PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
// Listen to all interfaces
const HOST = '0.0.0.0';
const HEADER = {
  XFP: 'x-forwarded-proto',
};
const PROTOCOL = {
  HTTPS: 'https',
};
const PORT_DEFAULT = 4000;
const RATE_LIMIT = {
  WINDOW: 15 * 60 * 1000,
  MAX_REQUESTS: 100,
};
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
  VALIDATION: 'Invalid query string',
  SERVER: 'Internal server error',
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
const ID = '67e5339e1953e86db0b6e40a';
const OWNER = '0x279d13c64171431b9ec4960654c15482';
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
        mutation UpdateNfts {
          updateNfts(ids: ["${ID}"], owner: "${OWNER}") {
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
const QUERY_VALIDATION = {
  search: Joi.string().alphanum(),
  ids: Joi.string(),
  id: Joi.string().alphanum(),
  owner: Joi.string().alphanum().min(26).max(35),
};

export {
  NODE_ENV,
  HOST,
  HEADER,
  PROTOCOL,
  PORT_DEFAULT,
  PORT,
  RATE_LIMIT,
  MESSAGE,
  EVENT,
  ROUTES,
  TEST,
  QUERY_VALIDATION,
};
