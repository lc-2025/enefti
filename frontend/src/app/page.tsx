import React from 'react';
import { PreloadQuery } from '@/apolloRsc';
import Filter from '@/components/Filter';
import Catalogue from '@/components/Catalogue/Catalogue';
import NFT_QUERY from '@/queries/nft';
import { FILTER, QUERY } from '@/utilities/constants';

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
        {/*
          The query is referenced and executed in background
          then passed to child and consumed via `read` hook.
          This prevents request waterfalls
          i.e. consecutive calls performed prior to previous outline ending
          during suspension
         */}
        <PreloadQuery query={NFT_QUERY.nfts.query} variables={QUERY.PAGINATION}>
          <Catalogue />
        </PreloadQuery>
      </div>
    </section>
    // Catalogue End
  );
}
