'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import { useQueryRefHandlers, useReadQuery, QueryRef } from '@apollo/client';
import CatalogueList from '@/components/Catalogue/CatalogueList';
import Filter from '../Filter';
import CustomError from '../CustomError';
import updateCache from '@/utilities/graphql';

/**
 * @description  NFTs Catalogue
 * @author Luca Cattide
 * @date 14/03/2025
 * @param {{ queryRef: QueryRef }} { queryRef }
 * @returns {*}  {React.ReactNode}
 */
const Catalogue = ({ queryRef }: { queryRef: QueryRef }): React.ReactNode => {
  const [limit, setLimit] = useState(10);
  const { data, error } = useReadQuery(queryRef);
  const { fetchMore } = useQueryRefHandlers(queryRef);
  const filter = {
    prices: [
      { name: 'Low to High', criteria: 'Ascendant' },
      { name: 'High to Low', criteria: 'Descendant' },
    ],
    owners: [
      { name: 'My NFTs', criteria: 'Personal collection' },
      { name: 'All', criteria: 'From eNefti' },
    ],
  };

  // Helpers
  /**
   * @description Pagination handler
   * @author Luca Cattide
   * @date 14/03/2025
   */
  const handleMore = (): void => {
    fetchMore({
      variables: {
        offset: data.nfts.length,
        limit,
      },
      /**
       * Update cache by concatenating the incoming list items
       * with the existing ones
       */
      updateQuery(previousData, { fetchMoreResult, variables: { offset } }) {
        // Slicing to preserve immutability
        const updatedFeed = previousData.feed.slice(0);

        return {
          ...previousData,
          feed: updateCache(updatedFeed, fetchMoreResult.nfts, offset),
        };
      },
    }).then((fetchMoreResult) => {
      // Update current offset
      setLimit(data.nfts.length + fetchMoreResult.data.nfts.length);
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
        <Filter title="By Price" filters={filter.prices} />
        <Filter title="By Purchase" filters={filter.owners} />
      </aside>
      {/* Filters End */}
      <CatalogueList nfts={data.nfts} />
      {/* Pagination Start */}
      <aside className="catalogue__more mt-16 mb-16 flex basis-full justify-center">
        <h2 className="more__title hidden">More</h2>
        <button
          className="more__button btn btn-secondary cursor-pointer uppercase select-none"
          onClick={handleMore}
        >
          Load more
        </button>
      </aside>
      {/* Pagination End */}
    </div>
  );
};

export default Catalogue;
