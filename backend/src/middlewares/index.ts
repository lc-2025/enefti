import sslMiddleware from './ssl';
import errorMiddleware from './error';

// Middlewares
const middlewares = {
  ssl: sslMiddleware,
  error: errorMiddleware,
};

export default middlewares;
