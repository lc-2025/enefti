import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { query } from '@/apolloRsc';
import Skeleton from '@/components/Layout/Skeleton';
import NftDetails from '@/components/Nft/NftDetails';
import CustomError from '@/components/CustomError';
import NFT_QUERY from '@/queries/nft';
import type { Nft } from '@/types/graphql/graphql';

/**
 * @description NFT Detail page
 * @author Luca Cattide
 * @date 17/03/2025
 * @export
 * @param {{
 *   params: Promise<{ id: string }>;
 * }} {
 *   params,
 * }
 * @returns {*}  {Promise<React.ReactNode>}
 */
export default async function Nft({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<React.ReactNode> {
  const { id } = await params;
  const { error, data } = await query({
    query: NFT_QUERY.nft.query,
    variables: { id },
  });

  return error ? (
    <CustomError error={error} />
  ) : !data ? (
    notFound()
  ) : (
    // NFT Details Start
    <section className="details">
      <h1 className="details__title title mt-12 mb-12 text-center uppercase">
        Details
      </h1>
      <Suspense fallback={<Skeleton />}>
        <NftDetails nft={data.nft as Nft} />
      </Suspense>
    </section>
    // NFT Details End
  );
}
