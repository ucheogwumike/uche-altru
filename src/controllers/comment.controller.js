const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { commentService } = require('../services');

const createComment = catchAsync(async (req, res) => {
  const comment = await commentService.createComment(req.user, req.params.campaignId, req.body);
  res.status(httpStatus.CREATED).send(comment);
});

const getAllComments = catchAsync(async (req, res) => {
  const result = await commentService.getAllComments();
  res.send(result);
});

const getComment = catchAsync(async (req, res) => {
  const comment = await commentService.getCommentById(req.params.commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  res.send(comment);
});

const updateComment = catchAsync(async (req, res) => {
  const comment = await commentService.updateCommentById(req.user, req.params.commentId, req.body);
  res.send(comment);
});

const deleteComment = catchAsync(async (req, res) => {
  await commentService.deleteCommentById(req.user, req.params.commentId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createComment,
  getAllComments,
  getComment,
  updateComment,
  deleteComment,
};
