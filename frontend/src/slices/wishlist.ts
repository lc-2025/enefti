import { createSlice } from '@reduxjs/toolkit';
import { STATE, ACTION_PREFIX } from '@/utilities/constants';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Nft } from '@/types/graphql/graphql';
import type TWishlist from '@/types/reducers/wishlist';
import type { RootState } from '@/types/state';

// State Management - Reducer (Wishlist)
const initialState: TWishlist = STATE.WISHLIST;
const wishlistSlice = createSlice({
  name: ACTION_PREFIX.WISHLIST,
  initialState,
  reducers: {
    openWishlist: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
    addNft: (state, action: PayloadAction<Nft>) => {
      // Immutability is guaranteed by Redux
      state.nfts.push(action.payload);
    },
    addNfts: (state, action: PayloadAction<Nft[]>) => {
      state.nfts = action.payload;
    },
    removeNft: (state, action: PayloadAction<string>) => {
      state.nfts = state.nfts.filter((nft) => nft.id !== action.payload);
    },
  },
});

// Actions
const { openWishlist, addNft, addNfts, removeNft } = wishlistSlice.actions;

// Selectors
/**
 * @description Opening selector
 * @author Luca Cattide
 * @date 18/03/2025
 * @param {RootState} state
 */
const selectOpen = (state: RootState) => state.wishlist.open;

/**
 * @description Starred NFTs selector
 * @author Luca Cattide
 * @date 18/03/2025
 * @param {RootState} state
 */
const selectStarred = (state: RootState) => state.wishlist.nfts;

export { openWishlist, addNft, addNfts, removeNft, selectOpen, selectStarred };
export default wishlistSlice.reducer;
