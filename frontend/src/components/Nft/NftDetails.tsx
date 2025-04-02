'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import NftActions from './NftActions';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import { selectStarred } from '@/slices/wishlist';
import { selectAdded } from '@/slices/cart';
import { selectPurchased } from '@/slices/wallet';
import { useAppSelector } from '@/hooks/state';
import useNftActions from '@/hooks/actions';
import { checkNftStatus, getNftIds, isPurchased } from '@/utilities/utils';
import { ACTION_PREFIX, ANIMATION } from '@/utilities/constants';
import type { Nft } from '@/types/graphql/graphql';

/**
 * @description NFT details
 * @author Luca Cattide
 * @date 17/03/2025
 * @param {{ nft: Nft }} { nft }
 * @returns {*}  {React.ReactNode}
 */
const NftDetails = ({ nft }: { nft: Nft }): React.ReactNode => {
  const { FILTER } = ANIMATION;
  const { DETAILS } = ANIMATION.NFT;
  const { IMAGE, TITLE, DESCRIPTION, OWNER } = DETAILS;
  const { id, name, description, image, owner, price } = nft;
  // Hooks
  const starred = useAppSelector(selectStarred);
  const added = useAppSelector(selectAdded);
  const purchased = useAppSelector(selectPurchased);
  const { WISHLIST, CART } = ACTION_PREFIX;
  const { wishlist, cart, handleData } = useNftActions([nft]);

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
        <motion.img
          variants={IMAGE}
          initial="INITIAL"
          animate="ANIMATE"
          transition={IMAGE.TRANSITION}
          className="nft__image h-auto w-full select-none"
          src={image}
          alt={`${name} - eNeFTi`}
        />
      )}
      <motion.h2
        variants={FILTER}
        initial="INITIAL"
        animate="ANIMATE"
        transition={TITLE.TRANSITION}
        className="nft__name title mt-12 mb-6"
      >
        {name}
      </motion.h2>
      <motion.p
        variants={FILTER}
        initial="INITIAL"
        animate="ANIMATE"
        transition={DESCRIPTION.TRANSITION}
        className="nft__description mb-6"
      >
        {description}
      </motion.p>
      <motion.span
        variants={FILTER}
        initial="INITIAL"
        animate="ANIMATE"
        transition={OWNER.TRANSITION}
        className="nft__owner font"
      >
        {isPurchased(purchased, id as string)
          ? 'Owned by you'
          : `Owned by: ${owner}`}
      </motion.span>
      <motion.span
        variants={FILTER}
        initial="INITIAL"
        animate="ANIMATE"
        transition={FILTER.TRANSITION}
        className="nft__price subtitle mt-6 mb-12 uppercase"
      >
        {/* Ether has 18 standard decimals */}
        {price?.toFixed(18)} ETH
      </motion.span>
      <div className="ntf__actions flex">
        {!isPurchased(purchased, id as string) && (
          <NftActions
            icons={false}
            isStarred={
              checkNftStatus(id as string, wishlist) &&
              checkNftStatus(id as string, getNftIds(starred))
            }
            handleWishlist={() => handleData(WISHLIST, id as string)}
            isAdded={
              checkNftStatus(id as string, cart) ||
              checkNftStatus(id as string, getNftIds(added))
            }
            handleCart={() => handleData(CART, id as string)}
          />
        )}
      </div>
    </div>
    // NFT Details End
  );
};

export default NftDetails;
