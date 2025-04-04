/**
 * @description App root handler
 * Navigates to the app home page
 * @author Luca Cattide
 * @date 04/04/2025
 */
const getApp = (): void => {
  cy.visit('/');
};

export { getApp };
