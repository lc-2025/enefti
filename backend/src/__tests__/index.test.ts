import { Server } from 'http';
import request from 'supertest';
import mongoose from 'mongoose';
import server from '../server';
import { ROUTES } from '../utils/constants';

// Backend Unit Test
describe('Backend Unit Test', () => {
  let app: Server;

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
  });
  // Tests
  it('Checks if the server is actually running - Needs running node process', async () => {
    await request(app)
      .get(ROUTES.BASE_PATHNAME)
      .expect('Content-Type', /text/)
      .expect(200);
  });
  require('./routes/rest/nft.test.ts');
  require('./routes/graphql/nft.test.ts');
  // Teardown
  afterEach(async () => {
    await closeConnection();
  })
  afterAll(() => mongoose.connection.close());
});
