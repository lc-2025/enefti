import { Router } from 'express';
import { ROUTES } from '../utils/constants';

// Router
const router = Router();

/**
 * Verifies that the server is running
 * just as best-practice
 */
router.get(ROUTES.BASE_PATHNAME, (req, res) => {
  res.sendStatus(200);
});
// API
//router.get(ROUTES.API);

export default router;
