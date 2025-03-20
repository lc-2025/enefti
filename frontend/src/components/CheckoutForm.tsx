'use client';

import { useEffect } from 'react';
import { notFound } from 'next/navigation';
import { useSuspenseQuery } from '@apollo/client';
import NftList from '@/components/Nft/NftList';
import Empty from '@/components/Empty';
import CustomError from './CustomError';
import { useAppSelector, useAppDispatch } from '@/hooks/state';
import { selectLimit } from '@/slices/catalogue';
import { addNfts, selectAdded } from '@/slices/cart';
import NFT_QUERY from '@/queries/nft';
import { ACTION_PREFIX, QUERY } from '@/utilities/constants';
import useNftStored from '@/hooks/storage';
import { setState } from '@/utilities/utils';
import type { Nft } from '@/types/graphql/graphql';
import TStorage from '@/types/storage';

const CheckoutForm = (): React.ReactNode => {
  // Hooks
  const [storage] = useNftStored();
  const { wishlist, cart } = storage;
  const limit = useAppSelector(selectLimit);
  const nfts = useAppSelector(selectAdded);
  // TODO: query nfts by ID multiple
  const { data, error } = useSuspenseQuery(NFT_QUERY.nfts.query, {
    variables: { ...QUERY.PAGINATION, limit },
    fetchPolicy: 'cache-first',
  });
  const dispatch = useAppDispatch();

  // Handlers
  const handleSubmit = (): void => {
    // TODO: Validation, etc.
  };

  useEffect(() => {
    if (data.nfts) {
      setState(
        ACTION_PREFIX.CART,
        data.nfts as Array<Nft>,
        storage as TStorage,
        dispatch
      );
    }
  }, [wishlist, cart]);

  return error ? (
    <CustomError error={error} />
  ) : !data ? (
    notFound()
  ) : nfts.length > 0 ? (
    // Form Start
    <form
      className="checkout__form flex flex-col items-center"
      action={handleSubmit}
    >
      <div className="form__summary">
        <h3 className="summary__title subtitle text-center">Summary</h3>
        <NftList nfts={nfts} />
      </div>
      <h4 className="form__buyer subtitle mt-6 mb-6">Your information</h4>
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
  ) : (
    // Form End
    <Empty />
  );
};

export default CheckoutForm;
