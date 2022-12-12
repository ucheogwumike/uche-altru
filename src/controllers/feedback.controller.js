const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { feedbackService } = require('../services');

const createFeedback = catchAsync(async (req, res) => {
  const feedback = await feedbackService.createFeedback(req.body);
  res.status(httpStatus.CREATED).send(feedback);
});

const getFeedbacks = catchAsync(async (req, res) => {
  const category = await feedbackService.getFeedbacks();
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No Feedbacks are sent yet!');
  }
  res.send(category);
});

const getFeedback = catchAsync(async (req, res) => {
  const feedback = await feedbackService.getFeedback(req.params.feedbackId);
  if (!feedback) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found');
  }
  res.send(feedback);
});

const updateFeedback = catchAsync(async (req, res) => {
  const feedback = await feedbackService.updateFeedback(req.params.feedbackId, req.body);
  res.send(feedback);
});

const deleteFeedback = catchAsync(async (req, res) => {
  await feedbackService.deleteFeedback(req.params.feedbackId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createFeedback,
  getFeedbacks,
  getFeedback,
  updateFeedback,
  deleteFeedback,
};
