import { Request, Response } from 'express';
import Joi from 'joi';
import { QUERY_VALIDATION } from './constants';
import TQueryFilter from 'src/types/api/Query';

/**
 * @description Query filter setter
 * Sets the query search element to match
 * @author Luca Cattide
 * @date 28/03/2025
 * @param {*} data
 * @param {boolean} [parse]
 * @returns {*}  {TQueryFilter}
 */
const setFilter = (data: any, parse?: boolean): TQueryFilter => ({
  _id: {
    $in: parse ? JSON.parse(data as string) : data,
  },
});

/**
 * @description Request validation helper
 * Checks the integrity of querystring and body sent data
 * @author Luca Cattide
 * @date 11/08/2025
 * @param {Request} req
 * @param {Response} res
 */
const validateRequest = (req: Request, res: Response): void => {
  // Validation
  const validationParam = Joi.string().pattern(new RegExp('^[0-9]$')).max(2);
  const schema = Joi.object({
    skip: validationParam,
    limit: validationParam,
    ...QUERY_VALIDATION,
  });
  const { error } = schema.validate({
    ...req.query,
    ...req.body,
  });

  // Validation check
  if (error) {
    res.status(409).send(error.details[0].message);
  }
};

export { setFilter, validateRequest };
