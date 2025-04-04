import { getApp } from '@/utilities/testingE2e';
import { TEST } from '@/utilities/constants';

// Catalogue End-to-End Test
describe('Catalogue E2E Test', () => {
  // Tests
  it('Loads more NFTs', () => {
    getApp();

    const elements = '.catalogue__container .container__element';

    cy.get(elements).should(
      'have.length',
      10,
    );
    // `onClick` event handler workaround
    cy.findByTestId(TEST.ID.MORE).click().trigger('click');
    cy.intercept('/graphql').as('Nfts');
    cy.wait('@Nfts').then(() => {
      cy.get(elements).should(
        'have.length',
        20,
      );
    });
  });
});
