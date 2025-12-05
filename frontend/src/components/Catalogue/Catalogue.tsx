'use client';

import React, { Suspense, useState } from 'react';
import { notFound } from 'next/navigation';
import { useQuery } from '@apollo/client';
import CatalogueList from '@/components/Catalogue/CatalogueList';
import CustomLoading from '../Layout/CustomLoading';
import Back from '../Layout/Back';
import Empty from '../Empty';
import Filter from '@/components/Filter';
import NFT_QUERY from '@/queries/nft';
import { useAppDispatch, useAppSelector } from '@/hooks/state';
import {
  selectOffset,
  selectLimit,
  updateOffset,
  updateLimit,
} from '@/slices/catalogue';
import {
  selectFilterOwner,
  selectFilterPrice,
  selectFilterPriceOrder,
} from '@/slices/filters';
import { selectAddress } from '@/slices/wallet';
import { QUERY, TEST, FILTER } from '@/utilities/constants';
import { Price } from '@/types/reducers/filters';
import type { Nft } from '@/types/graphql/graphql';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

/**
 * @description  NFTs Catalogue
 * @author Luca Cattide
 * @date 14/03/2025
 * @returns {*}  {React.ReactNode}
 */
const Catalogue = (): React.ReactNode => {
  const [spinner, setSpinner] = useState<boolean>(false);
  // Hooks
  const offset = useAppSelector(selectOffset);
  const limit = useAppSelector(selectLimit);
  const address = useAppSelector(selectAddress);
  const filterPrice = useAppSelector(selectFilterPrice);
  const filterPriceOrder = useAppSelector(selectFilterPriceOrder);
  const filterOwner = useAppSelector(selectFilterOwner);
  /**
   * Query - Fetches NFTs from DB
   * to initialize state and populate the catalogue
   * - Pagination of 10 records/call support
   */
  const { loading, data, fetchMore } = useQuery(NFT_QUERY.nfts.query, {
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
    let catalogue = [...(data!.nfts as Array<Nft>)];

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
      catalogue = [...catalogue.filter((nft) => nft.owner === address)];
    }

    return catalogue;
  };

  /**
   * @description Pagination handler
   * Manages the DB pagination system
   * via specific 'Load More' button
   * @author Luca Cattide
   * @date 14/03/2025
   */
  const handleMore = (): void => {
    const length = data!.nfts!.length;
    const currentLength = offset >= length ? offset : offset + length;

    setSpinner(true);
    fetchMore({
      variables: {
        offset: currentLength,
        limit,
      },
    }).then((fetchMoreResult) => {
      setSpinner(false);
      // Update current offset/limit
      dispatch(updateOffset(currentLength));
      dispatch(updateLimit(currentLength + fetchMoreResult.data.nfts!.length));
    });
  };

  return loading ? (
    <div className="catalogue__loading mt-16 mb-16 flex flex-1 justify-center">
      <CustomLoading />
    </div>
  ) : !data ? (
    notFound()
  ) : (
    <>
      <Suspense fallback={<CustomLoading />}>
        {/*  BEM notation for styles */}
        <h1 className="catalogue__title title mt-12 mb-12 text-center uppercase">
          Catalogue
        </h1>
        <div className="catalogue__container flex flex-col lg:flex-row lg:flex-wrap">
          {/* Filters Start */}
          <aside className="catalogue__filters mx-auto w-6/6 pr-6 pb-6 pl-6 lg:w-1/6">
            <h2 className="filters__title title mb-12 text-center uppercase lg:text-left">
              Filters
            </h2>
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
            <CatalogueList nfts={handleFilters()} />
          ) : (
            <Empty />
          )}
        </div>
      </Suspense>
      {
        // Paginate until the last set
        limit < (data.nfts![0]! as Nft).count! && (
          // Pagination Start
          <aside className="catalogue__more mt-16 mb-16 flex basis-full justify-center">
            <h2 className="more__title hidden">More</h2>
            {spinner ? (
              <ArrowPathIcon className="more__icon size-12 animate-spin select-none" />
            ) : (
              <button
                className="more__button btn btn-secondary cursor-pointer uppercase select-none"
                onClick={handleMore}
                tabIndex={data.nfts!.length + 1}
                data-testid={TEST.ID.MORE}
              >
                Load more
              </button>
            )}
          </aside>
        )
        // Pagination End
      }
      <Back />
    </>
  );
};

export default Catalogue;
