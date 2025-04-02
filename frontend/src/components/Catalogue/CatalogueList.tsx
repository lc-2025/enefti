import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import NftActions from '../Nft/NftActions';
import { selectStarred } from '@/slices/wishlist';
import { selectAdded } from '@/slices/cart';
import { selectPurchased } from '@/slices/wallet';
import useNftStored from '@/hooks/storage';
import useNftActions from '@/hooks/actions';
import { useAppSelector, useAppState } from '@/hooks/state';
import { checkNftStatus, getNftIds, isPurchased } from '@/utilities/utils';
import { ACTION_PREFIX, ANIMATION } from '@/utilities/constants';
import { Nft } from '@/types/graphql/graphql';
import TStorage from '@/types/storage';

/**
 * @description Catalogue NFTs list
 * @author Luca Cattide
 * @date 17/03/2025
 * @param {{ nfts: Array<Nft> }} { nfts }
 * @returns {*}  {React.ReactNode}
 */
const CatalogueList = ({ nfts }: { nfts: Array<Nft> }): React.ReactNode => {
  const { HEADER, FILTER, NFT } = ANIMATION;
  const { CATALOGUE } = NFT;
  const { ELEMENT } = CATALOGUE;
  const { WISHLIST, CART, WALLET } = ACTION_PREFIX;
  // Hooks
  const starred = useAppSelector(selectStarred);
  const added = useAppSelector(selectAdded);
  const purchased = useAppSelector(selectPurchased);
  const [storage] = useNftStored();

  useAppState([WISHLIST, CART, WALLET], nfts, storage as TStorage);

  const { wishlist, cart, handleData } = useNftActions(nfts);

  return (
    // List Start
    <motion.div
      variants={CATALOGUE}
      initial="INITIAL"
      animate="ANIMATE"
      transition={{
        ...HEADER.TRANSITION,
        ...FILTER.TRANSITION,
      }}
      className="catalogue__container asymmetric-grid mx-auto w-5/6"
    >
      {nfts.map(({ id, name, image, price }, i) => (
        // Element Start
        <motion.div
          variants={ELEMENT}
          custom={i}
          key={crypto.randomUUID() + id}
          className="container__element nft-card flex flex-col justify-stretch"
        >
          {/* Image Start */}
          <div className="element__image relative overflow-hidden">
            <div
              className="image__picture w-full rounded-t-2xl bg-cover bg-center bg-no-repeat pb-62"
              style={{ backgroundImage: `url(${image!})` }}
            ></div>
            <div className="image-overlay"></div>
          </div>
          {/* Image End */}
          {/* Titles Start */}
          <hgroup className="element__titles mt-6 mb-6 pr-6 pl-6">
            <h2 className="element__name title mb-6 min-h-19 pr-6 pl-6">
              {name}
            </h2>
            <h3 className="element__price subtitle pl-6 text-right uppercase">
              {price!.toFixed(4)} ETH
            </h3>
          </hgroup>
          {/* Titles End */}
          <Link
            className="element__link link pr-6 pl-6 text-right font-bold"
            href={`/nft/${id}`}
            title={`${name} details - eNeFTi`}
            tabIndex={10 + i}
          >
            Details
          </Link>
          <div
            className={`element_actions mt-12 flex justify-end pr-6 pb-6 pl-6 ${isPurchased(purchased, id as string) && 'pointer-events-none invisible select-none'}`}
          >
            <NftActions
              icons={true}
              isStarred={
                checkNftStatus(id as string, wishlist) &&
                checkNftStatus(id as string, getNftIds(starred))
              }
              handleWishlist={() => handleData(WISHLIST, id as string)}
              isAdded={
                checkNftStatus(id as string, cart) &&
                checkNftStatus(id as string, getNftIds(added))
              }
              handleCart={() => handleData(CART, id as string)}
              position={i}
            />
          </div>
        </motion.div>
        // Element End
      ))}
    </motion.div>
    // List End
  );
};

export default CatalogueList;
