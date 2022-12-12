const moment = require('moment');
const config = require('../../src/config/config');
const logger = require('../../src/config/logger');
const { tokenTypes } = require('../../src/config/tokens');
const tokenService = require('../../src/services/token.service');
const userService = require('../../src/services/user.service');
const { unverifiedUser, verifiedUser, admin } = require('./user.fixture');
// const { db } = require('../../src/models');

const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
const unverifiedUserAccessToken = tokenService.generateToken(unverifiedUser.id, accessTokenExpires, tokenTypes.ACCESS);
const verifiedUserAccessToken = tokenService.generateToken(unverifiedUser.id, accessTokenExpires, tokenTypes.ACCESS);
const adminAccessToken = tokenService.generateToken(admin.id, accessTokenExpires, tokenTypes.ACCESS);

const generateAuthTokens = async (id, expire, type) => {
  const token = await tokenService.generateToken(id, expire, type);
  return token;
};

module.exports = {
  unverifiedUserAccessToken,
  verifiedUserAccessToken,
  adminAccessToken,
  generateAuthTokens,
};
