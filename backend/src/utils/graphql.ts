import { GraphQLError } from 'graphql';
import Joi from 'joi';
import { QUERY_VALIDATION } from './constants';

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
const setResponse = (data: Array<any>) =>
  data.map((record) => ({ ...record, id: record._id }));

/**
 * @description Request validation helper
 * Checks the integrity of query and mutation sent data
 * @author Luca Cattide
 * @date 11/08/2025
 * @param {*} args
 */
const validateRequest = (args: any): void => {
  // Validation
  const validationParam = Joi.number();
  const schema = Joi.object({
    skip: validationParam,
    limit: validationParam,
    offset: validationParam,
    ...QUERY_VALIDATION
  });
  const { error } = schema.validate(args);

  // Validation check
  if (error) {
    setError(error.details[0].message, '409');
  }
};

export { setError, setResponse, validateRequest };
