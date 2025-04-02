import React, { MouseEvent, useEffect } from 'react';
import Link from 'next/link';
import { useAnimate } from 'motion/react';
import { selectTheme } from '@/slices/theme';
import { THEME } from '@/utilities/constants';
import { setKey, setNfts } from '@/slices/search';
import { selectOpen, openWishlist } from '@/slices/wishlist';
import { useAppDispatch, useAppSelector } from '@/hooks/state';
import { ANIMATION } from '@/utilities/constants';
import type { Nft } from '@/types/graphql/graphql';

/**
 * @description NFTs list
 * @author Luca Cattide
 * @date 19/03/2025
 * @param {{
 *   nfts: Array<Partial<Nft>>;
 *   search?: boolean;
 *   modal?: boolean;
 *   handler?: (e: MouseEvent<HTMLButtonElement>, id: string) => void;
 * }} {
 *   nfts,
 *   search = false,
 *   modal = true,
 *   handler,
 * }
 * @returns {*}  {React.ReactNode}
 */

const NftList = ({
  nfts,
  search = false,
  modal = true,
  handler,
}: {
  nfts: Array<Partial<Nft>>;
  search?: boolean;
  modal?: boolean;
  handler?: (e: MouseEvent<HTMLButtonElement>, id: string) => void;
}): React.ReactNode => {
  const { DARK } = THEME.NAME;
  const { ANIMATE, OPTIONS } = ANIMATION.NFT.LIST;
  // Hooks
  const theme = useAppSelector(selectTheme);
  const open = useAppSelector(selectOpen);
  const dispatch = useAppDispatch();
  const [scope, animate] = useAnimate();

  // Handlers
  /**
   * @description Animation handler
   * Manages programmatically the component starting animation
   * based on the section
   * @author Luca Cattide
   * @date 02/04/2025
   */
  const handleAnimation = (): void => {
    // Section check
    if (search) {
      animate(scope.current, ANIMATE, OPTIONS);
    }
  };

  /**
   * @description NFTs list visibility handler
   * @author Luca Cattide
   * @date 19/03/2025
   */
  const handleList = (): void => {
    // Batching natively abvailable from React v18
    dispatch(search ? setNfts([]) : openWishlist(modal ? !open : false));
    dispatch(setKey(''));
  };

  useEffect(() => {
    handleAnimation();
  }, [search]);

  return (
    // List Start
    <ul
      ref={scope}
      className={`wishlist__collection flex ml-6 mr-6 max-h-2/3 flex-col overflow-x-hidden overflow-y-auto ${search ? 'fixed z-40 h-0 border-2 bg-(--bg-primary)' : 'pr-6'}`}
    >
      {nfts.map(({ id, name, image, price }, i) => (
        // NFT start
        <li
          key={crypto.randomUUID() + id}
          className={`collection__element group flex flex-col sm:flex-row sm:flex-wrap justify-between p-6 transition duration-200 ease-linear odd:bg-(--bg-primary) even:bg-(--bg-primary)/75 hover:bg-(--accent-pink)/25 ${theme === DARK && 'text-white'} ${!search && 'mt-6'}`}
        >
          <Link
            className="element__link flex flex-nowrap items-center"
            href={`/nft/${id}`}
            title={`${name} - Details - eNeFTi`}
            tabIndex={100 + i}
            onClick={handleList}
          >
            {image && (
              <img
                className={`link__image select-none ${search ? 'size-12' : 'size-24'}`}
                src={image}
                alt={`${name} - eNeFTi`}
              />
            )}
            <div className="link__container sm:mr-6 ml-6 flex flex-col">
              {!search && 'See Details:'}
              <span className="link__name title">{name}</span>
              {!search && (
                <span className="link__price subtitle uppercase">
                  {price!.toFixed(4)} ETH
                </span>
              )}
            </div>
          </Link>
          {handler && (
            <button
              className="element__button btn btn-primary sm:ml-12 mt-12 sm:mt-0 cursor-pointer uppercase"
              onClick={(e: MouseEvent<HTMLButtonElement>) => handler(e, id!)}
            >
              Remove
            </button>
          )}
        </li>
        // NFT End
      ))}
    </ul>
    // List End
  );
};

export default NftList;
