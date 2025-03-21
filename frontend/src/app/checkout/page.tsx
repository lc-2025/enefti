import React from 'react';
import { PreloadQuery } from '@/apolloRsc';
import CheckoutForm from '@/components/CheckoutForm';
import NFT_QUERY from '@/queries/nft';

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
      <PreloadQuery query={NFT_QUERY.nfts.query}>
        <CheckoutForm />
      </PreloadQuery>
    </section>
    // Checkout End
  );
}
