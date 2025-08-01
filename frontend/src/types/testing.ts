import { RenderOptions } from '@testing-library/react';
import { RootState, AppStore } from './state';

// Types - Testing
// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface IExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export default IExtendedRenderOptions;
