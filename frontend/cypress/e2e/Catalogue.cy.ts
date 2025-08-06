import { getApp, aliasQuery } from '@/utilities/testingE2e';
import { TEST } from '@/utilities/constants';

// Catalogue End-to-End Test
describe('Catalogue E2E Test', () => {
  // Tests
  it('Loads more NFTs', () => {
    getApp();
    cy.wait(5000).then(() => {
      const elements = '.catalogue__container .container__element';

      cy.get(elements).should('have.length', 10);
      cy.findByTestId(TEST.ID.MORE).click();
      cy.intercept('POST', '/graphql', (req) => {
        aliasQuery(req, 'Nfts');
      }).as('Nfts');
      cy.get(elements).should('have.length', 20);
    });
  });
});
