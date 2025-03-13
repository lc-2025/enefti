import express, { json } from 'express';
import { Server } from 'http';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
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
  EVENT,
  ROUTES,
  MESSAGE,
} from './utils/constants';

// Server
const app = express();

app.set('port', PORT ?? PORT_DEFAULT);
// Middlewares
app.use(
  // Compression (requests body)
  compression(),
  // CORS
  cors(),
  // Parsing (request body)
  bodyParser.json(),
  // Router
  router,
  // Error
  middlewares.error,
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

  // Start
  const server = app
    // Setting `host` to all interfaces as Render requirement
    .listen(app.get('port'), HOST, () => {
      console.log(`${MESSAGE.LISTEN} ${ROUTES.BASE_URL}:${app.get('port')}`);
    })
    .on(EVENT.ERROR, (error) => {
      throw error;
    });

  return server;
};

const server = startServer();

export default server;
