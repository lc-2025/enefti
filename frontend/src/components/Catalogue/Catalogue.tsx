'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { useSuspenseQuery } from '@apollo/client';
import CatalogueList from '@/components/Catalogue/CatalogueList';
import Filter from '../Filter';
import Empty from '../Empty';
import CustomError from '../CustomError';
import updateCache from '@/utilities/graphql';
import NFT_QUERY from '@/queries/nft';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks/state';
import { selectLimit, updateLimit } from '@/slices/catalogue';
import { selectFilterOwner, selectFilterPrice, selectFilterPriceOrder } from '@/slices/filters';
import { QUERY, FILTER } from '@/utilities/constants';
import { Price } from '@/types/reducers/filters';
import type { Nft } from '@/types/graphql/graphql';

/**
 * @description  NFTs Catalogue
 * @author Luca Cattide
 * @date 14/03/2025
 * @returns {*}  {React.ReactNode}
 */
const Catalogue = (): React.ReactNode => {
  // Hooks
  const limit = useSelector(selectLimit);
  const filterPrice = useSelector(selectFilterPrice);
  const filterPriceOrder = useSelector(selectFilterPriceOrder);
  const filterOwner = useSelector(selectFilterOwner);
  const { data, error, fetchMore } = useSuspenseQuery(NFT_QUERY.nfts.query, {
    variables: { ...QUERY.PAGINATION, limit },
  });
  const dispatch = useAppDispatch();

  // Helpers
  /**
   * @description Catalogue filters handler
   * Sorts the catalogue based on filters
   * @author Luca Cattide
   * @date 18/03/2025
   * @returns {*}  {Array<Nft>}
   */
  const handleFilters = (): Array<Nft> => {
    let catalogue = [...data.nfts as Array<Nft>];

    // Price filter check
    if (filterPrice) {
      catalogue = [...catalogue.sort((a: Nft, b: Nft) =>
        filterPriceOrder === Price.Ascendant ? a.price! - b.price! : b.price! - a.price!,
      )];
    }
    // Owner filter check
    if (filterOwner) {
      // TODO: Update with user address after checkout implementation
      catalogue = [...catalogue.filter((nft) => nft.owner === '')];
    }

    return catalogue;
  };

  /**
   * @description Pagination handler
   * @author Luca Cattide
   * @date 14/03/2025
   */
  const handleMore = (): void => {
    fetchMore({
      variables: {
        offset: data.nfts?.length,
        limit,
      },
      /**
       * Update cache by concatenating the incoming list items
       * with the existing ones
       */
      updateQuery(previousData, { fetchMoreResult, variables: { offset } }) {
        // Slicing to preserve immutability
        const updatedFeed = previousData.nfts!.slice(0);

        return {
          ...previousData,
          feed: updateCache(updatedFeed, fetchMoreResult.nfts, offset!),
        };
      },
    }).then((fetchMoreResult) => {
      // Update current offset
      dispatch(
        updateLimit(data.nfts!.length + fetchMoreResult.data.nfts!.length),
      );
    });
  };

  return error ? (
    <CustomError error={error} />
  ) : !data ? (
    notFound()
  ) : (
    <div className="catalogue__container flex flex-wrap">
      {/* Filters Start */}
      <aside className="catalogue__filters w-1/6 pr-6 pb-6 pl-6">
        <h2 className="filters__title title mb-12 uppercase">Filters</h2>
        <Filter
          title="By Price"
          filters={FILTER.PRICES}
          type={FILTER.TYPE.RADIO}
        />
        <Filter
          title="By Purchase"
          filters={FILTER.OWNERS}
          type={FILTER.TYPE.CHECK}
        />
      </aside>
      {/* Filters End */}
      {handleFilters().length > 0 ? (
        <>
          <CatalogueList nfts={handleFilters()} />
          {/* Pagination Start */}
          <aside className="catalogue__more mt-16 mb-16 flex basis-full justify-center">
            <h2 className="more__title hidden">More</h2>
            <button
              className="more__button btn btn-secondary cursor-pointer uppercase select-none"
              onClick={handleMore}
              tabIndex={data.nfts!.length + 1}
            >
              Load more
            </button>
          </aside>
          {/* Pagination End */}
        </>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default Catalogue;
