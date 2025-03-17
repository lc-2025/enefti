'use client';

import React from 'react';
import { ShoppingCartIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const NftActions = ({
  icons,
  handler,
  isStarred,
  position,
}: {
  icons: boolean;
  handler: () => void;
  isStarred: () => boolean;
  position?: number;
}): React.ReactNode => {
  const index = position ?? 0;

  return (
    <>
      {/* Wishlist Start */}
      <button
        className="element__button btn btn-secondary flex cursor-pointer items-center justify-center uppercase"
        onClick={handler}
        tabIndex={11 + index}
      >
        {!icons ? (
          'Add to Wishlist'
        ) : (
          <span className="button__icon">
            {isStarred() ? (
              <StarIconSolid className="white size-9" />
            ) : (
              <StarIcon className="white size-9" />
            )}
          </span>
        )}
      </button>
      {/* Wishlist End */}
      {/* Cart Start */}
      <button
        className="element__button btn btn-primary ml-6 flex cursor-pointer items-center justify-center uppercase"
        tabIndex={12 + index}
      >
        {!icons ? (
          'Add to Cart'
        ) : (
          <span className="button__icon">
            <ShoppingCartIcon className="white size-9" />
          </span>
        )}
      </button>
      {/* Cart End */}
    </>
  );
};

export default NftActions;
