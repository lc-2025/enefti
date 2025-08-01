import { createSlice } from '@reduxjs/toolkit';
import { STATE, ACTION_PREFIX } from '@/utilities/constants';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/types/state';
import { Price, TFilter, TFilterProps } from '@/types/reducers/filters';

// State Management - Reducer (Filters)
const initialState: TFilter = STATE.FILTER;
const filtersSlice = createSlice({
  name: ACTION_PREFIX.FILTER,
  initialState,
  reducers: {
    setFilterPrice: (state, action: PayloadAction<TFilterProps>) => {
      state.price.value = action.payload;
    },
    setFilterPriceAsc: (state) => {
      state.price.order = Price.Ascendant;
    },
    setFilterPriceDesc: (state) => {
      state.price.order = Price.Descendant;
    },
    setFilterPriceReset: (state) => {
      state.price.value = initialState.price.value;
      state.price.order = initialState.price.order;
    },
    setFilterOwner: (state, action: PayloadAction<boolean>) => {
      state.owner = action.payload;
    },
  },
});

// Actions
const {
  setFilterPrice,
  setFilterPriceAsc,
  setFilterPriceDesc,
  setFilterPriceReset,
  setFilterOwner,
} = filtersSlice.actions;

// Selectors
/**
 * @description Price filter value selector
 * @author Luca Cattide
 * @date 18/03/2025
 * @param {RootState} state
 */
const selectFilterPrice = (state: RootState) => state.filter.price.value;

/**
 * @description Price filter order selector
 * @author Luca Cattide
 * @date 18/03/2025
 * @param {RootState} state
 */
const selectFilterPriceOrder = (state: RootState) => state.filter.price.order;

/**
 * @description Owner filter selector
 * @author Luca Cattide
 * @date 18/03/2025
 * @param {RootState} state
 */
const selectFilterOwner = (state: RootState) => state.filter.owner;

export {
  setFilterPrice,
  setFilterPriceAsc,
  setFilterPriceDesc,
  setFilterPriceReset,
  setFilterOwner,
  selectFilterPrice,
  selectFilterPriceOrder,
  selectFilterOwner,
};
export default filtersSlice.reducer;
