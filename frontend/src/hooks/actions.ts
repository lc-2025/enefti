import {
  addNft as addNftWishlist,
  removeNft as removeNftWishlist,
  selectStarred,
} from '@/slices/wishlist';
import {
  addNft as addNftCart,
  removeNft as removeNftCart,
  selectAdded,
} from '@/slices/cart';
import useNftStored from '@/hooks/storage';
import { useAppDispatch, useAppSelector } from '@/hooks/state';
import { checkNftStatus, getNftIds } from '@/utilities/utils';
import { ACTION_PREFIX } from '@/utilities/constants';
import TStorage from '@/types/storage';
import type { Nft } from '@/types/graphql/graphql';

const useNftActions = (nfts: Array<Nft>) => {
  // Hooks
  const starred = useAppSelector(selectStarred);
  const added = useAppSelector(selectAdded);
  const [storage, setStorage] = useNftStored();
  const { wishlist, cart } = storage as TStorage;
  const dispatch = useAppDispatch();
  const { WISHLIST, CART } = ACTION_PREFIX;

  // Helpers
  /**
   * @description NFT getter
   * Returns a fetched NFT by ID
   * @author Luca Cattide
   * @date 17/03/2025
   * @param {string} id
   * @returns {*}  {Nft}
   */
  const getNft = (id: string): Nft => nfts.find((nft) => nft.id === id)!;

  // Handlers
  /**
   * @description Wishlist/Cart handler
   * Add/removes preferred/added NFTs on a dedicated list
   * @author Luca Cattide
   * @date 17/03/2025
   */
  const handleData = (type: string, id: string): void => {
    const data = {
      [WISHLIST]: {
        state: starred,
        storage: wishlist,
        dispatch: {
          add: addNftWishlist,
          remove: removeNftWishlist,
        },
      },
      [CART]: {
        state: added,
        storage: cart,
        dispatch: {
          add: addNftCart,
          remove: removeNftCart,
        },
      },
    };

    // Data check
    if (
      !checkNftStatus(id, getNftIds(data[type].state)) &&
      !checkNftStatus(id, data[type].storage)
    ) {
      dispatch(data[type].dispatch.add(getNft(id)));
      setStorage((state: TStorage) => ({
        ...state,
        [type]: [...state[type], id],
      }));
    } else {
      dispatch(data[type].dispatch.remove(id));
      setStorage((state: TStorage) => ({
        ...state,
        [type]: [
          ...state[type].filter((existingId: string) => existingId !== id),
        ],
      }));
    }
  };

  return handleData;
};

export default useNftActions;
