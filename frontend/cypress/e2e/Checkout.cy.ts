import { getApp, assertFunnel } from '@/utilities/testingE2e';
import { TEST } from '@/utilities/constants';

// Checkout End-to-End Test
describe('Checkout E2E Test', () => {
  const { ADDRESS } = TEST.INPUT;

  // Setup
  beforeEach(() => {
    getApp();
  });
  // Tests
  it('Buys a NFT', () => {
    assertFunnel(ADDRESS);
  });
  it('Returns an error on missing user data', () => {
    assertFunnel(ADDRESS.slice(0, 4), true);
  });
});
