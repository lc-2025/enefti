'use client';

import React from 'react';
import NftList from '@/components/Nft/NftList';
import Empty from '@/components/Empty';
import { useAppSelector } from '@/hooks/state';
import { selectNfts } from '@/slices/cart';

/**
 * @description Checkout page
 * @author Luca Cattide
 * @date 13/03/2025
 * @export
 * @returns {*}  {React.ReactNode}
 */
export default function Checkout(): React.ReactNode {
  // Hooks
  const nfts = useAppSelector(selectNfts);

  // Handlers
  const handleSubmit = (): void => {
    // TODO:
  };

  return (
    // Checkout Start
    <section className="checkout flex flex-col items-center">
      <h2 className="checkout__title title mt-12 mb-12 flex flex-col text-center uppercase">
        Checkout
      </h2>
      {nfts.length > 0 ? (
        // Form Start
        <form className="checkout__form flex flex-col items-center" action={handleSubmit}>
          <div className="form__summary">
            <h3 className="summary__title subtitle text-center">Summary</h3>
            <NftList nfts={nfts} />
          </div>
          <h4 className="form__buyer subtitle mb-6 mt-6">Your information</h4>
          <label className="form__label mb-12 flex cursor-pointer flex-col items-center">
            <span className="label__text font-bold">Wallet Address</span>
            <input
              className="label__field input-glass mt-6"
              type="text"
              placeholder="0x123456789..."
              required
              tabIndex={250}
            />
          </label>

          <input
            className="form__field confirm-btn cursor-pointer p-6 font-bold uppercase"
            type="submit"
            value="Buy"
            tabIndex={300}
          />
        </form>
        // Form End
      ) : (
        <Empty />
      )}
    </section>
    // Checkout End
  );
}
