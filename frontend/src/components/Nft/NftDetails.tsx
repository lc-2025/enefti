'use client';

import React from 'react';
import Link from 'next/link';
import NftActions from './NftActions';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import { selectStarred } from '@/slices/wishlist';
import { selectAdded } from '@/slices/cart';
import { useAppSelector } from '@/hooks/state';
import useNftStored from '@/hooks/storage';
import { checkNftStatus, getNftIds } from '@/utilities/utils';
import type { Nft } from '@/types/graphql/graphql';
import TStorage from '@/types/storage';
import { ACTION_PREFIX } from '@/utilities/constants';
import useNftActions from '@/hooks/actions';

/**
 * @description NFT details
 * @author Luca Cattide
 * @date 17/03/2025
 * @param {{ nft: Nft }} { nft }
 * @returns {*}  {React.ReactNode}
 */
const NftDetails = ({ nft }: { nft: Nft }): React.ReactNode => {
  const { id, name, description, image, owner, price } = nft;
  // Hooks
  const starred = useAppSelector(selectStarred);
  const added = useAppSelector(selectAdded);
  const [storage] = useNftStored();
  const { wishlist, cart } = storage as TStorage;
  const { WISHLIST, CART } = ACTION_PREFIX;
  const handleData = useNftActions([nft]);

  return (
    // NFT Details Start
    <div className="nft mx-auto flex w-1/3 flex-col items-center">
      <Link
        className="nft__backlink link mb-12 flex items-center"
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
      <span className="nft__owner font">Owned by: {owner}</span>
      <span className="nft__price subtitle mt-6 mb-12 uppercase">
        {/* Ether has 18 standard decimals */}
        {price?.toFixed(18)} ETH
      </span>
      <div className="ntf__actions flex">
        <NftActions
          icons={false}
          isStarred={
            checkNftStatus(id, wishlist) &&
            checkNftStatus(id, getNftIds(starred))
          }
          handleWishlist={() => handleData(WISHLIST, id)}
          isAdded={
            checkNftStatus(id, cart) || checkNftStatus(id, getNftIds(added))
          }
          handleCart={() => handleData(CART, id)}
        />
      </div>
    </div>
    // NFT Details End
  );
};

export default NftDetails;
