import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { selectStarred } from '@/slices/wishlist';

const Wishlist = ({ open }: { open: boolean }): React.ReactNode => {
  const starred = useSelector(selectStarred);

  return (
    // Wishlist Start
    <section
      className={`wishlist fixed top-0 right-0 bottom-0 left-0 z-50 flex flex-col items-center justify-center ${!open && 'hidden'}`}
    >
      <h2 className="wishlist__title title mb-6 uppercase">Wishlist</h2>
      {/* Starred NFTs start */}
      <ul className="wishlist__collection">
        {starred &&
          starred.map(({ id, name, image, price }, i) => (
            // NFT start
            <li className="collection__element mt-6">
              <Link
                className="element__link"
                href={`nft/${id}`}
                title={`${name} - Details - eNeFTi`}
                tabIndex={100 + i}
              >
                {image && (
                  <img
                    className="link__image"
                    src={image}
                    alt={`${name} - eNeFTi`}
                  />
                )}
                <span className="link__name mr-6"></span>
                <span className="link__price subtitle mr-6 uppercase">
                  {price!.toFixed(4)} ETH
                </span>
              </Link>
              <button className="element__button btn btn-primary cursor-pointer uppercase">
                Remove
              </button>
            </li>
            // NFT End
          ))}
      </ul>
      {/* Starred NFTs End */}
    </section>
    // Wishlist End
  );
};

export default Wishlist;
