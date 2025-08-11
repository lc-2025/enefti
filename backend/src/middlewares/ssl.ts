import { Request, Response, NextFunction } from 'express';
import { NODE_ENV, HEADER, PROTOCOL } from '../utils/constants';

/**
 * @description SSL middleware
 * HTTPS forced-redirect handler
 * @author Luca Cattide
 * @date 11/08/2025
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {*}  {void}
 */
const sslMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { HTTPS } = PROTOCOL;
  const { headers, url } = req;
  const { host } = req.headers;

  // Protocol check
  if (NODE_ENV === 'production' && headers[HEADER.XFP] !== HTTPS) {
    return res.redirect(`${HTTPS}://${host}${url}`);
  }

  next();
};

export default sslMiddleware;
