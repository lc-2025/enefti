import { createSlice } from '@reduxjs/toolkit';
import { STATE, ACTION_PREFIX } from '@/utilities/constants';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/types/state';
import { TPrice, TFilter } from '@/types/reducers/filters';

// State Management - Reducer (Filters)
const initialState: TFilter = STATE.FILTER;
const filtersSlice = createSlice({
  name: ACTION_PREFIX.FILTER,
  initialState,
  reducers: {
    filterPriceAsc: (state) => {
      state.price = TPrice.Ascendant;
    },
    filterPriceDesc: (state) => {
      state.price = TPrice.Descendant;
    },
    filterPriceReset: (state) => {
      state.price = initialState.price;
    },
    filterOwner: (state, action: PayloadAction<boolean>) => {
      state.owner = action.payload;
    },
  },
});

// Actions
export const { filterPriceAsc, filterPriceDesc, filterPriceReset } =
  filtersSlice.actions;

// Selector
export const selectFilterPrice = (state: RootState) => state.filter.price;
export const selectFilterOwner = (state: RootState) => state.filter.owner;

export default filtersSlice.reducer;
