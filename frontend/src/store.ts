import { configureStore, combineReducers } from '@reduxjs/toolkit';
import wishlistReducer from './slices/wishlist';
import filterReducer from './slices/filters';
import wishlistMiddleware from './middlewares/wishlist';

// State Management - Store
const rootReducer = combineReducers({
  wishlist: wishlistReducer,
  filter: filterReducer,
});
const store = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(wishlistMiddleware),
  });
};

export { rootReducer, store };
