import React, { useState } from 'react';
import Link from 'next/link';
import setPrice from '@/utilities/utils';
import { Nft } from '@/types/graphql/graphql';
import { ShoppingCartIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const CatalogueList = ({ nfts }: { nfts: Array<Nft> }): React.ReactNode => {
  const [click, setClick] = useState('');

  // Handlers
  const handleWishlist = (id: string): void => {
    setClick((state) => (state === id ? '' : id));
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
              {setPrice(price!)} ETH
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
            {/* Wishlist Start */}
            <button
              className="element__button btn btn-secondary flex cursor-pointer items-center justify-center uppercase"
              onClick={() => handleWishlist(id)}
              tabIndex={11 + i}
            >
              <span className="button__icon">
                {click === id ? (
                  <StarIconSolid className="white size-9" />
                ) : (
                  <StarIcon className="white size-9" />
                )}
              </span>
            </button>
            {/* Wishlist End */}
            {/* Cart Start */}
            <button
              className="element__button btn btn-primary ml-6 flex cursor-pointer items-center justify-center"
              tabIndex={12 + i}
            >
              <span className="button__icon">
                <ShoppingCartIcon className="white size-9" />
              </span>
            </button>
            {/* Cart End */}
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
