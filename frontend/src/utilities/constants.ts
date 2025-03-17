// Constants
const QUERY = {
  // Starting Query offset
  PAGINATION: {
    offset: 0,
    limit: 10,
  },
};

const FILTER = {
  PRICES: [
    { name: 'Low to High', criteria: 'Ascendant' },
    { name: 'High to Low', criteria: 'Descendant' },
  ],
  OWNERS: [{ name: 'My NFTs', criteria: 'Personal collection' }],
};

const STATE = {
  WISHLIST: { nfts: [] },
  FILTER: {
    price: null,
    owner: false,
  },
};

const ACTION_PREFIX = {
  WISHLIST: 'wishlist',
  FILTER: 'filter',
};

const ACTION = {
  WISHLIST: {
    ADD: `${ACTION_PREFIX.WISHLIST}/addNft`,
    REMOVE: `${ACTION_PREFIX.WISHLIST}/removeNft`,
  },
  FILTER: {
    PRICE: {
      ASCENDANT: `${ACTION_PREFIX.FILTER}/filterAsc`,
      DESCENDANT: `${ACTION_PREFIX.FILTER}/filterDesc`,
      RESET: `${ACTION_PREFIX.FILTER}/filterReset`,
    },
  },
};

export { QUERY, FILTER, STATE, ACTION_PREFIX, ACTION };
