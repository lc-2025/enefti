import { getApp, assertPresence, assertFunnel } from '@/utilities/testingE2e';
import { TEST } from '@/utilities/constants';

// Purchases End-to-End Test
describe('Purchases E2E Test', () => {
  const { PURCHASES_BUTTON, LIST_ELEMENT } = TEST.ID;

  // Setup
  beforeEach(() => {
    getApp();
  });
  // Tests
  it('Shows the purchased NFTs', () => {
    assertFunnel(TEST.INPUT.ADDRESS);

    cy.findByTestId(PURCHASES_BUTTON).click();

    assertPresence(LIST_ELEMENT);
  });
});
