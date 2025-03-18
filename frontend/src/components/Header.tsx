'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/outline';
import Wishlist from './Wishlist';
import ThemeSwitch from './ThemeSwitch';
import { openWishlist, selectOpen } from '@/slices/wishlist';
import { useAppDispatch } from '@/hooks/state';

/**
 * @description Header
 * @author Luca Cattide
 * @date 13/03/2025
 * @returns {*}  {React.ReactNode}
 */
const Header = (): React.ReactNode => {
  // Hooks
  const open = useSelector(selectOpen);
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
        <aside className="header__logo logo relative h-auto w-full overflow-hidden bg-left-top bg-no-repeat select-none">
          <h2 className="logo__title absolute right-full">eNeFTi</h2>
        </aside>
      </Link>
      {/* Logo End */}
      {/* Search start */}
      <aside className="header__search">
        <h2 className="search__title hidden">Search</h2>
        <input
          className="input-glass"
          type="text"
          placeholder="Search..."
          tabIndex={1}
        />
      </aside>
      {/* Search End */}
      {/* Tools Start */}
      <aside className="header__tools group flex items-center">
        <h2 className="tools__name hidden">Tools</h2>
        {/* Wishlist Start */}
        <div
          className="tools__wishlist mr-12 flex items-center"
          onClick={handleOpen}
        >
          <StarIcon className="wishlist__icon cursor-pointer size-12" />
          <Wishlist open={open} handler={handleOpen} />
        </div>
        {/* Wishlist End */}
        <ThemeSwitch />
      </aside>
      {/* Tools End */}
    </header>
    // Header End
  );
};

export default Header;
