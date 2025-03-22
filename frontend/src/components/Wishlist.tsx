import React, { MouseEvent, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Empty from './Empty';
import NftList from './Nft/NftList';
import CustomError from './CustomError';
import { useAppDispatch, useAppSelector } from '@/hooks/state';
import useNftStored from '@/hooks/storage';
import { selectTheme } from '@/slices/theme';
import { addNfts, removeNft, selectStarred } from '@/slices/wishlist';
import { THEME } from '@/utilities/constants';
import NFT_QUERY from '@/queries/nft';
import TStorage from '@/types/storage';
import { Nft } from '@/types/graphql/graphql';
import CustomLoading from './Loading';

const Wishlist = ({
  open,
  handler,
}: {
  open: boolean;
  handler: () => void;
}): React.ReactNode => {
  // Hooks
  const theme = useAppSelector(selectTheme);
  const starred = useAppSelector(selectStarred);
  const [{ wishlist }, setStorage] = useNftStored();
  /**
   * Lazy query - Fetches stored NFTs
   * to initialize state (data-persistance)
   * only if missing on state
   */
  const [getNfts, { loading, error, data }] = useLazyQuery(
    NFT_QUERY.nfts.query,
  );
  const dispatch = useAppDispatch();
  const { DARK } = THEME.NAME;

  // Handlers
  /**
   * @description Wishlist initialization
   * Initializes the wishlist via DB
   * only if data is missing in state
   * @author Luca Cattide
   * @date 21/03/2025
   */
  const handleWishlist = (): void => {
    // Existing data check
    if (starred && starred.length === 0 && wishlist && wishlist.length > 0) {
      getNfts({
        variables: {
          ids: wishlist,
        },
        fetchPolicy: 'no-cache',
      }).then((result) => {
        dispatch(addNfts(result.data?.nfts as Array<Nft>));
      });
    }
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
    // FIXME: When removing from wishlist, CatalogueList is not re-rendered (do not see wishlist update)
   handleWishlist();
  }, [wishlist]);

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
