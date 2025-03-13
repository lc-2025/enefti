import React from 'react';
import Link from 'next/link';

/**
 * @description Header
 * @author Luca Cattide
 * @date 13/03/2025
 * @returns {*}  {React.ReactNode}
 */
const Header = (): React.ReactNode => {
  return (
    // Header Start
    <header className="header">
      <h2 className="header__title">Header</h2>
      {/* Logo Start */}
      <Link href="/" title="Back to the Home Page - eNefti" tabIndex={0}>
        <aside className="header__logo">
          <h2 className="logo__title">eNefti</h2>
        </aside>
      </Link>
      {/* Logo End */}
      {/* Search start */}
      <aside className="header__search">
        <h2 className="search__title">Search</h2>
        {/* TODO: */}
      </aside>
      {/* Search End */}
      <aside className='header__wishlist'>
        <h2 className='wishlist__title'>Wishlist</h2>
        {/* TODO: */}
      </aside>
      {/* Theme Swithcer Start */}
      <aside className="header__theme">
        <h2 className="theme__title">Theme</h2>
        {/* TODO: */}
      </aside>
      {/* Theme Switcher End */}
    </header>
    // Header End
  );
};

export default Header;
