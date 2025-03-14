import '../env.ts';

// Constants
const { NODE_ENV, BACKEND_URL } = process.env;
const QUERY = {
  // Starting Query offset
  PAGINATION: {
    offset: 0,
    limit: 10,
  },
};

export { NODE_ENV, BACKEND_URL, QUERY };
