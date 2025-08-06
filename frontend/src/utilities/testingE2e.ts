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
      cy.findByTestId(BUTTON.CART).click();
    });

  assertPresence(ICON.CART);

  cy.findByTestId(CHECKOUT_BUTTON).click();

  assertPresence(LIST_ELEMENT);

  cy.findByTestId(FIELD).type(input);
  cy.findByTestId(BUY.BUTTON).click();

  assertPresence(error ? ERROR : MESSAGE);
};

/**
 * @description GraphQL request helper
 * Matches the query based match on the operation name
 * @author Luca Cattide
 * @date 06/08/2025
 * @param {*} req
 * @param {string} operationName
 * @returns {*}  {boolean}
 */
const hasOperationName = (req: any, operationName: string): boolean => {
  const { body } = req;
  return (
    Object.prototype.hasOwnProperty.call(body, 'operationName') &&
    body.operationName === operationName
  );
};

/**
 * @description GraphQL query helper
 * Alias query if operationName matches
 * @author Luca Cattide
 * @date 06/08/2025
 * @param {*} req
 * @param {string} operationName
 */
const aliasQuery = (req: any, operationName: string): void => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Query`;
  }
};

export { getApp, assertPresence, assertFunnel, aliasQuery };
