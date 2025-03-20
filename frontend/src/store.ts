import { configureStore, combineReducers } from '@reduxjs/toolkit';
import themeReducer from './slices/theme';
import searchReducer from './slices/search';
import wishlistReducer from './slices/wishlist';
import filterReducer from './slices/filters';
import catalogueReducer from './slices/catalogue';
import cartReducer from './slices/cart';
import storageMiddleware from './middlewares/storage';
import filtersMiddleware from './middlewares/filters';

/**
 * State Management - Store
 * Using a store as a single-source of truth with Redux
 * allows to get the state across the whole app.
 * Redux comes in help in managing properly
 * the component rendering, so multiple and useless
 * low-performing re-renders are natively avoided
 * (i.e. a common scenario when mixing
 * `State` with `Context` APIs)
 * All side-effects are managed via Middlewares
 */
const rootReducer = combineReducers({
  theme: themeReducer,
  search: searchReducer,
  wishlist: wishlistReducer,
  filter: filterReducer,
  catalogue: catalogueReducer,
  cart: cartReducer,
});
const store = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([storageMiddleware, filtersMiddleware]),
  });
};

export { rootReducer, store };
