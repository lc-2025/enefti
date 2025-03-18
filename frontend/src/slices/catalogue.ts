import { createSlice } from '@reduxjs/toolkit';
import { STATE, ACTION_PREFIX } from '@/utilities/constants';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/types/state';
import TCatalogue from '@/types/reducers/catalogue';

// State Management - Reducer (Catalogue)
const initialState: TCatalogue = STATE.CATALOGUE;
const catalogueSlice = createSlice({
  name: ACTION_PREFIX.CATALOGUE,
  initialState,
  reducers: {
    updateLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
  },
});

// Actions
const { updateLimit } = catalogueSlice.actions;

// Selector
/**
 * @description NFTs query limit selector
 * @author Luca Cattide
 * @date 18/03/2025
 * @param {RootState} state
 */
const selectLimit = (state: RootState) => state.catalogue.limit;

export { updateLimit, selectLimit };
export default catalogueSlice.reducer;
