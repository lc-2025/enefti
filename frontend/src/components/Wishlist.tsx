import React, { MouseEvent }  from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Empty from './Empty';
import { useAppDispatch } from '@/hooks/state';
import useStarredNft from '@/hooks/storage';
import { removeNft, selectStarred } from '@/slices/wishlist';

const Wishlist = ({
  open,
  handler,
}: {
  open: boolean;
  handler: () => void;
}): React.ReactNode => {
  // Hooks
  const starred = useSelector(selectStarred);
  const [, setStarred] = useStarredNft();
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
  const handleRemove = (
    e: MouseEvent<HTMLButtonElement>,
    id: string,
  ): void => {
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
        className="wishlist__close absolute top-6 right-6 size-12 cursor-pointer transition duration-200 ease-linear hover:opacity-75"
        onClick={handler}
      />
      {starred && starred.length > 0 ? (
        // Starred NFTs start
        <ul className="wishlist__collection flex flex-col">
          {starred.map(({ id, name, image, price }, i) => (
            // NFT start
            <li
              key={id}
              className="collection__element mt-6 flex flex-wrap justify-center p-6 transition duration-200 ease-linear odd:bg-(--bg-primary) even:bg-(--bg-primary)/75 hover:bg-(--accent-purple)/50"
            >
              <Link
                className="element__link flex flex-wrap items-center"
                href={`nft/${id}`}
                title={`${name} - Details - eNeFTi`}
                tabIndex={100 + i}
              >
                {image && (
                  <img
                    className="link__image size-24"
                    src={image}
                    alt={`${name} - eNeFTi`}
                  />
                )}
                <div className="link__container mr-6 ml-6 flex min-w-2xl flex-col">
                  <span className="link__name">{name}</span>
                  <span className="link__price subtitle uppercase">
                    {price!.toFixed(4)} ETH
                  </span>
                </div>
              </Link>
              <button
                className="element__button btn btn-primary cursor-pointer uppercase"
                onClick={(e: MouseEvent<HTMLButtonElement>) => handleRemove(e, id!)}
              >
                Remove
              </button>
            </li>
            // NFT End
          ))}
        </ul>
      ) : (
        // Starred NFTs End
        <Empty />
      )}
    </section>
    // Wishlist End
  );
};

export default Wishlist;
