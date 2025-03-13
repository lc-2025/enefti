import { GraphQLError } from 'graphql';

// GraphQL Utilities
// Helpers
/**
 * @description GraphQL Custom Error Setter
 * Returns a GraphQL resolver exception
 * @author Luca Cattide
 * @date 10/03/2025
 * @param {string} message
 * @param {string} code
 */
const setError = (message: string, code: string, arg?: string): void => {
  throw new GraphQLError(message, {
    extensions: { code, argumentName: arg },
  });
};

export default setError;
