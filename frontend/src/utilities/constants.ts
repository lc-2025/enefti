import NFT_QUERY from '@/queries/nft';

// Utilities - Constants
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
const TOOLS = {
  BACK: {
    ACTION: 'scroll',
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
  TOOLS: {
    back: false,
  },
  SEARCH: {
    key: '',
    nfts: [],
  },
  WISHLIST: {
    open: false,
    nfts: [],
  },
  FILTER: {
    price: {
      value: null,
      order: null,
    },
    owner: false,
  },
  CATALOGUE: {
    offset: QUERY.PAGINATION.offset,
    limit: QUERY.PAGINATION.limit,
  },
  CART: {
    nfts: [],
  },
  WALLET: {
    address: '',
    nfts: [],
    error: false,
  },
};
const ACTION_PREFIX = {
  THEME: 'theme',
  TOOLS: 'tools',
  SEARCH: 'search',
  WISHLIST: 'wishlist',
  FILTER: 'filter',
  CATALOGUE: 'catalogue',
  CART: 'cart',
  WALLET: 'wallet',
};
const ACTION = {
  THEME: {
    SELECT: `${ACTION_PREFIX.WISHLIST}/setTheme`,
  },
  TOOLS: {
    SET: `${ACTION_PREFIX.TOOLS}/setBack`,
  },
  SEARCH: {
    NFTS: `${ACTION_PREFIX.SEARCH}/setNfts`,
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
    UPDATE_OFFSET: `${ACTION_PREFIX.CATALOGUE}/updateOffset`,
    UPDATE_LIMIT: `${ACTION_PREFIX.CATALOGUE}/updateOffset`,
  },
  CART: {
    ADD: `${ACTION_PREFIX.CART}/addNft`,
    REMOVE: `${ACTION_PREFIX.CART}/removeNft`,
    RESET: `${ACTION_PREFIX.CART}/removeNfts`,
  },
  WALLET: {
    BUY: `${ACTION_PREFIX.WALLET}/buy`,
  },
};
const ANIMATION = {
  HEADER: {
    INITIAL: { opacity: 0, y: '-100%' },
    ANIMATE: { opacity: 1, y: 0 },
    TRANSITION: { type: 'tween' },
  },
  MODAL: {
    OPTIONS: { duration: 0.2 },
  },
  FILTER: {
    INITIAL: { opacity: 0, y: '100%' },
    ANIMATE: { opacity: 1, y: 0 },
    TRANSITION: { delay: 0.8 },
  },
  NFT: {
    LIST: {
      ANIMATE: {
        height: 'auto',
      },
      OPTIONS: {
        duration: 0.1,
      },
    },
    DETAILS: {
      IMAGE: {
        INITIAL: {
          opacity: 0,
          scale: -1,
        },
        ANIMATE: {
          opacity: 1,
          scale: 1,
        },
        TRANSITION: {
          type: 'spring',
        },
      },
      TITLE: {
        TRANSITION: {
          delay: 0.2,
        },
      },
      DESCRIPTION: {
        TRANSITION: {
          delay: 0.4,
        },
      },
      OWNER: {
        TRANSITION: {
          delay: 0.6,
        },
      },
    },
  },
};
const NFTS = [
  {
    id: '123456789',
    name: 'Foo',
    description: 'bar',
    image: '',
    price: 0.0001,
    owner: '0x00a1',
    count: 2,
  },
  {
    id: '12345678910',
    name: 'Zoo',
    description: 'lel',
    image: '',
    price: 0.0002,
    owner: '0x00a2',
    count: 2,
  },
];
const TEST = {
  ID: {
    LOGO: 'logo',
    MORE: 'more',
    CATALOGUE_LIST: 'catalogue-list',
    CATALOGUE_FILTER: 'catalogue-filter',
    LIST_ELEMENT: 'list-element',
    ELEMENT_PRICE: 'element-price',
    ICON: {
      WISHLIST: 'icon-wishlist',
      CART: 'icon-cart',
    },
    BUTTON: {
      WISHLIST: 'button-wishlist',
      CART: 'button-cart',
    },
    NFT: 'nft-details',
    BACK: 'back-to-top',
    WISHLIST_BUTTON: {
      OPEN: 'wishlist-open',
      CLOSE: 'wishlist-close',
    },
    CHECKOUT_BUTTON: 'checkout-button',
    BUY: {
      BUTTON: 'buy',
      MESSAGE: 'buy-message',
      FIELD: 'buy-field'
    },
    PURCHASES_BUTTON: 'purchases-button',
    ERROR: 'error',
  },
  REQUEST: {
    QUERY: {
      NFTS: {
        request: {
          query: NFT_QUERY.nfts.query,
          variables: {
            search: NFTS[0].name,
          },
        },
        result: {
          data: {
            nfts: NFTS.map((nft) => ({ __typename: 'Nfts', ...nft })),
          },
        },
      },
    },
  },
  INPUT: {
    ADDRESS:'0x279d13c64171431b9ec4960654c15482'
  }
};

export {
  WINDOW,
  THEME,
  TOOLS,
  CLASS,
  QUERY,
  FILTER,
  STATE,
  ACTION_PREFIX,
  ACTION,
  ANIMATION,
  NFTS,
  TEST,
};
