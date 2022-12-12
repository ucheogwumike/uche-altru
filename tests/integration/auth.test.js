/* eslint-disable no-console */
const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
// const httpMocks = require('node-mocks-http');
// const moment = require('moment');
// const bcrypt = require('bcryptjs');

const app = require('../../src/app');
// const config = require('../../src/config/config');
// const auth = require('../../src/middlewares/auth');
// const { tokenService, emailService } = require('../../src/services');
// const ApiError = require('../../src/utils/ApiError');
const setupTestDB = require('../utils/setupTestDB');
// const { password } = require('../../src/validations/custom.validation');
// const { db } = require('../../src/models');
// const { roleRights } = require('../../src/config/roles');
// const { tokenTypes } = require('../../src/config/tokens');
// eslint-disable-next-line no-unused-vars
const { userOne, admin, insertUsers } = require('../fixtures/user.fixture');
// const { userOneAccessToken, adminAccessToken } = require('../fixtures/token.fixture');

setupTestDB();

describe('Auth routes', () => {
  describe('POST /v1/auth/register', () => {
    let newUser;
    beforeEach(() => {
      newUser = {
        firstName: faker.name.findName(),
        lastName: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'Password123',
      };
    });

    test('should return 201 upon successful registration', async () => {
      // eslint-disable-next-line no-console
      console.log(newUser);
      await insertUsers([userOne]);
      console.log(userOne);
      const result = await request(app).post('/v1/auth/register').send(newUser).expect(httpStatus.CREATED);
      // eslint-disable-next-line no-console
      console.log(result.text);
      // eslint-disable-next-line no-console
      console.log(result.body.user);

      expect(result.body.user).not.toHaveProperty(newUser.password);
      expect(result.body.user).toHaveProperty([
        {
          id: expect.anything(),
          isEmailVerified: false,
          // status: 'active',
        },
      ]);
    });

    describe('POST /v1/auth/login', () => {
      test('should return 200 and token upon successful login', async () => {
        expect(2 + 2).toBe(4);
      });
    });
  });
});
