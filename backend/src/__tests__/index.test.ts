import { Server } from 'http';
import request from 'supertest';
import mongoose from 'mongoose';
import server from '../server';
import { ROUTES, TEST } from '../utils/constants';

// Backend Unit Test
describe('Backend Unit Test', () => {
  let app: Server;
  // Increasing timeout for CI environment
  const { TIMEOUT } = TEST;

  // Helpers
  /**
   * @description Server connection closer
   * Ends the server connection
   * @author Luca Cattide
   * @date 11/03/2025
   * @returns {*}  {Promise<void>}
   */
  const closeConnection = async (): Promise<void> => {
    app = await server;

    app.close();
  };

  // Setup
  beforeAll(async () => {
    await closeConnection();
  }, TIMEOUT);
  // Tests
  it(
    'Checks if the server is actually running - Needs running node process',
    async () => {
      await request(app)
        .get(ROUTES.BASE_PATHNAME)
        .expect('Content-Type', /text/)
        .expect(200);
    },
    TIMEOUT,
  );
  // Indexing tests to output a well-organized testing report
  require('./routes/rest/nft.test');
  require('./routes/graphql/nft.test');
  // Teardown
  afterEach(async () => {
    await closeConnection();
  }, TIMEOUT);
  afterAll(() => mongoose.connection.close(), TIMEOUT);
});
