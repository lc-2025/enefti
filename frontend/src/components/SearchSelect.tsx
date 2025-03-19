'use client';

import React from 'react';
import NftList from './NftList';
import CustomError from './CustomError';
import { useLazyQuery } from '@apollo/client';
import NFT_QUERY from '@/queries/nft';

const SearchSelect = (): React.ReactNode => {
  // Hooks
  const [getNfts, { loading, error, data }] = useLazyQuery(
    NFT_QUERY.nfts.query,
  );

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    /*
     * Typing check
     * Perform data fetching only after 3 digits
     * otherwise reset any notification
     */
    if (value.length > 2) {
      getNfts({
        variables: {
          search: value,
        },
        // Caching queries as performance improvement
        fetchPolicy: 'no-cache',
      });
    }
  };

  return error ? (
    <CustomError error={error} />
  ) : (
    // TODO: Loading with animation
    <div className="search relative">
      <input
        className="input-glass"
        type="text"
        placeholder="Search..."
        tabIndex={1}
        onChange={handleChange}
      />
      {data?.nfts && <NftList nfts={data!.nfts ?? []} search={true} />}
    </div>
  );
};

export default SearchSelect;
