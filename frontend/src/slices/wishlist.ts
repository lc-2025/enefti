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
export const { addNft, addNfts, removeNft } = wishlistSlice.actions;

// Selector
export const selectStarred = (state: RootState) => state.wishlist.nfts;

export default wishlistSlice.reducer;
