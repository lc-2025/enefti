import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * @description Wishlist
 * @author Luca Cattide
 * @date 13/03/2025
 * @returns {*}  {React.ReactNode}
 */
const Wishlist = (): React.ReactNode => {
  return (
    <section className="wishlist">
      <h2 className="wishlist__title">Wishlist</h2>
      <ul className="wishlist__collection">
        <li className="collection__element">
          {/* TODO: */}
          <Link className="element__link" href="" title="" tabIndex={100}>
            <Image className="link__image" src="" alt="" />
            <h3 className="link__name"></h3>
            <span className="link__price"></span>
          </Link>
          <button className="element__button">Remove</button>
        </li>
      </ul>
    </section>
  );
};

export default Wishlist;
