import next from 'next';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes';
import {
  NODE_ENV,
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
// Compression (requests body)
app.use(compression());
// CORS
app.use(cors());
// Parsing (request body)
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
// Router
app.use(router);

// Starting server
const server = next({ dev: NODE_ENV !== 'production' })
  .prepare()
  .then(() => {
    app
      .listen(app.get('port'), () => {
        console.log(`${MESSAGE.LISTEN} ${ROUTES.BASE_URL}:${app.get('port')}`);
      })
      .on(EVENT.ERROR, (error) => {
        throw error;
      });
  });

export default server;
