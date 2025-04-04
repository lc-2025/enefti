import { createSlice } from '@reduxjs/toolkit';
import { STATE, ACTION_PREFIX } from '@/utilities/constants';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/types/state';
import type { Nft } from '@/types/graphql/graphql';
import TCart from '@/types/reducers/cart';

// State Management - Reducer (Cart)
const initialState: TCart = STATE.CART;
const cartSlice = createSlice({
  name: ACTION_PREFIX.CART,
  initialState,
  reducers: {
    addNft: (state, action: PayloadAction<Nft>) => {
      state.nfts.push(action.payload);
    },
    addNfts: (state, action: PayloadAction<Nft[]>) => {
      state.nfts = action.payload;
    },
    removeNft: (state, action: PayloadAction<string>) => {
      state.nfts = state.nfts.filter((nft: Nft) => nft.id !== action.payload);
    },
    removeNfts: (state) => {
      state.nfts = STATE.CART.nfts;
    },
  },
});

// Actions
const { addNft, addNfts, removeNft, removeNfts } = cartSlice.actions;

// Selectors
/**
 * @description Search key selector
 * @author Luca Cattide
 * @date 19/03/2025
 * @param {RootState} state
 */
const selectAdded = (state: RootState) => state.cart.nfts;

export { addNft, addNfts, removeNft, removeNfts, selectAdded };
export default cartSlice.reducer;
