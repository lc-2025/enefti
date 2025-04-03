import React from 'react';
import { ShoppingCartIcon, StarIcon } from '@heroicons/react/24/outline';
import {
  ShoppingCartIcon as ShoppingCartIconSolid,
  StarIcon as StarIconSolid,
} from '@heroicons/react/24/solid';
import { TEST } from '@/utilities/constants';

/**
 * @description NFT actions
 * @author Luca Cattide
 * @date 19/03/2025
 * @param {{
 *   icons: boolean;
 *   isStarred: boolean;
 *   handleWishlist: () => void;
 *   isAdded?: boolean;
 *   handleCart?: () => void;
 *   position?: number;
 * }} {
 *   icons,
 *   isStarred,
 *   handleWishlist,
 *   isAdded,
 *   handleCart,
 *   position,
 * }
 * @returns {*}  {React.ReactNode}
 */
const NftActions = ({
  icons,
  isStarred,
  handleWishlist,
  isAdded,
  handleCart,
  position,
}: {
  icons: boolean;
  isStarred: boolean;
  handleWishlist: () => void;
  isAdded?: boolean;
  handleCart?: () => void;
  position?: number;
}): React.ReactNode => {
  const index = position ?? 0;
  const { ICON, BUTTON } = TEST.ID;

  return (
    <>
      {/* Wishlist Start */}
      <button
        className="element__button btn btn-primary mt-12 flex cursor-pointer items-center justify-center uppercase sm:mt-0"
        onClick={handleWishlist}
        tabIndex={11 + index}
        data-testid={BUTTON.WISHLIST}
      >
        {!icons ? (
          isStarred ? (
            'Remove from Wishlist'
          ) : (
            'Add to Wishlist'
          )
        ) : (
          <span className="button__icon">
            {isStarred ? (
              <StarIconSolid
                className="white size-9"
                data-testid={ICON.WISHLIST}
              />
            ) : (
              <StarIcon className="white size-9" />
            )}
          </span>
        )}
      </button>
      {/* Wishlist End */}
      {/* Cart Start */}
      <button
        className="element__button btn btn-primary mt-12 ml-6 flex cursor-pointer items-center justify-center uppercase sm:mt-0"
        onClick={handleCart}
        tabIndex={12 + index}
        data-testid={BUTTON.CART}
      >
        {!icons ? (
          !isAdded ? (
            'Add to Cart'
          ) : (
            'Remove from Cart'
          )
        ) : (
          <span className="button__icon">
            {isAdded ? (
              <ShoppingCartIconSolid className="white size-9" data-testid={ICON.CART} />
            ) : (
              <ShoppingCartIcon className="white size-9" />
            )}
          </span>
        )}
      </button>
      {/* Cart End */}
    </>
  );
};

export default NftActions;
