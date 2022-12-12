const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const httpMocks = require('node-mocks-http');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const app = require('../../src/app');
const config = require('../../src/config/config');
const auth = require('../../src/middlewares/auth');
const { tokenService, emailService } = require('../../src/services');
const userService = require('../../src/services/user.service');
const ApiError = require('../../src/utils/ApiError');
const setupTestDB = require('../utils/setupTestDB');
const { User, Token, db } = require('../../src/models');
const { roleRights } = require('../../src/config/roles');
const { tokenTypes } = require('../../src/config/tokens');
const { unverifiedUser, verifiedUser, admin, insertUsers } = require('../fixtures/user.fixture');
const { verifiedUserAccessToken, adminAccessToken, generateAuthTokens } = require('../fixtures/token.fixture');
const logger = require('../../src/config/logger');

setupTestDB();

describe('Campaign routes', () => {
  describe('POST /v1/campaigns', () => {
    // const findVerifiedUser = await userService.getUserByEmail('matilde.dickinson85@hotmail.com');

    const findVerifiedUser = insertUsers(verifiedUser)
      const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');

      const serAccessToken = await generateAuthTokens(findVerifiedUser.dataValues.id, accessTokenExpires, tokenTypes.ACCESS);
    let campaign;
    beforeEach(() => {
      campaign = {
        title: 'help John travel to europe for football tryouts',
        target: 690000,
        location: 'Lagos',
        description: "J'aime le foot beacoup mais c'est tres chere ",
        images: 'gibberish',
        accountNum: '0246923456',
        accountName: "j'ai besoin d'aide sil te plait",
        bankName: 'GTB',
        launchDate: '2022-11-3',
        endDate: '2022-11-13',
      };
    });

    test('should return 201 and successfully create campaign if request data is ok', async () => {
      

      
      const res = await request(app)
        .post('/v1/campaigns')
        .auth(serAccessToken, { type: 'bearer' })
        .send(campaign)
        .expect(httpStatus.CREATED);

      //   console.log(res);
      //   expect(res.body).toEqual({
      //     launchStatus: 'pending',
      //     id: expect.anything(),
      //     title: 'help John travel to europe for football tryouts',
      //     target: 690000,
      //     location: 'Lagos',
      //     description: "J'aime le foot beacoup mais c'est tres chere ",
      //     images: 'gibberish',
      //     accountNum: '0246923456',
      //     accountName: "j'ai besoin d'aide sil te plait",
      //     bankName: 'GTB',
      //     launchDate: '2022-11-03',
      //     endDate: '2022-11-13',
      //     userId: expect.anything(),
      //     updatedAt: expect.anything(),
      //     createdAt: expect.anything(),
      //   });
    });
  });
});
