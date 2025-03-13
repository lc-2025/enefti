import { Server } from 'http';
import request from 'supertest';
import server from '../../../server';
import { ROUTES, TEST } from '../../../utils/constants';

// NFT API Unit Test - GraphQL
describe('NFT API Unit Test - GraphQL', () => {
  let app: Server;
  let response = null;
  // Increasing timeout for CI environment
  const { TIMEOUT, ID } = TEST;

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
  beforeEach(async () => {
    await closeConnection();
  }, TIMEOUT);
  // Tests
  it(
    'Gets a list of NFTs',
    async () => {
      response = await request(app)
        .post(`${ROUTES.API.GRAPHQL}`)
        .send(TEST.QUERY.NFTS)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.data.nfts.length).toBeGreaterThan(0);
    },
    TIMEOUT,
  );
  it(
    'Gets a specific NFT by ID',
    async () => {
      response = await request(app)
        .post(`${ROUTES.API.GRAPHQL}`)
        .send(TEST.QUERY.NFT)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).not.toBeNull();
      expect(response.body.data.nft.id).toBe(ID);
    },
    TIMEOUT,
  );
  it(
    'Updates a specific NFT owner by ID',
    async () => {
      response = await request(app)
        .post(`${ROUTES.API.GRAPHQL}`)
        .send(TEST.QUERY.NFT_UPDATE)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(response.body).not.toBeNull();

      const { id, owner } = response.body.data.updateNft;

      expect(id).toBe(ID);
      expect(owner).toBe(owner);
    },
    TIMEOUT,
  );
  it(
    'Returns an error on unexpected user input',
    async () => {
      response = await request(app)
        .post(`${ROUTES.API.GRAPHQL}`)
        .send(TEST.QUERY.NFT_BAD)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.errors).not.toBeUndefined();
    },
    TIMEOUT,
  );
  it(
    'Returns an error on missing user input',
    async () => {
      response = await request(app)
        .post(`${ROUTES.API.GRAPHQL}`)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body.errors).not.toBeUndefined();
    },
    TIMEOUT,
  );
  // Teardown
  afterEach(async () => {
    await closeConnection();
  }, TIMEOUT);
});
