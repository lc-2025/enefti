import { Router } from 'express';
import nftRouter from './nft';
import { ROUTES } from '../utils/constants';

// Router
const router = Router();

// Routes
/**
 * Home
 * Verifies that the server is running
 * just as best-practice
 */
router.get(ROUTES.BASE_PATHNAME, (req, res) => {
  res.sendStatus(200);
});
// API - REST
router.use(ROUTES.API.BASE_PATHNAME, nftRouter);

export default router;
