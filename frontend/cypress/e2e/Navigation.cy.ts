import { getApp } from '@/utilities/testingE2e';

// Navigation End-to-End Test
describe('Navigation E2E Test', () => {
  // Setup
  beforeEach(() => {
    getApp();
  });
  // Tests
  it('Navigates to NFT details section', () => {
    //cy.visit('/nft/');
  });
  it('Navigates to Checkout section', () => {
    cy.visit('/checkout');
  });
});
