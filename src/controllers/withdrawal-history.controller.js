const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { historyService } = require('../services');

const createHistory = catchAsync(async (req, res) => {
  const user = await historyService.createHistory(req.body, req.user);
  res.status(httpStatus.CREATED).send(user);
});

const getHistories = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await historyService.queryHistory(filter, options);
  res.send(result);
});

const getHistory = catchAsync(async (req, res) => {
  const user = await historyService.getHistoryById(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'History not found');
  }
  res.send(user);
});

const updateHistory = catchAsync(async (req, res) => {
  const user = await historyService.updateHistoryById(req.params.id, req.body);
  res.send(user);
});

const deleteHistory = catchAsync(async (req, res) => {
  const user = await historyService.deleteHistoryById(req.params.id);
  res.send(user);
});

module.exports = {
  createHistory,
  getHistories,
  getHistory,
  updateHistory,
  deleteHistory,
};
