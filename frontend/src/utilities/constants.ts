// Constants
const WINDOW = {
  MEDIA: {
    THEME: '(prefers-color-scheme: dark)',
  },
};
const THEME = {
  LABEL: 'theme',
  NAME: {
    LIGHT: 'light',
    DARK: 'dark',
  },
};
const CLASS = {
  MODAL: 'modal',
};
const QUERY = {
  // Starting Query offset
  PAGINATION: {
    offset: 0,
    limit: 10,
  },
};
const FILTER = {
  TYPE: {
    RADIO: 'radio',
    CHECK: 'checkbox',
  },
  PRICES: [
    { name: 'Low to High', criteria: 'Ascendant' },
    { name: 'High to Low', criteria: 'Descendant' },
  ],
  OWNERS: [{ name: 'My NFTs', criteria: 'Personal collection' }],
};
const STATE = {
  THEME: {
    selected: THEME.NAME.LIGHT,
  },
  WISHLIST: { open: false, nfts: [] },
  FILTER: {
    price: {
      value: null,
      order: null,
    },
    owner: false,
  },
  CATALOGUE: {
    limit: QUERY.PAGINATION.limit,
  },
};
const ACTION_PREFIX = {
  THEME: 'theme',
  WISHLIST: 'wishlist',
  FILTER: 'filter',
  CATALOGUE: 'catalogue',
};
const ACTION = {
  THEME: {
    SELECT: `${ACTION_PREFIX.WISHLIST}/setTheme`,
  },
  WISHLIST: {
    OPEN: `${ACTION_PREFIX.WISHLIST}/openWishlist`,
    ADD: `${ACTION_PREFIX.WISHLIST}/addNft`,
    ADD_MANY: `${ACTION_PREFIX.WISHLIST}/addNfts`,
    REMOVE: `${ACTION_PREFIX.WISHLIST}/removeNft`,
  },
  FILTER: {
    PRICE: {
      VALUE: `${ACTION_PREFIX.FILTER}/setFilterPrice`,
      ASCENDANT: `${ACTION_PREFIX.FILTER}/setFilterPriceAsc`,
      DESCENDANT: `${ACTION_PREFIX.FILTER}/setFilterPriceDesc`,
      RESET: `${ACTION_PREFIX.FILTER}/setFilterPriceReset`,
      OWNER: `${ACTION_PREFIX.FILTER}/setFilterOwner`,
    },
  },
  CATALOGUE: {
    UPDATE: `${ACTION_PREFIX.CATALOGUE}/updateLimit`,
  },
};

export { WINDOW, THEME, CLASS, QUERY, FILTER, STATE, ACTION_PREFIX, ACTION };
