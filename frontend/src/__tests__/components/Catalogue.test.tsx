import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, assertAction } from '@/utilities/testing';
import CatalogueList from '@/components/Catalogue/CatalogueList';
import Filter from '@/components/Filter';
import { TEST, NFTS, ACTION_PREFIX, FILTER } from '@/utilities/constants';

// Unit/Integration Test - Catalogue
describe('Catalogue Unit/Integration Test', () => {
  const { getByTestId, getAllByTestId, getByRole } = screen;
  const { WISHLIST, CART } = ACTION_PREFIX;
  const { CATALOGUE_LIST, LIST_ELEMENT, CATALOGUE_FILTER, ELEMENT_PRICE } =
    TEST.ID;
  const user = userEvent.setup();
  const options = { exact: false };
  let rerender: ((ui: React.ReactNode) => void) | null = null;

  // Handlers
  /**
   * @description Section assertion handler
   * @author Luca Cattide
   * @date 03/04/2025
   */
  const assertSection = (): void => {
    expect(getByTestId(CATALOGUE_LIST)).toBeInTheDocument();
    expect(getAllByTestId(LIST_ELEMENT, options)[0]).toBeInTheDocument();
  };

  /**
   * @description Filter assertion handler
   * @author Luca Cattide
   * @date 03/04/2025
   * @param {number} mode
   * @param {boolean} [variant]
   */
  const assertFilter = (mode: number, variant?: boolean): void => {
    const current = {
      1: {
        type: FILTER.TYPE.RADIO,
        variant: FILTER.PRICES,
      },
      2: {
        type: FILTER.TYPE.CHECK,
        variant: FILTER.OWNERS,
      },
    };

    renderWithProviders(
      <Filter
        title="Filter"
        filters={current[mode as keyof typeof current].variant}
        type={current[mode as keyof typeof current].type}
      />,
    );
    expect(getByRole(mode === 1 ? 'radiogroup' : 'checkbox')).toBeInTheDocument();

    const filter = getAllByTestId(CATALOGUE_FILTER, options)[0];

    expect(filter).toBeInTheDocument();

    fireEvent.click(getAllByTestId(CATALOGUE_FILTER, options)[0]);

    rerender!(
      <CatalogueList
        nfts={
          mode === 2
            ? NFTS.filter((nft) => nft.owner === NFTS[0].owner)
            : NFTS.sort((a: any, b: any) => (variant ? b - a : a - b))
        }
      />,
    );

    // Filter type check
    if (mode === 3) {
      expect(getAllByTestId(ELEMENT_PRICE, options).length).toBe(1)
    } else {
      expect(getAllByTestId(ELEMENT_PRICE, options)[0]).toHaveTextContent(
        NFTS[0].price as unknown as string,
      );
    }
  };

  // Setup
  beforeEach(() => {
    rerender = renderWithProviders(<CatalogueList nfts={NFTS} />).rerender;
  });
  // Tests
  it('Renders the Catalogue list section', () => {
    assertSection();
  });
  it('Adds a NFT to the wishlist', () => {
    assertAction(WISHLIST, user);
  });
  it('Adds a NFT to the cart', () => {
    assertAction(CART, user);
  });
  it('Filters the NFTs by price - Ascendant', async () => {
    assertFilter(1);
  });
  it('Filters the NFTs by price - Descendant', async () => {
    assertFilter(1, true);
  });
  it('Filters the NFTs by owner', async () => {
    assertFilter(2);
  });
});
