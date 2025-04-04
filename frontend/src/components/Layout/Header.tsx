'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  StarIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import {
  ShoppingCartIcon as ShoppingCartIconSolid,
  ShoppingBagIcon as ShoppingBagIconSolid,
} from '@heroicons/react/24/solid';
import { motion } from 'motion/react';
import Wishlist from '../Wishlist';
import ThemeSwitch from '../ThemeSwitch';
import { openWishlist, selectOpen } from '@/slices/wishlist';
import { useAppDispatch, useAppSelector } from '@/hooks/state';
import SearchSelect from '../SearchSelect';
import useNftStored from '@/hooks/storage';
import { selectPurchased } from '@/slices/wallet';
import { ANIMATION, TEST } from '@/utilities/constants';
import TStorage from '@/types/storage';

/**
 * @description Header
 * @author Luca Cattide
 * @date 13/03/2025
 * @returns {*}  {React.ReactNode}
 */
const Header = (): React.ReactNode => {
  const { HEADER } = ANIMATION;
  const { TRANSITION } = HEADER;
  const { WISHLIST_BUTTON, CHECKOUT_BUTTON, LOGO, PURCHASES_BUTTON } = TEST.ID;
  // Hooks
  const pathname = usePathname();
  const open = useAppSelector(selectOpen);
  const purchased = useAppSelector(selectPurchased);
  const [storage] = useNftStored(purchased);
  const { wallet } = storage as TStorage;
  const dispatch = useAppDispatch();

  // Handlers
  /**
   * @description Wishlist visibility handler
   * Controls the modal popup
   * @author Luca Cattide
   * @date 16/03/2025
   */
  const handleOpen = (): void => {
    dispatch(openWishlist(!open));
  };

  return (
    // Header Start
    <header className="header flex flex-wrap items-center justify-between p-6 sm:flex-nowrap">
      <h2 className="header__title hidden">Header</h2>
      {/* Logo Start */}
      <Link
        href="/"
        title="Back to the Home Page - eNeFTi"
        tabIndex={0}
        data-testid={LOGO}
      >
        {/*
          Template images background technique
          Event though they might somehow downloaded, users cannot select/copy/right-click
          them directly.
          Furthermore, through image-replacement technique, the logo is also indexable via its title
        */}
        <motion.aside
          variants={HEADER}
          initial="INITIAL"
          animate="ANIMATE"
          transition={TRANSITION}
          className="header__logo logo relative h-auto w-full overflow-hidden bg-left-top bg-no-repeat select-none"
        >
          <h2 className="logo__title absolute right-full">eNeFTi</h2>
        </motion.aside>
      </Link>
      {/* Logo End */}
      {/* Search start */}
      <motion.aside
        variants={HEADER}
        initial="INITIAL"
        animate="ANIMATE"
        transition={{ ...TRANSITION, delay: 0.2 }}
        className="header__search ml-12 sm:mr-12 lg:mr-0 lg:ml-0"
      >
        <h2 className="search__title hidden">Search</h2>
        <SearchSelect />
      </motion.aside>
      {/* Search End */}
      {/* Tools Start */}
      <motion.aside
        variants={HEADER}
        initial="INITIAL"
        animate="ANIMATE"
        transition={{ ...TRANSITION, delay: 0.4 }}
        className="header__tools group mt-12 flex basis-full items-center justify-center sm:mt-0 sm:basis-0"
      >
        <h2 className="tools__name hidden">Tools</h2>
        {/* Wishlist Start */}
        <div className="tools__wishlist mr-12 flex items-center">
          <StarIcon
            className="wishlist__icon size-12 cursor-pointer transition duration-200 ease-linear hover:opacity-75"
            onClick={handleOpen}
            data-testid={WISHLIST_BUTTON.OPEN}
          />
          <Wishlist open={open} handler={handleOpen} />
        </div>
        {/* Wishlist End */}
        {/* Checkout Start */}
        <Link
          className="tools__checkout"
          href="/checkout"
          title="Go to checkout - eNefti"
          tabIndex={2}
          data-testid={CHECKOUT_BUTTON}
        >
          {pathname === '/checkout' ? (
            <ShoppingCartIconSolid className="checkout__icon mr-12 size-12 transition duration-200 ease-linear hover:opacity-75" />
          ) : (
            <ShoppingCartIcon className="checkout__icon mr-12 size-12 transition duration-200 ease-linear hover:opacity-75" />
          )}
        </Link>
        {/* Checkout End */}
        {purchased &&
          purchased.length > 0 &&
          wallet.nfts &&
          wallet.nfts!.length > 0 && (
            // Purchases Start
            <Link
              className="tools__purchases"
              href="/purchases"
              title="Go to your purchases - eNefti"
              tabIndex={2}
              data-testid={PURCHASES_BUTTON}
            >
              {pathname === '/purchases' ? (
                <ShoppingBagIconSolid className="purchases__icon mr-12 size-12 transition duration-200 ease-linear hover:opacity-75" />
              ) : (
                <ShoppingBagIcon className="purchases__icon mr-12 size-12 transition duration-200 ease-linear hover:opacity-75" />
              )}
            </Link>
            // Purchases End
          )}
        <ThemeSwitch />
      </motion.aside>
      {/* Tools End */}
    </header>
    // Header End
  );
};

export default Header;
