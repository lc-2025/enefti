'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import useNftSaved from '@/hooks/database';
import NftList from '@/components/Nft/NftList';
import Empty from '../Empty';
import CustomError from '@/components/CustomError';
import CustomLoading from '../Loading';
import { useAppSelector } from '@/hooks/state';
import { selectPurchased } from '@/slices/wallet';
import { ACTION_PREFIX } from '../../utilities/constants';

const PurchasesSummary = (): React.ReactNode => {
  const purchased = useAppSelector(selectPurchased);
  const { loading, data, error } = useNftSaved(ACTION_PREFIX.WALLET);

  return error ? (
    <CustomError error={error} />
  ) : loading ? (
    <CustomLoading />
  ) : !purchased && !data ? (
    notFound()
  ) : purchased && purchased.length > 0 ? (
    // Purchases Start
    <section className="checkout flex flex-col items-center">
      <h2 className="checkout__title title mt-12 mb-12 flex flex-col text-center uppercase">
        Your Purchases
      </h2>
      <NftList nfts={purchased} />
    </section>
  ) : (
    // Purchases End
    // Form End
    <Empty />
  );
};

export default PurchasesSummary;
