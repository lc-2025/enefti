import React, { MouseEvent } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import Empty from './Empty';
import { useAppDispatch } from '@/hooks/state';
import useStarredNft from '@/hooks/storage';
import { selectTheme } from '@/slices/theme';
import { removeNft, selectStarred } from '@/slices/wishlist';
import { THEME } from '@/utilities/constants';
import NftList from './NftList';

const Wishlist = ({
  open,
  handler,
}: {
  open: boolean;
  handler: () => void;
}): React.ReactNode => {
  // Hooks
  const theme = useSelector(selectTheme);
  const starred = useSelector(selectStarred);
  const [, setStarred] = useStarredNft();
  const dispatch = useAppDispatch();
  const { DARK } = THEME.NAME;

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
    setStarred((state: Array<string>) => [
      ...state.filter((starredId: string) => starredId !== id),
    ]);
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
      {starred && starred.length > 0 ? (
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
