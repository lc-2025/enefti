import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Wishlist = ({ open }: { open: boolean }): React.ReactNode => {
  return (
    <section
      className={`wishlist fixed top-0 right-0 bottom-0 left-0 z-50 flex flex-col items-center justify-center ${!open && 'hidden'}`}
    >
      <h2 className="wishlist__title title mb-6 uppercase">Wishlist</h2>
      <ul className="wishlist__collection">
        <li className="collection__element mt-6">
          {/* TODO: */}
          <Link className="element__link" href="" title="" tabIndex={100}>
            <Image className="link__image" src="" alt="" />
            <span className="link__name mr-6"></span>
            <span className="link__price uppercase subtitle mr-6"> ETH</span>
          </Link>
          <button className="element__button btn btn-primary cursor-pointer uppercase">Remove</button>
        </li>
      </ul>
    </section>
  );
};

export default Wishlist;
