const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { db } = require('../models');
// const { mainController } = require('../controllers/index');

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @returns {Promise<boolean>}
 */
// const isEmailTaken = async function (email) {
//   const user = await db.users.findOne({ where: { email } });
//   logger.info(user);
//   return !!user;
// };

// /**
//  * Check if password matches the user's password
//  * @param {string} password
//  * @returns {Promise<boolean>}
//  */
// const isPasswordMatch = async function (password, user) {
//   const comp = bcrypt.compareSync(password, user.password);
//   logger.info(comp);
//   return comp;
// };

/**
 * Create a feedback
 * @param {ObjectFeedbackBody
 * @returns {Promise<Feedback>}
 */

const createFeedback = async (feedback) => {
  return db.feedbacks.create(feedback);
};

/**
 * Query for Feedbacks
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getFeedbacks = async () => {
  const feedbacks = await db.feedbacks.findAll();
  return feedbacks;
};

/**
 * Get feedback by id
 * @param {ObjectId} id
 * @returns {Promise<Feedback>}
 */
const getFeedback = async (id) => {
  return db.feedbacks.findByPk(id);
};

/**
 * Get feedback by campId
 * @param {string} email
 * @returns {Promise<Feedback>}
 */
// const getFeedbackByCampaignId = async (campId) => {
//   return db.feedbacks.findOne({ where: { campId } });
// };

/**
 * Update feedback by Id
 * @param {ObjectId} feedbackId
 * @param {Object} updateBody
 * @returns {Promise<feedback>}
 */
const updateFeedback = async (feedbackId, updateBody) => {
  const feedback = await getFeedback(feedbackId);
  if (!feedback) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found!');
  }
  Object.assign(feedback, updateBody);
  await db.feedbacks.update(feedback.dataValues, { where: { id: feedbackId } });
  return feedback;
};

/**
 * Delete feedback by id
 * @param {ObjectId} feedbackId
 * @returns {Promise<feedback>}
 */
const deleteFeedback = async (feedbackId) => {
  const feedback = await getFeedback(feedbackId);
  if (!feedback) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found!');
  }
  await db.feedbacks.destroy(feedback);
  return feedback;
};

module.exports = {
  createFeedback,
  getFeedbacks,
  getFeedback,
  updateFeedback,
  deleteFeedback,
};
