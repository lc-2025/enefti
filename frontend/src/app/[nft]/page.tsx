import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * @description  NFT Detail page
 * @author Luca Cattide
 * @date 13/03/2025
 * @export
 * @returns {*}  {React.ReactNode}
 */
export default function Nft(): React.ReactNode {
  return (
    // NFT Details Start
    <section className="nft">
      <Link
        className="nft__backlink"
        href="/"
        title="Back to the NFT Catalogue - eNeFTi"
      >
        Back to Catalogue
      </Link>
      <Image className="nft__image" src="" alt="" />
      <h2 className="nft__name"></h2>
      <p className="nft__description"></p>
      <span className="nft__owner"></span>
      <span className="nft__price">0.1 ETH</span>
      <button className="nft_button">Add to Wishlist</button>
      <button className="nft__button">Buy</button>
    </section>
    // NFT Details End
  );
}
