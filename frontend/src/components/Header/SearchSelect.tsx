import React from 'react';
import { useLazyQuery } from '@apollo/client';
import NftList from '../Nft/NftList';
import CustomError from '../CustomError';
import { selectKey, selectNfts, setKey, setNfts } from '@/slices/search';
import NFT_QUERY from '@/queries/nft';
import { useAppDispatch, useAppSelector } from '@/hooks/state';
import { Nft } from '@/types/graphql/graphql';
import CustomLoading from '../Loading';

/**
 * @description Search list
 * @author Luca Cattide
 * @date 19/03/2025
 * @returns {*}  {React.ReactNode}
 */
const SearchSelect = (): React.ReactNode => {
  // Hooks
  const [getNfts, { loading, error, data }] = useLazyQuery(
    NFT_QUERY.nfts.query,
  );
  const key = useAppSelector(selectKey);
  const nfts = useAppSelector(selectNfts);
  const dispatch = useAppDispatch();

  // Handlers
  /**
   * @description Search handler
   * @author Luca Cattide
   * @date 19/03/2025
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    dispatch(setKey(value));

    /*
     * Typing check
     * Perform data fetching only after 3 digits
     * otherwise reset any notification
     */
    if (value.length > 1) {
      getNfts({
        variables: {
          search: value,
        },
        // Caching queries as performance improvement
        fetchPolicy: 'no-cache',
      });
      dispatch(setNfts((data?.nfts ?? nfts) as Array<Nft>));
    } else {
      dispatch(setNfts([]));
    }
  };

  return (
    <div className="search relative">
      <input
        className="input-glass"
        type="text"
        placeholder="Search..."
        tabIndex={1}
        value={key}
        onChange={handleChange}
      />
      {error ? (
        <CustomError error={error} />
      ) : loading && (
        <CustomLoading icon={true} />
      )}
      {nfts && nfts.length > 0 && <NftList nfts={nfts} search={true} />}
    </div>
  );
};

export default SearchSelect;
