import type TWallet from './reducers/wallet';

// Types - Storage
type TStorage = {
  wishlist: Array<string>;
  cart: Array<string>;
  wallet: Partial<TWallet>;
};

export default TStorage;
