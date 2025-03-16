'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/outline';
import Wishlist from './Wishlist';
import ThemeSwitch from './ThemeSwitch';

/**
 * @description Header
 * @author Luca Cattide
 * @date 13/03/2025
 * @returns {*}  {React.ReactNode}
 */
const Header = (): React.ReactNode => {
  const [open, setOpen] = useState(false);

  // Handlers
  /**
   * @description Wishlist visibility handler
   * Controls the modal popup
   * @author Luca Cattide
   * @date 16/03/2025
   */
  const handleOpen = (): void => {
    setOpen(!open);
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
          directly on them.
          Furthermore, through image-replacement technique, the logo is also indexable via its title
        */}
        <aside className="header__logo logo h-auto w-full overflow-hidden bg-left-top bg-no-repeat relative select-none">
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
      <aside className="header__tools group flex items-center">
        <h2 className="tools__name hidden">Tools</h2>
        <div
          className="tools__wishlist mr-12 flex cursor-pointer items-center"
          onClick={handleOpen}
        >
          <StarIcon className="wishlist__icon size-12" />
          <span className="wishlist__label ml-6 text-5xl select-none">
            Wishlist
          </span>
          {/* TODO: Move to `Catalogue` after Redux introduction */}
          {/* <Wishlist open={open} /> */}
        </div>
        <ThemeSwitch />
      </aside>
    </header>
    // Header End
  );
};

export default Header;
