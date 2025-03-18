import { createSlice } from '@reduxjs/toolkit';
import { STATE, ACTION_PREFIX } from '@/utilities/constants';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/types/state';
import TTheme from '@/types/reducers/theme';

// State Management - Reducer (Theme)
const initialState: TTheme = STATE.THEME;
const themeSlice = createSlice({
  name: ACTION_PREFIX.THEME,
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.selected = action.payload;
    },
  },
});

// Actions
const { setTheme } = themeSlice.actions;

// Selector
/**
 * @description Theme selector
 * @author Luca Cattide
 * @date 18/03/2025
 * @param {RootState} state
 */
const selectTheme = (state: RootState) => state.theme.selected;

export { setTheme, selectTheme };
export default themeSlice.reducer;
