import React, { useEffect } from 'react';
import Link from 'next/link';
import NftActions from '../Nft/NftActions';
import {
  addNft as addNftWishlist,
  removeNft as removeNftWishlist,
  selectStarred,
} from '@/slices/wishlist';
import {
  addNft as addNftCart,
  removeNft as removeNftCart,
  selectAdded,
} from '@/slices/cart';
import useNftStored from '@/hooks/storage';
import { useAppDispatch, useAppSelector, useAppState } from '@/hooks/state';
import { checkNftStatus, getNftIds } from '@/utilities/utils';
import { ACTION_PREFIX } from '@/utilities/constants';
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
  // Hooks
  const starred = useAppSelector(selectStarred);
  const added = useAppSelector(selectAdded);
  const [storage, setStorage] = useNftStored();
  const { wishlist, cart } = storage as TStorage;
  const dispatch = useAppDispatch();
  const { WISHLIST, CART } = ACTION_PREFIX;

  useAppState([WISHLIST, CART], nfts, storage as TStorage);

  // Helpers
  /**
   * @description NFT getter
   * Returns a fetched NFT by ID
   * @author Luca Cattide
   * @date 17/03/2025
   * @param {string} id
   * @returns {*}  {Nft}
   */
  const getNft = (id: string): Nft => nfts.find((nft) => nft.id === id)!;

  /**
   * @description Wishlist/Cart handler
   * Add/removes preferred/added NFTs on a dedicated list
   * @author Luca Cattide
   * @date 17/03/2025
   * @param {string} action
   * @param {string} id
   */
  const handleAction = (action: string, id: string): void => {
    const data = {
      [WISHLIST]: wishlist,
      [CART]: cart,
    };
    /**
     * This callback approach may be further simplified
     * by improving its abstraction
     * - i.e. extract the body to an upper level
     */
    const callback = {
      add: {
        [WISHLIST]: (): void => {
          dispatch(addNftWishlist(getNft(id)));
          setStorage((state: TStorage) => ({
            ...state,
            wishlist: [...state.wishlist, id],
          }));
        },
        [CART]: (): void => {
          dispatch(addNftCart(getNft(id)));
          setStorage((state: TStorage) => ({
            ...state,
            cart: [...state.cart, id],
          }));
        },
      },
      remove: {
        [WISHLIST]: (): void => {
          dispatch(removeNftWishlist(id));
          setStorage((state: TStorage) => ({
            ...state,
            wishlist: [
              ...state.wishlist.filter((starredId: string) => starredId !== id),
            ],
          }));
        },
        [CART]: (): void => {
          dispatch(removeNftCart(id));
          setStorage((state: TStorage) => ({
            ...state,
            cart: [...state.cart.filter((addedId: string) => addedId !== id)],
          }));
        },
      },
    };

    // Data check
    if (!checkNftStatus(id, data[action] as Array<string>)) {
      callback.add[action]();
    } else {
      callback.remove[action]();
    }
  };

  return (
    // List Start
    <div className="catalogue__container asymmetric-grid mx-auto w-5/6">
      {nfts.map(({ id, name, image, price }, i) => (
        // Element Start
        <div
          key={id}
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
          {/* Actions Start */}
          <div className="element_actions mt-12 flex justify-end pr-6 pb-6 pl-6">
            <NftActions
              icons={true}
              isStarred={
                checkNftStatus(id, wishlist) &&
                checkNftStatus(id, getNftIds(starred))
              }
              handleWishlist={() => handleAction(WISHLIST, id)}
              isAdded={
                checkNftStatus(id, cart) && checkNftStatus(id, getNftIds(added))
              }
              handleCart={() => handleAction(CART, id)}
              position={i}
            />
          </div>
          {/* Actions End */}
        </div>
        // Element End
      ))}
    </div>
    // List End
  );
};

export default CatalogueList;
