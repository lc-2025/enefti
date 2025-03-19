import { createSlice } from '@reduxjs/toolkit';
import { STATE, ACTION_PREFIX } from '@/utilities/constants';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/types/state';
import type { Nft } from '@/types/graphql/graphql';
import TSearch from '@/types/reducers/search';

// State Management - Reducer (Search)
const initialState: TSearch = STATE.SEARCH;
const searchSlice = createSlice({
  name: ACTION_PREFIX.SEARCH,
  initialState,
  reducers: {
    setKey: (state, action: PayloadAction<string>) => {
      state.key = action.payload;
    },
    setNfts: (state, action: PayloadAction<Nft[]>) => {
      state.nfts = action.payload;
    },
  },
});

// Actions
const { setKey, setNfts } = searchSlice.actions;

// Selector
/**
 * @description Search key selector
 * @author Luca Cattide
 * @date 19/03/2025
 * @param {RootState} state
 */
const selectKey = (state: RootState) => state.search.key;

/**
 * @description Found NFTs selector
 * @author Luca Cattide
 * @date 19/03/2025
 * @param {RootState} state
 */
const selectNfts = (state: RootState) => state.search.nfts;

export { setKey, setNfts, selectKey, selectNfts };
export default searchSlice.reducer;
