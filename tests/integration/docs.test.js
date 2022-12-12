const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../src/app');
const config = require('../../src/config/config');

describe.skip('Auth routes', () => {
  describe('GET /v1/docs', () => {
    // eslint-disable-next-line jest/no-disabled-tests
    test.skip('should return 404 when running in production', async () => {
      config.env = 'production';
      await request(app).get('/v1/docs').send().expect(httpStatus.NOT_FOUND);
      config.env = process.env.NODE_ENV;
    });
  });
});
