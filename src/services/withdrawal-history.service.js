const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { db } = require('../models');
// eslint-disable-next-line import/no-useless-path-segments
const { campaignService } = require('../services');
// const logger = require('../config/logger');

/**
 * Create a user
 * @param {Object} body
 * @returns {Promise<User>}
 */
const createHistory = async (body, user) => {
  // eslint-disable-next-line no-param-reassign
  const newWithdrawal = body;
  newWithdrawal.userId = user.id;
  const campaign = campaignService.getCampaignById(newWithdrawal.campaignId);
  if (
    campaign.dataValues.amountReceived >= campaign.dataValues.target ||
    new Date(campaign.dataValues.endDate) < new Date()
  ) {
    if (body.amount > campaign.dataValues.amountReceived) {
      return 'insufficient funds';
    }
    return db.withdrawal_history.create(newWithdrawal);
  }
  return 'You do not meet the requirements to withdraw';
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
const queryHistory = async () => {
  const history = await db.withdrawal_history.findAll();
  return history;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getHistoryById = async (historyId) => {
  const findUser = await db.withdrawal_history.findOne({ where: { id: historyId } });
  return findUser;
};

/**
 * Update user by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateHistoryById = async (id, updateBody) => {
  const history = await getHistoryById(id);
  if (!history) {
    throw new ApiError(httpStatus.NOT_FOUND, 'History not found');
  }
  Object.assign(history, updateBody);
  await db.withdrawal_history.update(history.dataValues, { where: { id } });
  return history;
};

/**
 * Delete user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const deleteHistoryById = async (id) => {
  const user = await getHistoryById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'History not found');
  }
  await db.withdrawal_history.destroy({ where: { id } });
  return user;
};

module.exports = {
  createHistory,
  queryHistory,
  getHistoryById,
  updateHistoryById,
  deleteHistoryById,
};
