import { getApp } from '@/utilities/testingE2e';
import { TEST, ACTION_PREFIX, THEME } from '@/utilities/constants';

// Layout End-to-End Test
describe('Layout E2E Test', () => {
  const { WISHLIST } = ACTION_PREFIX;
  const { BACK, WISHLIST_BUTTON } = TEST.ID;

  // Setup
  beforeEach(() => {
    getApp();
  });
  // Tests
  it('Switches the template theme', () => {
    cy.findByRole('switch').click();
    cy.get('html').should('have.class', THEME.NAME.DARK);
  });
  it('Scrolls the page back to the top', () => {
    cy.scrollTo('bottom');
    cy.window().its('scrollY').should('not.equal', 0);
    cy.findByTestId(BACK).click();
    cy.window().its('scrollY').should('equal', 0);
  });
  it('Opens and closes the wishlist', () => {
    cy.findByTestId(WISHLIST_BUTTON.OPEN).click();
    cy.findByTestId(WISHLIST).should('be.visible');
    cy.findAllByTestId(WISHLIST_BUTTON.CLOSE).click();
    cy.findByTestId(WISHLIST).should('not.be.visible');
  });
});
