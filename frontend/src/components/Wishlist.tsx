import React, { MouseEvent, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useAnimate } from 'motion/react';
import Empty from './Empty';
import NftList from './Nft/NftList';
import CustomLoading from './Loading';
import CustomError from './CustomError';
import { useAppDispatch, useAppSelector } from '@/hooks/state';
import useNftStored from '@/hooks/storage';
import useNftSaved from '@/hooks/database';
import { selectTheme } from '@/slices/theme';
import { removeNft, selectStarred } from '@/slices/wishlist';
import { ACTION_PREFIX, THEME, ANIMATION, TEST } from '@/utilities/constants';
import TStorage from '@/types/storage';

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
  const { MODAL } = ANIMATION;
  const { OPTIONS } = MODAL;
  const { CLOSE } = TEST.ID.WISHLIST_BUTTON;
  // Hooks
  const theme = useAppSelector(selectTheme);
  const starred = useAppSelector(selectStarred);
  const [, setStorage] = useNftStored() as React.Dispatch<
    React.SetStateAction<TStorage>
  >[];
  const { loading, data, error } = useNftSaved(WISHLIST);
  const dispatch = useAppDispatch();
  const [scope, animate] = useAnimate();

  // Handlers
  const handleAnimation = (): void => {
    // Getting Wishlist icon coordinates to set the right transform origin
    const icon = document.getElementsByClassName('wishlist__icon')[0];
    const position = icon.getBoundingClientRect();
    const { left, top } = position;

    animate(
      scope.current,
      { scale: open ? 1 : 0, originX: `${left}px`, originY: `${top}px` },
      OPTIONS,
    );
  };

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

  useEffect(() => {
    handleAnimation();
  }, [open]);

  return (
    // Wishlist Start
    <section
      ref={scope}
      className="wishlist fixed top-0 right-0 bottom-0 left-0 z-50 flex h-dvh w-dvw flex-col items-center justify-center bg-(--glass-bg-1)"
      data-testid={WISHLIST}
    >
      <h2 className="wishlist__title title mb-6 uppercase">Wishlist</h2>
      <XMarkIcon
        className={`wishlist__close absolute top-6 right-6 size-12 cursor-pointer transition duration-200 ease-linear hover:opacity-75 ${theme === DARK && 'text-white'}`}
        onClick={() => {
          handleAnimation();
          handler();
        }}
        data-testid={CLOSE}
      />
      {error ? (
        <CustomError error={error} />
      ) : loading ? (
        <CustomLoading />
      ) : !starred && !data ? (
        notFound()
      ) : starred && starred.length > 0 ? (
        // Starred NFTs Start
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
