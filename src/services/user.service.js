const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');
const { db } = require('../models');
const logger = require('../config/logger');

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @returns {Promise<boolean>}
 */
const isEmailTaken = async function (email) {
  const user = await db.users.findOne({ where: { email } });
  logger.info(user);
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
const isPasswordMatch = async function (password, user) {
  const comp = bcrypt.compareSync(password, user.password);
  logger.info(comp);
  return comp;
};

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = userBody;
  user.password = bcrypt.hashSync(userBody.password, 8);
  // eslint-disable-next-line prettier/prettier
  user.profileImage = `https://avatars.dicebear.com/api/initials/${userBody.firstName.charAt(0)}${userBody.lastName.charAt(0)}.svg`;

  return db.users.create(user);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async () => {
  const users = await db.users.findAll();
  return users;
};

/**
 * Get user by id
 * @param {User} user
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (user, id) => {
  if (user.id !== Number(id) && user.roleName !== 'admin') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Not authorized');
  }
  return db.users.findOne({ where: { id } });
};

/**
 * Internal get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const internalGetUserById = async (id) => {
  return db.users.findOne({ where: { id } });
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return db.users.findOne({ where: { email } });
};

/**
 * Update user by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (user, id, updateBody) => {
  const userToUpdate = await getUserById(user, id);

  if (!userToUpdate) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await isEmailTaken(updateBody.email))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(userToUpdate, updateBody);
  await db.users.update(userToUpdate.dataValues, { where: { id } });
  return userToUpdate;
};

/**
 * Update user role
 * @param {ObjectId} userId
 * @param {Object} roleName
 * @returns {Promise<User>}
 */
const updateUserRole = async (userId, roleName) => {
  const user = await internalGetUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  user.roleName = roleName;
  return user.save();
};

/**
 * Verify user
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const verifyUserEmail = async (userId) => {
  const user = await internalGetUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  user.isEmailVerified = true;
  await db.users.update({ isEmailVerified: 1 }, { where: { id: userId } });
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (reqUser, userId) => {
  const user = await getUserById(reqUser, userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await db.users.destroy(user);
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  internalGetUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  updateUserRole,
  verifyUserEmail,
  isPasswordMatch,
};
