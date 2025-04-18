'use client';

import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { useSuspenseQuery } from '@apollo/client';
import CatalogueList from '@/components/Catalogue/CatalogueList';
import Skeleton from '../Layout/Skeleton';
import Back from '../Layout/Back';
import Empty from '../Empty';
import CustomError from '../CustomError';
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
import { QUERY, TEST } from '@/utilities/constants';
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
  const address = useAppSelector(selectAddress);
  const filterPrice = useAppSelector(selectFilterPrice);
  const filterPriceOrder = useAppSelector(selectFilterPriceOrder);
  const filterOwner = useAppSelector(selectFilterOwner);
  /**
   * Query - Fetches NFTs from DB
   * to initialize state and populate the catalogue
   * - Pagination of 10 records/call support
   */
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
    const length = data.nfts!.length;
    const currentLength = offset >= length ? offset : offset + length;

    fetchMore({
      variables: {
        offset: currentLength,
        limit,
      },
    }).then((fetchMoreResult) => {
      // Update current offset/limit
      dispatch(updateOffset(currentLength));
      dispatch(updateLimit(currentLength + fetchMoreResult.data.nfts!.length));
    });
  };

  return error ? (
    <CustomError error={error} />
  ) : !data ? (
    notFound()
  ) : handleFilters().length > 0 ? (
    <>
      <Suspense fallback={<Skeleton />}>
        <CatalogueList nfts={handleFilters()} />
      </Suspense>
      {
        // Paginate until the last set
        limit < (data.nfts![0]! as Nft).count! && (
          // Pagination Start
          <aside className="catalogue__more mt-16 mb-16 flex basis-full justify-center">
            <h2 className="more__title hidden">More</h2>
            <button
              className="more__button btn btn-secondary cursor-pointer uppercase select-none"
              onClick={handleMore}
              tabIndex={data.nfts!.length + 1}
              data-testid={TEST.ID.MORE}
            >
              Load more
            </button>
          </aside>
        )
        // Pagination End
      }
      <Back />
    </>
  ) : (
    <Empty />
  );
};

export default Catalogue;
