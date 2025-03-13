"use client";

import React from 'react';
import { useSuspenseQuery } from '@apollo/client';
import NFT_QUERY from '@/queries/nft';

/**
 * @description NFTs Catalogue
 * @author Luca Cattide
 * @date 13/03/2025
 * @param {*} { nfts }
 * @returns {*}  {React.ReactNode}
 */
const Catalogue = (/* { nfts } */ ): React.ReactNode => {
  const { data, fetchMore } = useSuspenseQuery(NFT_QUERY.nfts.query);
  // TODO: Create Catalogue + CatalogueList to introduce Load More button as expected on the same scope level

  return (
    // List Start
    <div className="catalogue__container">
      {data.nfts.map(({ id, name, image, price }) => (
        // Element Start
        <div key={id} className="container__element">
          <div
            className="element__image"
            style={{ backgroundImage: image }}
          ></div>
          <h2 className="element__name">{name}</h2>
          <span className="element__price">{price} ETH</span>
          <button className="element__button">Details</button>
          <button className="element__button">Add to Wishlist</button>
          <button className="element__button">Buy</button>
        </div>
        // Element End
      ))}
    </div>
    // List End
  );
};

export default Catalogue;
