import { Request, Response, NextFunction } from 'express';
import nftModel from '../models/NFT';
import { MESSAGE } from '../utils/constants';

/**
 * @description NFTs getter
 * Returns all the NFTs
 * @author Luca Cattide
 * @date 10/03/2025
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getNfts = (req: Request, res: Response, next: NextFunction): void => {
  // Query Pagination
  const options = {
    skip: req.query.skip ? Number(req.query.skip) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  };

  nftModel
    .find({}, null, options)
    .then((data) => {
      // Data check
      if (!data) {
        // Async error handling via custom error middleware
        next({ message: MESSAGE.EMPTY });
      }

      res.send(data);
    })
    .catch((error) => next(error));
};

/**
 * @description NFT getter
 * Returns a specific NFT by ID
 * @author Luca Cattide
 * @date 11/03/2025
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {*}  {Promise<void>}
 */
const getNft = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  // Requirements check
  if (req.query.id) {
    const { id } = req.query;

    nftModel
      .findById(id)
      .exec()
      .then((data) => {
        // Data check
        if (!data) {
          // Async error handling via custom error middleware
          next({ message: MESSAGE.EMPTY });
        }

        res.send(data);
      })
      .catch((error) => next(error));
  } else {
    /**
     * Synchronous error handling
     * Leaving `next` for async-action usage as best-practice
     * i.e. async APIs - `File`, `fetch`, etc.
     */
    res.status(400).send({
      message: `${MESSAGE.MISSING} user input.`,
    });
  }
};

/**
 * @description NFT patcher
 * Updates the NFT owner according to its last purchase
 * @author Luca Cattide
 * @date 10/03/2025
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {*}  {Promise<void>}
 */
const patchNft = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  // Requirements check
  if (req.query.id && req.body.owner) {
    const { id } = req.query;
    const { owner } = req.body;

    nftModel
      // Updates and returns the record with new values
      .findOneAndUpdate({ _id: id }, { owner }, { new: true })
      .exec()
      .then((data) => {
        // Data check
        if (!data) {
          // Async error handling via custom error middleware
          next({ message: MESSAGE.EMPTY });
        }

        res.send(data);
      })
      .catch((error) => next(error));
  } else {
    res.status(400).send({
      message: `${MESSAGE.MISSING} user input.`,
    });
  }
};

export { getNfts, getNft, patchNft };
