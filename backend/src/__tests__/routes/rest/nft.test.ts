import { Server } from 'http';
import request from 'supertest';
import server from '../../../server';
import { ROUTES, MESSAGE, TEST } from '../../../utils/constants';

// NFT API Unit Test
describe('NFT API Unit Test - REST', () => {
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
        .get(`${ROUTES.API.BASE_PATHNAME}${ROUTES.API.NFT.GET_ALL}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.data.length).toBeGreaterThan(0);
    },
    TIMEOUT,
  );
  it(
    'Gets a specific NFT by ID',
    async () => {
      response = await request(app)
        .get(`${ROUTES.API.BASE_PATHNAME}${ROUTES.API.NFT.GET}`)
        .query({ id: ID })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).not.toBeNull();
      expect(response.body._id).toBe(ID);
    },
    TIMEOUT,
  );
  it(
    'Updates a specific NFT owner by ID',
    async () => {
      response = await request(app)
        .patch(`${ROUTES.API.BASE_PATHNAME}${ROUTES.API.NFT.GET_ALL}`)
        .query({ ids: JSON.stringify([ID]) })
        .send({ owner: TEST.OWNER })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).not.toBeNull();

      const { _id, owner } = response.body[0];

      expect(_id).toBe(ID);
      expect(owner).toBe(owner);
    },
    TIMEOUT,
  );
  it(
    'Returns an error on unexpected user input',
    async () => {
      response = await request(app)
        .get(`${ROUTES.API.BASE_PATHNAME}${ROUTES.API.NFT.GET}`)
        .query({ id: 'foo' })
        .expect('Content-Type', /json/)
        .expect(500);
    },
    TIMEOUT,
  );
  it('Returns an error on missing user input', async () => {
    response = await request(app)
      .get(`${ROUTES.API.BASE_PATHNAME}${ROUTES.API.NFT.GET}`)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body.message).toContain(MESSAGE.MISSING);
  });
  // Teardown
  afterEach(async () => {
    await closeConnection();
  }, TIMEOUT);
});
