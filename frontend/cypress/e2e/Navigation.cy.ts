import { getApp } from '@/utilities/testingE2e';
import { TEST } from '@/utilities/constants';

// Navigation End-to-End Test
describe('Navigation E2E Test', () => {
  const { CATALOGUE_LIST, CHECKOUT_BUTTON, BACK, LOGO } = TEST.ID;
  const pathHome = '/';

  // Helpers
  /**
   * @description NFT details navigation helper
   * @author Luca Cattide
   * @date 04/04/2025
   */
  const getNft = (): void => {
    cy.findByTestId(CATALOGUE_LIST).within(() => {
      cy.findAllByRole('link').spread((first) => {
        first.click();
      });
    });
  };

  /**
   * @description Checkout navigation assertion helper
   * @author Luca Cattide
   * @date 04/04/2025
   */
  const getCheckout = (): void => {
    cy.findByTestId(CHECKOUT_BUTTON).click();
  };

  /**
   * @description Navigation path assertion helper
   * @author Luca Cattide
   * @date 04/04/2025
   * @param {string} section
   */
  const assertLocation = (section: string): void => {
    cy.location().should((location) => {
      expect(location.pathname).to.include(section);
    });
  };

  /**
   * @description Navigation assertion helper
   * @author Luca Cattide
   * @date 04/04/2025
   * @param {string} element
   * @param {string} section
   */
  const assertNavigation = (element: string, section: string): void => {
    cy.findByTestId(element).click();

    assertLocation(section);
  };

  // Setup
  beforeEach(() => {
    getApp();
  });
  // Tests
  it('Navigates to NFT details section', () => {
    getNft();
    assertLocation('nft');
  });
  it('Navigates to Checkout section', () => {
    getCheckout();
    assertLocation('checkout');
  });
  it('Returns to the catalogue section via main link', () => {
    getCheckout();
    assertNavigation(LOGO, pathHome);
  });
  it('Returns to the catalogue section via backlink', () => {
    getNft();
    assertNavigation(BACK, pathHome);
  });
});
