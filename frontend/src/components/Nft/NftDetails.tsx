'use client';

import React from 'react';
import Link from 'next/link';
import NftActions from './NftActions';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import { addNft, removeNft } from '@/slices/wishlist';
import { useAppDispatch } from '@/hooks/state';
import useNftStored from '@/hooks/storage';
import checkNftStatus from '@/utilities/utils';
import type { Nft } from '@/types/graphql/graphql';
import TStorage from '@/types/storage';

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
  const [{ wishlist }, setStorage] = useNftStored();
  const dispatch = useAppDispatch();

  // Handlers
  /**
   * @description Wishlist handler
   * Add/removes preferred NFTs on a dedicated list
   * @author Luca Cattide
   * @date 17/03/2025
   */
  const handleWishlist = (): void => {
    // Data check
    if (!checkNftStatus(id, wishlist)) {
      dispatch(addNft(nft));
      setStorage((state: TStorage) => ({
        ...state,
        wishlist: [...state.wishlist, id],
      }));
    } else {
      dispatch(removeNft(id));
      setStorage((state: TStorage) => ({
        ...state,
        wishlist: [
          ...state.wishlist.filter((starredId: string) => starredId !== id),
        ],
      }));
    }
  };

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
          isStarred={checkNftStatus(id, wishlist)}
          handleWishlist={handleWishlist}
        />
      </div>
    </div>
    // NFT Details End
  );
};

export default NftDetails;
