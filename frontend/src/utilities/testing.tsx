import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { screen, render } from '@testing-library/react';
import { UserEvent } from '@testing-library/user-event';
import NftActions from '@/components/Nft/NftActions';
import { store as setStore } from '@/store';
import { ACTION_PREFIX, TEST } from './constants';
import IExtendedRenderOptions from '@/types/testing';

// Utilities - Testing
// Redux Mocked Store Provider
const renderWithProviders = (
  ui: React.ReactElement,
  extendedRenderOptions: IExtendedRenderOptions = {},
) => {
  const {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  );

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

/**
 * @description NFT actions assertion handler
 * @author Luca Cattide
 * @date 03/04/2025
 * @param {string} type
 * @returns {*}  {Promise<void>}
 */
const assertAction = async (type: string, user: UserEvent): Promise<void> => {
  const { WISHLIST, CART } = ACTION_PREFIX;
  const { ICON, BUTTON } = TEST.ID;
  const element = {
    [WISHLIST]: {
      icon: ICON.WISHLIST,
      button: BUTTON.WISHLIST,
    },
    [CART]: {
      icon: ICON.CART,
      button: BUTTON.WISHLIST,
    },
  };
  const handler = jest.fn();
  const { getAllByTestId } = screen;
  const { rerender } = renderWithProviders(
    <NftActions
      icons={true}
      isStarred={false}
      isAdded={false}
      handleWishlist={handler}
      handleCart={handler}
    />,
  );
  const button = getAllByTestId(element[type].button)[0];

  expect(button).toBeInTheDocument();

  await user!.click(button);

  rerender(
    <NftActions
      icons={true}
      isStarred={true}
      isAdded={true}
      handleWishlist={handler}
      handleCart={handler}
    />,
  );
  expect(handler).toHaveBeenCalled();
  expect(getAllByTestId(element[type].icon)).toBeInTheDocument();
};

export { renderWithProviders, assertAction };
