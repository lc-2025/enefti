import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useAppSelector, useAppDispatch } from './state';
import { selectStarred } from '@/slices/wishlist';
import { selectAdded } from '@/slices/cart';
import useNftStored from './storage';
import { addNfts as addNftsWishlist } from '@/slices/wishlist';
import { addNfts as addNftsCart } from '@/slices/cart';
import { selectPurchased } from '@/slices/wallet';
import { buy } from '@/slices/wallet';
import NFT_QUERY from '@/queries/nft';
import { ACTION_PREFIX } from '@/utilities/constants';
import { isWalletValid } from '@/utilities/utils';
import TQuery from '@/types/database';
import type TStorage from '@/types/storage';
import type { Nft } from '@/types/graphql/graphql';

// Custom Hooks - Database
/**
 * @description NFTs on Wishlist/Cart/Wallet
 * It gets the NFTs added to the user wishlist, cart or wallet
 * by their IDs from database
 * @author Luca Cattide
 * @date 21/03/2025
 * @param {string} type
 */
const useNftSaved = (type: string): TQuery => {
  // Hooks
  const starred = useAppSelector(selectStarred);
  const added = useAppSelector(selectAdded);
  const purchased = useAppSelector(selectPurchased);
  const [storage] = useNftStored();
  const { wishlist, cart, wallet } = storage as TStorage;
  const { WISHLIST, CART, WALLET } = ACTION_PREFIX;
  const dataType = {
    [WISHLIST]: {
      condition:
        starred && starred.length === 0 && wishlist && wishlist.length > 0,
      data: wishlist,
    },
    [CART]: {
      condition: added && added.length === 0 && cart && cart.length > 0,
      data: cart,
    },
    [WALLET]: {
      condition: isWalletValid(purchased, wallet),
      data: wallet.nfts,
    },
  };
  /**
   * Lazy query - Fetches stored NFTs
   * to initialize state (data-persistance)
   * only if missing on state
   */
  const [getNfts, { loading, data, error }] = useLazyQuery(
    NFT_QUERY.nfts.query,
  );
  const dispatch = useAppDispatch();

  // Handlers
  /**
   * @description Wishlist/Cart initialization
   * Initializes the wishlist/cart via DB
   * only if data is missing in state
   * @author Luca Cattide
   * @date 21/03/2025
   */
  const handleData = (): void => {
    // Existing data check
    if (dataType[type].condition) {
      getNfts({
        variables: {
          ids: dataType[type].data as Array<string>,
        },
        fetchPolicy: 'no-cache',
      }).then((result) => {
        const data = result.data?.nfts as Array<Nft>;
        const action = {
          [WISHLIST]: addNftsWishlist(data),
          [CART]: addNftsCart(data),
          [WALLET]: buy({ address: wallet.address, nfts: data }),
        };

        dispatch(action[type]);
      });
    }
  };

  useEffect(() => {
    handleData();
  }, [wishlist, cart, wallet]);

  return { loading, data, error };
};

export default useNftSaved;
