import { Router } from 'express';
import routerDocs from './docs';
import routerNft from './nft';
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
// Documentation
router.use(ROUTES.API.DOCS.BASE_PATHNAME, routerDocs);
// API - REST
router.use(ROUTES.API.BASE_PATHNAME, routerNft);

export default router;
