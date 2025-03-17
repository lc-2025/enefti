import { store, rootReducer } from '@/store';
import type { Action, ThunkAction } from '@reduxjs/toolkit';

// Types - State Management
// Infer the type of store
type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof rootReducer>;
type AppDispatch = AppStore['dispatch'];
type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;

export type { AppStore, RootState, AppDispatch, AppThunk };
