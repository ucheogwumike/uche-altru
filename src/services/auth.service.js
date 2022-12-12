/* eslint-disable no-console */
const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const { db } = require('../models');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const logger = require('../config/logger');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await userService.isPasswordMatch(password, user.dataValues))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await db.tokens.findOne({
    where: { token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false },
  });

  logger.info(refreshTokenDoc);

  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  // DELETE TOKEN AFTERWARDS
  await db.tokens.destroy({ where: { id: refreshTokenDoc.id } });
  // await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await db.tokens.destroy({ where: { id: refreshTokenDoc.id } });
    // await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user.id);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, `Please authenticate${error}`);
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    logger.info(user);
    if (!user) {
      throw new Error();
    }
    await userService.updateUserById(user.id, { password: newPassword });
    await db.tokens.destroy({ where: { user: user.id, type: tokenTypes.RESET_PASSWORD } });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, `Password reset failed${error}`);
  }
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
    const userId = await userService.getUserById(verifyEmailTokenDoc.dataValues.user);

    if (!userId) {
      throw new Error();
    }
    await db.tokens.destroy({ where: { user: userId, type: tokenTypes.VERIFY_EMAIL } });
    await userService.updateUserById(userId, { isEmailVerified: true });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
};
