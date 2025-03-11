import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { ROUTES } from '../utils/constants';
import docs from '../../docs/openapi.json';

// Router
const docsRouter = Router();

// Routes - NFT
docsRouter.use(
  ROUTES.API.DOCS.REST,
  swaggerUi.serve,
  swaggerUi.setup(docs, { explorer: true }),
);

export default docsRouter;
