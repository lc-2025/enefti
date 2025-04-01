import React, { MouseEvent } from 'react';
import { notFound } from 'next/navigation';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Empty from '../Empty';
import NftList from '../Nft/NftList';
import CustomError from '../CustomError';
import { useAppDispatch, useAppSelector } from '@/hooks/state';
import useNftStored from '@/hooks/storage';
import useNftSaved from '@/hooks/database';
import { selectTheme } from '@/slices/theme';
import { removeNft, selectStarred } from '@/slices/wishlist';
import { ACTION_PREFIX, THEME } from '@/utilities/constants';
import TStorage from '@/types/storage';
import CustomLoading from '../Loading';

/**
 * @description Wishlist
 * @author Luca Cattide
 * @date 24/03/2025
 * @param {{
 *   open: boolean;
 *   handler: () => void;
 * }} {
 *   open,
 *   handler,
 * }
 * @returns {*}  {React.ReactNode}
 */
const Wishlist = ({
  open,
  handler,
}: {
  open: boolean;
  handler: () => void;
}): React.ReactNode => {
  const { WISHLIST } = ACTION_PREFIX;
    const { DARK } = THEME.NAME;
  // Hooks
  const theme = useAppSelector(selectTheme);
  const starred = useAppSelector(selectStarred);
  const [, setStorage] = useNftStored();
  const { loading, data, error } = useNftSaved(WISHLIST);
  const dispatch = useAppDispatch();

  // Handlers
  /**
   * @description Wishlist NFT remove handler
   * Removes the selected NFT from the wishlist
   * @author Luca Cattide
   * @date 18/03/2025
   * @param {MouseEvent<HTMLButtonElement>} e
   * @param {string} id
   */
  const handleRemove = (e: MouseEvent<HTMLButtonElement>, id: string): void => {
    e.stopPropagation();

    dispatch(removeNft(id));
    setStorage((state: TStorage) => ({
      ...state,
      wishlist: state.wishlist
        ? [...state.wishlist.filter((starredId: string) => starredId !== id)]
        : state.wishlist,
    }));
  };

  return (
    // Wishlist Start
    <section
      className={`wishlist fixed top-0 right-0 bottom-0 left-0 z-50 flex h-dvh w-dvw flex-col items-center justify-center bg-(--glass-bg-1) ${!open && 'hidden'}`}
    >
      <h2 className="wishlist__title title mb-6 uppercase">Wishlist</h2>
      <XMarkIcon
        className={`wishlist__close absolute top-6 right-6 size-12 cursor-pointer transition duration-200 ease-linear hover:opacity-75 ${theme === DARK && 'text-white'}`}
        onClick={handler}
      />
      {error ? (
        <CustomError error={error} />
      ) : loading ? (
        <CustomLoading />
      ) : !starred && !data ? (
        notFound()
      ) : starred && starred.length > 0 ? (
        // Starred NFTs start
        <NftList nfts={starred} handler={handleRemove} />
      ) : (
        // Starred NFTs End
        <Empty />
      )}
    </section>
    // Wishlist End
  );
};

export default Wishlist;
