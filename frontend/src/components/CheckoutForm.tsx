'use client';

import { notFound } from 'next/navigation';
import { useSuspenseQuery } from '@apollo/client';
import NftList from '@/components/Nft/NftList';
import Empty from '@/components/Empty';
import CustomError from './CustomError';
import { useAppDispatch, useAppSelector, useAppState } from '@/hooks/state';
import { addNfts, selectAdded } from '@/slices/cart';
import NFT_QUERY from '@/queries/nft';
import { ACTION_PREFIX } from '@/utilities/constants';
import useNftStored from '@/hooks/storage';
import type { Nft } from '@/types/graphql/graphql';
import TStorage from '@/types/storage';

const CheckoutForm = (): React.ReactNode => {
  // Hooks
  const [storage] = useNftStored();
  const { cart, wishlist } = storage as TStorage;
  const nfts = useAppSelector(selectAdded);
  const { data, error } = useSuspenseQuery(NFT_QUERY.nfts.query, {
    variables: { ids: [...cart, ...wishlist] },
    fetchPolicy: 'network-only',
  });
  const dispatch = useAppDispatch();
  const { WISHLIST, CART } = ACTION_PREFIX;

  useAppState([WISHLIST, CART], data.nfts as Array<Nft>, storage as TStorage);
  // TODO: Add wishlist initialization as well

  // Handlers
  const handleSubmit = (): void => {
    // TODO: Validation, etc.
  };

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
