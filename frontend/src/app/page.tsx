import React, { Suspense } from 'react';
import { PreloadQuery } from '@/apolloRsc';
import Filter from '@/components/Filter';
import Catalogue from '@/components/Catalogue/Catalogue';
import Skeleton from '@/components/Skeleton';
import NFT_QUERY from '@/queries/nft';
import { QUERY, FILTER } from '@/utilities/constants';

/**
 * @description Index page
 * @author Luca Cattide
 * @date 13/03/2025
 * @export
 * @returns {*}  {React.ReactNode}
 */
export default function Home(): React.ReactNode {
  return (
    // Catalogue
    <section className="catalogue">
      {/*  BEM notation for styles */}
      <h1 className="catalogue__title title mt-12 mb-12 text-center uppercase">
        Catalogue
      </h1>
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
        <PreloadQuery query={NFT_QUERY.nfts.query} variables={QUERY.PAGINATION}>
          {/*
          The query is referenced and executed in background
          then passed to child and consumed via `read` hook.
          This prevents request waterfalls
          i.e. consecutive calls performed prior to previous outline ending
          during suspension
         */}
          <Suspense fallback={<Skeleton />}>
            <Catalogue />
          </Suspense>
        </PreloadQuery>
      </div>
    </section>
    // Catalogue End
  );
}
