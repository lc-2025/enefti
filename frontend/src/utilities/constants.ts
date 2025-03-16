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

export { QUERY, FILTER };
