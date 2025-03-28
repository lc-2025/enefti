import { Request, Response, NextFunction } from 'express';
import nftModel from '../models/NFT';
import setFilter from '../utils/api';
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
    .find(
      req.query.search
        ? {
            name: {
              $regex: req.query.search,
              $options: 'i',
            },
          }
        : req.query.ids
          ? setFilter(req.query.ids as string, true)
          : {},
      null,
      options,
    )
    .exec()
    .then(async (data) => {
      // Data check
      if (!data) {
        // Async error handling via custom error middleware
        next({ message: MESSAGE.EMPTY });
      }

      res.send({ data, count: await nftModel.countDocuments().exec() });
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
 * @returns {*}  {void}
 */
const getNft = (req: Request, res: Response, next: NextFunction): void => {
  // Requirements check
  if (req.query.id) {
    nftModel
      .findById(req.query.id)
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
 * @description NFTs patcher
 * Updates the NFTs owner according to the last purchase
 * @author Luca Cattide
 * @date 10/03/2025
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {*}  {Promise<void>}
 */
const patchNfts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  // Requirements check
  if (req.query.ids && req.body.owner) {
    const { ids } = req.query;
    const { body } = req;
    const filter = setFilter(ids as string, true);
    const nftsUpdated = await nftModel
      // Updates and returns the records with new values
      .updateMany(filter, { owner: body.owner }, { new: true })
      .exec();

    // Data check
    if (!nftsUpdated) {
      // Async error handling via custom error middleware
      next({ message: MESSAGE.SERVER });
    }

    nftModel
      .find(filter)
      .exec()
      .then(async (data) => {
        // Data check
        if (!data) {
          // Async error handling via custom error middleware
          next({ message: MESSAGE.EMPTY });
        }

        res.send(data);
      });
  } else {
    res.status(400).send({
      message: `${MESSAGE.MISSING} user input.`,
    });
  }
};

export { getNfts, getNft, patchNfts };
