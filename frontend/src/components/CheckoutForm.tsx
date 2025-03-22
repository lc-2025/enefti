'use client';

import React, { useEffect } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { notFound } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import NftList from '@/components/Nft/NftList';
import Empty from '@/components/Empty';
import CustomError from './CustomError';
import CustomLoading from './Loading';
import { useAppSelector, useAppDispatch } from '@/hooks/state';
import { addNfts, removeNfts, selectAdded } from '@/slices/cart';
import { buy, setError, selectError, selectNfts } from '@/slices/wallet';
import NFT_QUERY from '@/queries/nft';
import useNftStored from '@/hooks/storage';
import type { Nft } from '@/types/graphql/graphql';
import TStorage from '@/types/storage';

/**
 * @description Checkout form
 * @author Luca Cattide
 * @date 21/03/2025
 * @returns {*}  {React.ReactNode}
 */
const CheckoutForm = (): React.ReactNode => {
  // Hooks
  const added = useAppSelector(selectAdded);
  const nfts = useAppSelector(selectNfts);
  const errorWallet = useAppSelector(selectError);
  const [storage] = useNftStored();
  const { cart } = storage as TStorage;
  /**
   * Lazy query - Fetches stored NFTs
   * to initialize state (data-persistance)
   * only if missing on state
   */
  const [getNfts, { loading, data, error }] = useLazyQuery(
    NFT_QUERY.nfts.query,
  );
  const dispatch = useAppDispatch();

  // Helpers
  /**
   * @description  Form validation helper
   * @author Luca Cattide
   * @date 21/03/2025
   * @param {string} address
   * @returns {*}  {boolean}
   */
  const validate = (address: string): boolean => {
    // Standard address length: 25-35 chars
    const condition =
      address && address.length >= 25 && address.length <= 35 ? false : true;

    dispatch(setError(condition));

    return condition;
  };

  // Handlers
  /**
   * @description Cart initialization
   * Initializes the cart via DB
   * only if data is missing in state
   * @author Luca Cattide
   * @date 21/03/2025
   */
  const handleCart = (): void => {
    // Existing data check
    if (added && added.length === 0 && cart && cart.length > 0) {
      getNfts({
        variables: {
          ids: cart,
        },
        fetchPolicy: 'no-cache',
      }).then((result) => {
        dispatch(addNfts(result.data?.nfts as Array<Nft>));
      });
    }
  };

  /**
   * @description Form submission handler
   * @author Luca Cattide
   * @date 21/03/2025
   * @param {React.SyntheticEvent} e
   */
  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      address: { value: string };
    };
    const { value } = target.address;

    // Validation check
    if (!validate(value)) {
      dispatch(buy({ address: value, nfts: added }));
      dispatch(removeNfts());

      (
        document.getElementsByClassName('checkout__form')[0] as HTMLFormElement
      ).reset();
    }
  };

  useEffect(() => {
    handleCart();
  }, [cart]);

  return error ? (
    <CustomError error={error} />
  ) : loading ? (
    <CustomLoading />
  ) : !added && !data ? (
    notFound()
  ) : added && added.length > 0 ? (
    // Form Start
    <form
      className="checkout__form flex flex-col items-center"
      onSubmit={handleSubmit}
    >
      {/* Summaary Start */}
      <div className="form__summary">
        <h3 className="summary__title subtitle text-center">Summary</h3>
        {/* TODO: Add remove here too */}
        <NftList nfts={added} />
      </div>
      {/* Summary End */}
      <h4 className="form__buyer subtitle mt-6 mb-6">Your information</h4>
      {/* User Info Start */}
      <label className="form__label mb-12 flex cursor-pointer flex-col items-center">
        <span className="label__text font-bold">Wallet Address</span>
        <input
          className="label__field input-glass mt-6"
          type="text"
          name="address"
          placeholder="0x123456789..."
          required
          tabIndex={250}
        />
        {errorWallet && (
          <span className="label__error flew-wrap mt-6 flex items-center text-(--accent-purple)">
            <ExclamationCircleIcon className="error__icon mr-3 size-6" /> Please
            enter a valid address
          </span>
        )}
      </label>
      {/* User Info End */}
      <input
        className="form__field confirm-btn cursor-pointer p-6 font-bold uppercase"
        type="submit"
        value="Buy"
        tabIndex={300}
      />
    </form>
  ) : nfts && nfts.length > 0 ? (
    <aside className="checkout-done flex flex-col items-center">
      <h3 className="checkout-done__title subtitle mb-6">Thank you</h3>
      <p className="checkout-done__message">
        Your purchase has benn completed successfully.
      </p>
    </aside>
  ) : (
    // Form End
    <Empty />
  );
};

export default CheckoutForm;
