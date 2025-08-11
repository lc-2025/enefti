import express, { json } from 'express';
import { Server } from 'http';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { expressMiddleware } from '@apollo/server/express4';
import router from './routes';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import connectDb from './database';
import middlewares from './middlewares';
import {
  HOST,
  PORT_DEFAULT,
  PORT,
  RATE_LIMIT,
  EVENT,
  ROUTES,
  MESSAGE,
} from './utils/constants';

const { WINDOW, MAX_REQUESTS } = RATE_LIMIT;
const { ssl, error } = middlewares;
// Server
const app = express();

app.set('port', PORT ?? PORT_DEFAULT);
// Middlewares
app.use(
  // Compression (requests body)
  compression(),
  // CORS
  cors(),
  // XSS
  helmet(),
  // Parsing (request body)
  bodyParser.json(),
  // Rate Limit
  rateLimit({
    // 15 minutes
    windowMs: WINDOW,
    // limit each IP to 100 requests per windowMs
    max: MAX_REQUESTS,
  }),
  // DB Sanitization
  ExpressMongoSanitize(),
  // Router
  router,
  // Middlewares
  ssl,
  error,
);

/**
 * @description Server starting
 * @author Luca Cattide
 * @date 11/03/2025
 * @returns {*}  {Promise<Server>}
 */
const startServer = async (): Promise<Server> => {
  await connectDb();

  // GraphQL
  const apollo = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers: resolvers.nft }),
  });

  await apollo.start();

  app.use(
    ROUTES.API.GRAPHQL,
    cors(),
    json(),
    // @ts-ignore
    expressMiddleware(apollo),
  );

  const port = app.get('port');
  // Start
  const server = app
    // Setting `host` to all interfaces as Render requirement
    .listen(port, HOST, () => {
      console.log(`${MESSAGE.LISTEN} ${ROUTES.BASE_URL}:${port}`);
    })
    .on(EVENT.ERROR, (error) => {
      throw error;
    });

  return server;
};

const server = startServer();

export default server;
