const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { db } = require('../models');

/**
 * Create a comment
 * @param {Object} commentBody
 * @returns {Promise<Object>}
 */
const createComment = async (user, id, commentBody) => {
  const campaign = await db.campaigns.findOne({ where: { id } });

  if (!campaign) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Campaign not found');
  }
  const newComment = commentBody;
  newComment.campaignId = campaign.id;
  newComment.userId = user.id;
  return db.comments.create(newComment);
};

/**
 * @param none
 * @returns {Promise<Result>}
 */
const getAllComments = async () => {
  const comments = await db.comments.findAll();
  return comments;
};

/**
 * Get comment by id
 * @param {id} id
 * @returns {Promise<Comment>}
 */
const getCommentById = async (id) => {
  const comment = await db.comments.findOne({ where: { id } });

  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }

  return comment;
};

/**
 * Update comment by id
 * @param {id} commentId
 * @param {Object} updateBody
 * @returns {Promise<Comment>}
 */
const updateCommentById = async (user, commentId, updateBody) => {
  const comment = await getCommentById(commentId);
  if (user.roleName !== 'admin' && comment.userId !== user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, "You can't edit others comment");
  }
  Object.assign(comment, updateBody);
  await db.comments.update(comment.dataValues, { where: { id: commentId } });
  return comment;
};

/**
 * Delete comment by id
 * @param {id} commentId
 * @returns {Promise<Comment>}
 */
const deleteCommentById = async (user, commentId) => {
  const comment = await getCommentById(commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  if (user.roleName !== 'admin' && comment.userId !== user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, "You can't delete others comment");
  }
  await db.comments.destroy({ where: { id: commentId } });
  return comment;
};

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
};
