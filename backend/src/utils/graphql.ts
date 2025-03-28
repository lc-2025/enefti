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

/**
 * @description Response data setter
 * Sets the data shape of hydrated query/mutation results
 * @author Luca Cattide
 * @date 28/03/2025
 * @param {Array<any>} data
 */
const setResponse = (data: Array<any>) => data.map((record) => ({...record, id: record._id}))

export {setError, setResponse};
