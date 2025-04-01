'use client';

import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { notFound } from 'next/navigation';
import NftList from '@/components/Nft/NftList';
import Empty from '@/components/Empty';
import CustomError from '../CustomError';
import CustomLoading from '../Loading';
import { useAppSelector, useAppDispatch } from '@/hooks/state';
import { removeNfts, selectAdded } from '@/slices/cart';
import { buy, setError, selectError, selectPurchased } from '@/slices/wallet';
import useNftSaved from '@/hooks/database';
import { ACTION_PREFIX } from '@/utilities/constants';
import { useMutation } from '@apollo/client';
import NFT_QUERY from '@/queries/nft';

/**
 * @description Checkout form
 * @author Luca Cattide
 * @date 21/03/2025
 * @returns {*}  {React.ReactNode}
 */
const CheckoutForm = (): React.ReactNode => {
  // Hooks
  const added = useAppSelector(selectAdded);
  const purchased = useAppSelector(selectPurchased);
  const errorWallet = useAppSelector(selectError);
  const { loading, data, error } = useNftSaved(ACTION_PREFIX.CART);
  const [updateNfts] = useMutation(NFT_QUERY.nfts.mutation);
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
      updateNfts({
        variables: {
          ids: added.map((nft) => nft.id as string),
          owner: value,
        },
      });

      (
        document.getElementsByClassName('checkout__form')[0] as HTMLFormElement
      ).reset();
    }
  };

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
        <NftList nfts={added} modal={false} />
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
  ) : purchased && purchased.length > 0 ? (
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
