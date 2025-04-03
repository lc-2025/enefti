import { screen } from '@testing-library/react';
import { renderWithProviders, assertAction } from '@/utilities/testing';
import NftDetails from '@/components/Nft/NftDetails';
import { ACTION_PREFIX, TEST, NFTS } from '@/utilities/constants';
import { Nft } from '@/types/graphql/graphql';
import userEvent from '@testing-library/user-event';

// Unit/Integration Test - Nft
describe('Nft Unit/Integration Test', () => {
  const { WISHLIST, CART } = ACTION_PREFIX;
  const { ID } = TEST;
  const user = userEvent.setup();

  // Tests
  it('Renders the details section', () => {
    renderWithProviders(<NftDetails nft={NFTS[0] as Nft} />);
    expect(screen.getByTestId(ID.NFT)).toBeInTheDocument();
  });
  it('Adds a NFT to the wishlist', () => {
    assertAction(WISHLIST, user);
  });
  it('Adds a NFT to the cart', () => {
    assertAction(CART, user);
  });
});
