import express, { json } from 'express';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import gql from 'graphql-tag';
import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { expressMiddleware } from '@apollo/server/express4';
import { readFileSync } from 'fs';
import router from './routes';
import resolvers from './graphql/resolvers';
import connectDb from './database';
import middlewares from './middlewares';
import { PORT_DEFAULT, PORT, EVENT, ROUTES, MESSAGE } from './utils/constants';

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
 * @date 10/03/2025
 */
const server = async (): Promise<void> => {
  await connectDb();

  // GraphQL
  const typeDefs = gql(
    readFileSync(`${__dirname}/graphql/schema.graphql`, {
      encoding: 'utf-8',
    }),
  );
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
  app
    .listen(app.get('port'), () => {
      console.log(`${MESSAGE.LISTEN} ${ROUTES.BASE_URL}:${app.get('port')}`);
    })
    .on(EVENT.ERROR, (error) => {
      throw error;
    });
};

export default server();
