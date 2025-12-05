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
import { ACTION_PREFIX, TEST, ANIMATION } from '@/utilities/constants';
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
  const { NFT, HEADER } = ANIMATION;
  const { WISHLIST, CART, WALLET } = ACTION_PREFIX;
  const { CATALOGUE_LIST, LIST_ELEMENT, ELEMENT_PRICE } = TEST.ID;
  // Hooks
  const starred = useAppSelector(selectStarred);
  const added = useAppSelector(selectAdded);
  const purchased = useAppSelector(selectPurchased);
  const [storage] = useNftStored();

  useAppState([WISHLIST, CART, WALLET], nfts, storage as TStorage);

  const { wishlist, cart, handleData } = useNftActions(nfts);

  return (
    // List Start
    <motion.ul
      variants={NFT.CATALOGUE}
      initial="INITIAL"
      animate="ANIMATE"
      transition={{
        ...HEADER.TRANSITION,
        ...NFT.CATALOGUE.TRANSITION,
      }}
      className="catalogue__container asymmetric-grid mx-auto w-6/6 lg:w-5/6"
      data-testid={CATALOGUE_LIST}
    >
      {nfts.map(({ id, name, image, price }, i) => (
        // Element Start
        <li
          key={crypto.randomUUID() + id}
          className="container__element nft-card flex flex-col justify-stretch"
          data-testid={`${LIST_ELEMENT}-${id}`}
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
            <h2 className="element__name title mb-6 min-h-19">{name}</h2>
            <h3
              className="element__price subtitle pl-6 text-right uppercase"
              data-testid={`${ELEMENT_PRICE}-${i}`}
            >
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
        </li>
        // Element End
      ))}
    </motion.ul>
    // List End
  );
};

export default CatalogueList;
