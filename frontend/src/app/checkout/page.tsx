import React, { Suspense } from 'react';
import { PreloadQuery } from '@/apolloRsc';
import Skeleton from '@/components/Skeleton';
import CheckoutForm from '@/components/CheckoutForm';
import NFT_QUERY from '@/queries/nft';
import { QUERY } from '@/utilities/constants';

/**
 * @description Checkout page
 * @author Luca Cattide
 * @date 13/03/2025
 * @export
 * @returns {*}  {React.ReactNode}
 */
export default function Checkout(): React.ReactNode {
  return (
    // Checkout Start
    <section className="checkout flex flex-col items-center">
      <h2 className="checkout__title title mt-12 mb-12 flex flex-col text-center uppercase">
        Checkout
      </h2>
      <PreloadQuery query={NFT_QUERY.nfts.query} variables={QUERY.PAGINATION}>
        <Suspense fallback={<Skeleton />}>
          <CheckoutForm />
        </Suspense>
      </PreloadQuery>
    </section>
    // Checkout End
  );
}
