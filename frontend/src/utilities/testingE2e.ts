import { TEST } from './constants';

/**
 * @description App root helper
 * Navigates to the app home page
 * @author Luca Cattide
 * @date 04/04/2025
 */
const getApp = (): void => {
  cy.visit('/');
};

/**
 * @description Element visibility assertion helper
 * @author Luca Cattide
 * @date 04/04/2025
 * @param {string} element
 */
const assertPresence = (element: string): void => {
  cy.findByTestId(element).should('be.visible');
};

/**
 * @description Checkout funnel assertion helper
 * @author Luca Cattide
 * @date 04/04/2025
 * @param {string} input
 * @param {boolean} [error]
 */
const assertFunnel = (input: string, error?: boolean): void => {
  const { BUTTON, ICON, CHECKOUT_BUTTON, LIST_ELEMENT, BUY, ERROR } = TEST.ID;
  const { MESSAGE, FIELD } = BUY;

  cy.get('.container__element')
    .first()
    .within(() => {
      // `onClick` event handler workaround
      cy.findByTestId(BUTTON.CART).click();
      cy.findByTestId(BUTTON.CART).trigger('click');
    });

  assertPresence(ICON.CART);

  cy.findByTestId(CHECKOUT_BUTTON).click();

  assertPresence(LIST_ELEMENT);

  cy.findByTestId(FIELD).type(input);
  cy.findByTestId(BUY.BUTTON).click();

  assertPresence(error ? ERROR : MESSAGE);
};

export { getApp, assertPresence, assertFunnel };
