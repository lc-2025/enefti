import React, { useEffect } from 'react';
import Link from 'next/link';
import NftActions from '../NftActions';
import { addNft, addNfts, removeNft } from '@/slices/wishlist';
import useStarredNft from '@/hooks/storage';
import { useAppDispatch } from '@/hooks/state';
import { Nft } from '@/types/graphql/graphql';

/**
 * @description Catalogue NFTs list
 * @author Luca Cattide
 * @date 17/03/2025
 * @param {{ nfts: Array<Nft> }} { nfts }
 * @returns {*}  {React.ReactNode}
 */
const CatalogueList = ({ nfts }: { nfts: Array<Nft> }): React.ReactNode => {
  // Hooks
  const [starred, setStarred] = useStarredNft();
  const dispatch = useAppDispatch();

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
   * @description Starred NFT checker
   * It verifies if an NFT is present in the user wishlist
   * by its ID
   * @author Luca Cattide
   * @date 17/03/2025
   * @param {string} id
   * @returns {*}  {boolean}
   */
  const checkStarredNft = (id: string): boolean =>
    (starred as Array<string>).find((starredId: string) => starredId === id)
      ? true
      : false;

  /**
   * @description Wishlist state setter
   * Initializes the wishlist based on starred ones
   * @author Luca Cattide
   * @date 17/03/2025
   */
  const setWishlist = (): void => {
    dispatch(
      addNfts(
        nfts.filter((nft) => (starred as Array<string>).includes(nft.id)),
      ),
    );
  };

  // Handlers
  /**
   * @description Wishlist handler
   * Add/removes preferred NFTs on a dedicated list
   * @author Luca Cattide
   * @date 17/03/2025
   * @param {string} id
   */
  const handleWishlist = (id: string): void => {
    // Data check
    if (!checkStarredNft(id)) {
      dispatch(addNft(getNft(id)));
      setStarred((state: Array<string>) => [...state, id]);
    } else {
      dispatch(removeNft(id));
      setStarred((state: Array<string>) => [
        ...state.filter((starredId: string) => starredId !== id),
      ]);
    }
  };

  /**
   * @description Starred status handler
   * Sets the action buttons UI based on the wishlist
   * @author Luca Cattide
   * @date 17/03/2025
   * @param {string} id
   * @returns {*}  {boolean}
   */
  const handleStarred = (id: string): boolean => checkStarredNft(id);

  useEffect(() => {
    setWishlist();
  }, [starred]);

  return (
    // List Start
    <div className="catalogue__container asymmetric-grid mx-auto w-5/6">
      {nfts.map(({ id, name, image, price }, i) => (
        // Element Start
        <div
          key={id}
          className="container__element nft-card flex flex-col justify-stretch"
        >
          <div className="element__image relative overflow-hidden">
            <div
              className="image__picture w-full rounded-t-2xl bg-cover bg-center bg-no-repeat pb-62"
              style={{ backgroundImage: `url(${image!})` }}
            ></div>
            <div className="image-overlay"></div>
          </div>
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
              handler={() => handleWishlist(id)}
              isStarred={() => handleStarred(id)}
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
