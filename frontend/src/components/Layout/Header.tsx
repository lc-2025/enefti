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
import { ANIMATION } from '@/utilities/constants';
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
    <header className="header flex items-center justify-between p-6">
      <h2 className="header__title hidden">Header</h2>
      {/* Logo Start */}
      <Link href="/" title="Back to the Home Page - eNeFTi" tabIndex={0}>
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
        className="header__search"
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
        className="header__tools group flex items-center"
      >
        <h2 className="tools__name hidden">Tools</h2>
        {/* Wishlist Start */}
        <div className="tools__wishlist mr-12 flex items-center">
          <StarIcon
            className="wishlist__icon size-12 cursor-pointer transition duration-200 ease-linear hover:opacity-75"
            onClick={handleOpen}
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
