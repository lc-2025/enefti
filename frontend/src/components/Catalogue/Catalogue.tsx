'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { useSuspenseQuery } from '@apollo/client';
import CatalogueList from '@/components/Catalogue/CatalogueList';
import Empty from '../Empty';
import CustomError from '../CustomError';
import updateCache from '@/utilities/graphql';
import NFT_QUERY from '@/queries/nft';
import { useAppDispatch, useAppSelector } from '@/hooks/state';
import { selectOffset, selectLimit, updateOffset } from '@/slices/catalogue';
import {
  selectFilterOwner,
  selectFilterPrice,
  selectFilterPriceOrder,
} from '@/slices/filters';
import { QUERY } from '@/utilities/constants';
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
  const offset = useAppSelector(selectOffset);
  const limit = useAppSelector(selectLimit);
  const filterPrice = useAppSelector(selectFilterPrice);
  const filterPriceOrder = useAppSelector(selectFilterPriceOrder);
  const filterOwner = useAppSelector(selectFilterOwner);
  const { data, error, fetchMore } = useSuspenseQuery(NFT_QUERY.nfts.query, {
    variables: { ...QUERY.PAGINATION, limit },
    // Caching queries as performance improvement
    fetchPolicy: 'cache-first',
  });
  const dispatch = useAppDispatch();

  // Handlers
  /**
   * @description Catalogue filters handler
   * Sorts the catalogue based on filters
   * @author Luca Cattide
   * @date 18/03/2025
   * @returns {*}  {Array<Nft>}
   */
  const handleFilters = (): Array<Nft> => {
    let catalogue = [...(data.nfts as Array<Nft>)];

    // Price filter check
    if (filterPrice) {
      catalogue = [
        ...catalogue.sort((a: Nft, b: Nft) =>
          filterPriceOrder === Price.Ascendant
            ? a.price! - b.price!
            : b.price! - a.price!,
        ),
      ];
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
        offset: offset > 0 ? offset : offset + data.nfts!.length,
        limit,
      },
      /**
       * Update cache by concatenating the incoming list items
       * with the existing ones
       */
      updateQuery(previousData, { fetchMoreResult, variables: { offset } }) {
        // Slicing to preserve immutability
        const updatedNfts = previousData.nfts!.slice(0);

        return {
          ...previousData,
          nfts: updateCache(updatedNfts, fetchMoreResult.nfts, offset!),
        };
      },
    }).then((fetchMoreResult) => {
      // Update current offset
      dispatch(updateOffset(offset + fetchMoreResult.data.nfts!.length));
      // Track new NFTs on catalogue
      updateCatalogue(fetchMoreResult.data.nfts! as Array<Nft>);
    });
  };

  return error ? (
    <CustomError error={error} />
  ) : !data ? (
    notFound()
  ) : handleFilters().length > 0 ? (
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
  );
};

export default Catalogue;
