import React, { Suspense } from 'react';
import { PreloadQuery } from '@/apolloRsc';
import Catalogue from '@/components/Catalogue/Catalogue';
import Skeleton from '@/components/Skeleton';
import NFT_QUERY from '@/queries/nft';
import { QUERY } from '@/utilities/constants';

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
      <h1 className="catalogue__title title uppercase mb-12 mt-12 text-center">Catalogue</h1>
      <PreloadQuery
        query={NFT_QUERY.nfts.query}
        variables={QUERY.PAGINATION}
      >
        {/*
          The query is referenced and executed in background
          then passed to child and consumed via `read` hook.
          This prevents request waterfalls
          i.e. consecutive calls performed prior to previous outline ending
          during suspension
         */}
        {(queryRef) => (
          <Suspense fallback={<Skeleton />}>
            <Catalogue queryRef={queryRef} />
          </Suspense>
        )}
      </PreloadQuery>
    </section>
    // Catalogue End
  );
}
