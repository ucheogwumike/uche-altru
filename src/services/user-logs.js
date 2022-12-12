const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { db } = require('../models');
// const logger = require('../config/logger');

/**
 * Create a user
 * @param {Object} body
 * @returns {Promise<User>}
 */
const createLogs = async (body) => {
  // eslint-disable-next-line no-param-reassign
  return db.activity_logs.create(body);
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
const queryLogs = async () => {
  const logs = await db.activity_logs.findAll();
  return logs;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getLogsById = async (id) => {
  return db.activity_logs.findById(id);
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateLogsById = async (userId, updateBody) => {
  const history = await getLogsById(userId);
  if (!history) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Logs not found');
  }
  Object.assign(history, updateBody);
  await db.activity_logs.update(history);
  return history;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteLogsById = async (userId) => {
  const user = await getLogsById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Logs not found');
  }
  await db.activity_logs.destroy(user);
  return user;
};

module.exports = {
  createLogs,
  queryLogs,
  getLogsById,
  updateLogsById,
  deleteLogsById,
};
