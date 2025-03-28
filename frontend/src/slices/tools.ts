import { createSlice } from '@reduxjs/toolkit';
import { STATE, ACTION_PREFIX } from '@/utilities/constants';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/types/state';
import TTools from '@/types/reducers/tools';

// State Management - Reducer (Tools)
const initialState: TTools = STATE.TOOLS;
const toolsSlice = createSlice({
  name: ACTION_PREFIX.TOOLS,
  initialState,
  reducers: {
    setBack: (state, action: PayloadAction<boolean>) => {
      state.back = action.payload;
    },
  },
});

// Actions
const { setBack } = toolsSlice.actions;

// Selector
/**
 * @description Back selector
 * @author Luca Cattide
 * @date 18/03/2025
 * @param {RootState} state
 */
const selectTools = (state: RootState) => state.tools.back;

export { setBack, selectTools };
export default toolsSlice.reducer;
