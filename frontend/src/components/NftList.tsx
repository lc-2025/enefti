import React, { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { selectTheme } from '@/slices/theme';
import { THEME } from '@/utilities/constants';
import type { Nft } from '@/types/graphql/graphql';

/**
 * @description NFTs list
 * @author Luca Cattide
 * @date 19/03/2025
 * @param {{
 *   nfts: Array<Partial<Nft>>;
 *   search: boolean;
 *   handler?: (e: MouseEvent<HTMLButtonElement>, id: string) => void;
 * }} {
 *   nfts,
 *   search = false,
 *   handler,
 * }
 * @returns {*}  {React.ReactNode}
 */

const NftList = ({
  nfts,
  search = false,
  handler,
}: {
  nfts: Array<Partial<Nft>>;
  search?: boolean;
  handler?: (e: MouseEvent<HTMLButtonElement>, id: string) => void;
}): React.ReactNode => {
  // Hooks
  const theme = useSelector(selectTheme);
  const { DARK } = THEME.NAME;

  return (
    // List Start
    <ul
      className={`wishlist__collection flex max-h-2/3 flex-col overflow-x-hidden overflow-y-auto ${search ? 'border-2 fixed z-40 bg-(--bg-primary)' : 'pr-6'}`}
    >
      {nfts.map(({ id, name, image, price }, i) => (
        // NFT start
        <li
          key={id}
          className={`collection__element group flex flex-wrap justify-between p-6 transition duration-200 ease-linear odd:bg-(--bg-primary) even:bg-(--bg-primary)/75 hover:bg-(--accent-pink)/25 ${theme === DARK && 'text-white'} ${!search && 'mt-6'}`}
        >
          <Link
            className="element__link flex flex-wrap items-center"
            href={`nft/${id}`}
            title={`${name} - Details - eNeFTi`}
            tabIndex={100 + i}
          >
            {image && (
              <img
                className={`link__image select-none ${search ? 'size-12' : 'size-24'}`}
                src={image}
                alt={`${name} - eNeFTi`}
              />
            )}
            <div className="link__container mr-6 ml-6 flex flex-col">
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
              className="element__button btn btn-primary cursor-pointer uppercase"
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
