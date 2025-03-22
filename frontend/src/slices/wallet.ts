import { createSlice } from '@reduxjs/toolkit';
import { STATE, ACTION_PREFIX } from '@/utilities/constants';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/types/state';
import TWallet from '@/types/reducers/wallet';

// State Management - Reducer (Wallet)
const initialState: TWallet = STATE.WALLET;
const walletSlice = createSlice({
  name: ACTION_PREFIX.WALLET,
  initialState,
  reducers: {
    addBuyer: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    buy: (state, action: PayloadAction<Partial<TWallet>>) => {
      const { address, nfts } = action.payload;

      /**
       * With the same address add new purchases to the wallet
       * Otherwise start a new one
       */
      state.nfts = state.address === address ? state.nfts.concat(nfts!) : nfts!;
      state.address = address!;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
  },
});

// Actions
const { addBuyer, buy, setError } = walletSlice.actions;

// Selectors
/**
 * @description Address selector
 * @author Luca Cattide
 * @date 19/03/2025
 * @param {RootState} state
 */
const selectAddress = (state: RootState) => state.wallet.address;

/**
 * @description NFTs selector
 * @author Luca Cattide
 * @date 19/03/2025
 * @param {RootState} state
 */
const selectNfts = (state: RootState) => state.wallet.nfts;

/**
 * @description Wallet error selector
 * @author Luca Cattide
 * @date 21/03/2025
 * @param {RootState} state
 */
const selectError = (state: RootState) => state.wallet.error;

export { addBuyer, buy, setError, selectAddress, selectNfts, selectError };
export default walletSlice.reducer;
