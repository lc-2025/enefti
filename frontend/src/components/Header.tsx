import React from 'react';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/outline';
import ThemeSwitch from './ThemeSwitch';

/**
 * @description Header
 * @author Luca Cattide
 * @date 13/03/2025
 * @returns {*}  {React.ReactNode}
 */
const Header = (): React.ReactNode => {
  return (
    // Header Start
    <header className="header flex items-center justify-between p-6">
      <h2 className="header__title hidden">Header</h2>
      {/* Logo Start */}
      <Link href="/" title="Back to the Home Page - eNefti" tabIndex={0}>
        <aside className="header__logo">
          <h2 className="logo__title hidden">eNefti</h2>
        </aside>
      </Link>
      {/* Logo End */}
      {/* Search start */}
      <aside className="header__search">
        <h2 className="search__title hidden">Search</h2>
        <input className="input-glass" type="text" placeholder="Search..." />
      </aside>
      {/* Search End */}
      <aside className="header__tools flex items-center">
        <h2 className="tools__name hidden">Tools</h2>
        <div className="tools__wishlist flex cursor-pointer items-center mr-12">
          <StarIcon className="wishlist__icon size-6 white" />
          <span className="wishlist__label ml-6">Wishlist</span>
        </div>
        <ThemeSwitch />
      </aside>
    </header>
    // Header End
  );
};

export default Header;
