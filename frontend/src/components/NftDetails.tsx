'use client';

import React from 'react';
import Link from 'next/link';
import NftActions from './NftActions';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import type { Nft } from '@/types/graphql/graphql';

/**
 * @description NFT details
 * @author Luca Cattide
 * @date 17/03/2025
 * @param {{ nft: Nft }} { nft }
 * @returns {*}  {React.ReactNode}
 */
const NftDetails = ({ nft }: { nft: Nft }): React.ReactNode => {
  const { id, name, description, image, owner, price } = nft;

  const handleWishlist = (id: string): void => {
    // TODO:
  };

  return (
    // NFT Details Start
    <div className="nft mx-auto flex w-2/3 flex-col items-center">
      <Link
        className="nft__backlink link flex items-center mb-12"
        href="/"
        title="Back to the NFT Catalogue - eNeFTi"
      >
        <ArrowLeftCircleIcon className="backlink__icon mr-6 size-6" />
        Back to the Catalogue
      </Link>
      {image && (
        <img
          className="nft__image h-auto w-full select-none"
          src={image}
          alt={`${name} - eNeFTi`}
        />
      )}

      <h2 className="nft__name title mt-12 mb-6">{name}</h2>
      <p className="nft__description mb-6">{description}</p>
      <span className="nft__owner">Owned by: {owner}</span>
      <span className="nft__price subtitle mt-6 mb-12 uppercase">
        {/* Ether has 18 standard decimals */}
        {price?.toFixed(18)} ETH
      </span>
      <div className="ntf__actions flex">
        <NftActions icons={false} click="" id={id} handler={handleWishlist} />
      </div>
    </div>
    // NFT Details End
  );
};

export default NftDetails;
