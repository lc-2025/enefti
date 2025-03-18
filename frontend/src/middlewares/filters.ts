import { Middleware } from 'redux';
import { RootState } from '@/types/state';
import { ACTION } from '@/utilities/constants';
import { setFilterPriceAsc, setFilterPriceDesc } from '@/slices/filters';
import { Price } from '@/types/reducers/filters';

/**
 * @description Filters middleware
 * Sets the filter type based on user selection
 * @author Luca Cattide
 * @date 18/03/2025
 * @param {*} store
 */
const filtersMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action: any) => {
    // Action check
    if (action.type === ACTION.FILTER.PRICE.VALUE) {
      const { criteria } = action.payload;

      store.dispatch(
        criteria === Price.Ascendant
          ? setFilterPriceAsc()
          : setFilterPriceDesc(),
      );
    }

    return next(action);
  };

export default filtersMiddleware;
