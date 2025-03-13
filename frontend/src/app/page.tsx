import React, {Suspense} from 'react';
import { notFound } from 'next/navigation';
import { getClient, PreloadQuery, query } from '../apollo';
import Skeleton from '@/components/Skeleton';
import Catalogue from '@/components/Catalogue';
import CustomError from '@/components/CustomError';
import NFT_QUERY from '@/queries/nft';
import Preloader from '@/components/Preloader';

/**
 * @description Index page
 * @author Luca Cattide
 * @date 13/03/2025
 * @export
 * @returns {*}  {Promise<React.ReactNode>}
 */
export default async function Home(): Promise<React.ReactNode> {
  // TODO: Pagination
  //const { error, data } = await query(NFT_QUERY.nfts);

  return (
    // Catalogue
    /* error ? (
      <CustomError error={error} />
    ) : !data ? (
      notFound()
    ) : ( */
    <section className="catalogue">
      {/*  BEM notation for styles */}
      <h1 className="catalogue__title">Catalogue</h1>
      {/* Filters Start */}
      <aside className="catalogue__filters">
        <h2 className="filters__title">Filters</h2>
        {/* TODO: */}
      </aside>
      {/* Filters End */}
      {/* TODO: */}
      {/* <Skeleton placeholder={<>Loading...</>}>
          <Catalogue nfts={data.nfts} />
        </Skeleton> */}
      <PreloadQuery query={NFT_QUERY.nfts.query}>
        <Suspense fallback={<>foo</>}>
          <Catalogue />
        </Suspense>
      </PreloadQuery>
      <aside className="catalogue__more">
        <h2 className="more__title">More</h2>
        <button className="more__button">Load more</button>
      </aside>
    </section>
    //)
    // Catalogue End
  );
}
